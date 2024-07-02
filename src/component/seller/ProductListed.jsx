import './css/ProductListed.css';
import React, { useContext, useEffect, useState } from 'react';
import useFetchCollection from '../../hooks/useFetchCollection';
import UserContext from '../../context/AuthContext/UserContext';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';

const ProductListed = () => {
  const productList = useFetchCollection('product-list');
  const userList = useFetchCollection('users');
  const { currentUser } = useContext(UserContext);

  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [editedFields, setEditedFields] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (productList && userList && currentUser) {
      const user = userList.find(data => data.userEmail === currentUser.email);
      if (user) {
        const userProducts = productList.filter(data => user.productListed.includes(data.id));
        setProducts(userProducts);
      }
    }
  }, [productList, userList, currentUser]);

  if (!productList || !userList || !currentUser) return null;

  const user = userList.find(data => data.userEmail === currentUser.email);

  if (!user) return <div>No user found</div>;

  if (products.length === 0) return <div>No Product Listed</div>;

  const handleDelete = async (productId) => {
    const docRef = doc(db, 'product-list', productId);
    await deleteDoc(docRef);
    console.log('Deleted product with id:', productId);
  };

  const handleEdit = (product) => {
    setEditProduct(product.id);
    setEditedFields({
      name: product.name,
      brand: product.brand,
      category: product.category,
      price: product.price,
      discount: product.discount,
      finalPrice: Math.floor(product.price - (product.price * (product.discount / 100))),
      stock: product.stock,
      description: product.description
    });
  };

  const handleFieldChange = (field, value) => {
    setEditedFields(prev => {
      const updatedFields = { ...prev, [field]: value };
      if (field === 'price' || field === 'discount') {
        updatedFields.finalPrice = Math.floor(updatedFields.price - (updatedFields.price * (updatedFields.discount / 100)));
      }
      return updatedFields;
    });
  };

  const handleSave = async (productId) => {
    const docRef = doc(db, 'product-list', productId);
    await updateDoc(docRef, editedFields);
    console.log('Updated product with id:', productId);
    setEditProduct(null);
    // Update the products state to reflect the changes
    setProducts(products.map(product => product.id === productId ? { ...product, ...editedFields } : product));
  };

  return (
    <div className='product-list-container'>
      <table className='product-table'>
        <thead>
          <tr>
            <th className='table-header'>Image</th>
            <th className='table-header'>Product Name</th>
            <th className='table-header'>Brand</th>
            <th className='table-header'>Category</th>
            <th className='table-header'>Price</th>
            <th className='table-header'>Discount</th>
            <th className='table-header'>Final Price</th>
            <th className='table-header'>Stock</th>
            <th className='table-header'>Description</th>
            <th className='table-header'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item.id} className='table-row'>
              <td className='table-data'>
                <img src={item.images[0]} alt={item.name} className='product-image' />
              </td>
              <td className='table-data'>
                {editProduct === item.id ? (
                  <input 
                    type="text" 
                    value={editedFields.name} 
                    onChange={(e) => handleFieldChange('name', e.target.value)} 
                    onClick={(e) => e.stopPropagation()} // Prevent propagation
                  />
                ) : (
                  item.name
                )}
              </td>
              <td className='table-data'>
                {editProduct === item.id ? (
                  <input 
                    type="text" 
                    value={editedFields.brand} 
                    onChange={(e) => handleFieldChange('brand', e.target.value)} 
                    onClick={(e) => e.stopPropagation()} // Prevent propagation
                  />
                ) : (
                  item.brand
                )}
              </td>
              <td className='table-data'>
                {editProduct === item.id ? (
                  <input 
                    type="text" 
                    value={editedFields.category} 
                    onChange={(e) => handleFieldChange('category', e.target.value)} 
                    onClick={(e) => e.stopPropagation()} // Prevent propagation
                  />
                ) : (
                  item.category
                )}
              </td>
              <td className='table-data'>
                {editProduct === item.id ? (
                  <input 
                    type="number" 
                    value={editedFields.price} 
                    onChange={(e) => handleFieldChange('price', e.target.value)} 
                    onClick={(e) => e.stopPropagation()} // Prevent propagation
                  />
                ) : (
                  item.price
                )}
              </td>
              <td className='table-data'>
                {editProduct === item.id ? (
                  <input 
                    type="number" 
                    value={editedFields.discount}  
                    onChange={(e) => handleFieldChange('discount', Math.min(99, Math.max(0, e.target.value)))} 
                    min={0}
                    max={99}
                    onClick={(e) => e.stopPropagation()} // Prevent propagation
                  />
                ) : (
                  item.discount
                )}
              </td>
              <td className='table-data'>
                {editProduct === item.id ? (
                  editedFields.finalPrice
                ) : (
                  item.finalPrice
                )}
              </td>
              <td className='table-data'>
                {editProduct === item.id ? (
                  <input 
                    type="number" 
                    value={editedFields.stock} 
                    onChange={(e) => handleFieldChange('stock', e.target.value)} 
                    onClick={(e) => e.stopPropagation()} // Prevent propagation
                  />
                ) : (
                  item.stock
                )}
              </td>
              <td className='table-data'>
                {editProduct === item.id ? (
                  <input 
                    type="text" 
                    value={editedFields.description} 
                    onChange={(e) => handleFieldChange('description', e.target.value)} 
                    onClick={(e) => e.stopPropagation()} // Prevent propagation
                  />
                ) : (
                  item.description
                )}
              </td>
              <td className='table-data'>
                {editProduct === item.id ? (
                  <button onClick={() => handleSave(item.id)}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(item)}>Edit</button>
                )}
                <button className='delete-button' onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductListed;

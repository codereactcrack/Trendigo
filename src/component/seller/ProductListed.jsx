import React, { useContext, useState } from 'react';
import useFetchCollection from '../../hooks/useFetchCollection';
import UserContext from '../../context/AuthContext/UserContext';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import './css/ProductListed.css'

const ProductListed = () => {
  const productList = useFetchCollection('product-list');
  const userList = useFetchCollection('users');
  const { currentUser } = useContext(UserContext);

  const [showScreen, setShowScreen] = useState(null);
  const [value, setValue] = useState(0);

  if (!productList || !userList || !currentUser) return null;

  const user = userList.find(data => data.userEmail === currentUser.email);

  if (!user) return <div>No user found</div>;

  const products = productList.filter(data => user.productListed.includes(data.id));

  if (!products) return <div>No Product Listed</div>;

  const handleDelete = async (productId) => {
    const docRef = doc(db, 'product-list', productId);
    await deleteDoc(docRef);
    console.log('Deleted product with id:', productId);
  };

  const handleRestock = async (productId) => {
    const docRef = doc(db, 'product-list', productId);
    await updateDoc(docRef, {
      stock: value
    });
    console.log('Restocked product with id:', productId);
    setShowScreen(null); 
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
              <td className='table-data'>{item.name}</td>
              <td className='table-data'>{item.brand}</td>
              <td className='table-data'>{item.category}</td>
              <td className='table-data'>{item.price}</td>
              <td className='table-data'>{item.discount}</td>
              <td className='table-data'>{item.finalPrice}</td>
              <td className='table-data'>{item.stock}</td>
              <td className='table-data'>{item.description}</td>
              <td className='table-data'>
                <button className='delete-button' onClick={() => handleDelete(item.id)}>Delete</button>
                <button className='restock-button' onClick={() => setShowScreen(item.id)}>Restock</button>
                {showScreen === item.id && (
                  <div className='restock-form'>
                    <div>Enter the quantity:</div>
                    <input type='number' onChange={(e) => setValue(Number(e.target.value))} />
                    <button onClick={() => handleRestock(item.id)}>Stock</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductListed;

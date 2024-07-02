import React, { useContext } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import './css/FormProductList.css';
import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import useFetchCollection from '../../hooks/useFetchCollection';
import UserContext from '../../context/AuthContext/UserContext';
import { useNavigate } from 'react-router-dom';

const FormProductList = () => {
  const { register, handleSubmit, control, formState: { errors } ,reset } = useForm();
  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
    control,
    name: 'images',
  });
  const { fields: specFields, append: appendSpec, remove: removeSpec } = useFieldArray({
    control,
    name: 'specifications',
  });
  const productRef = collection(db, 'product-list');

  const naviagte = useNavigate();

  //getting current user from db to update the productListed
  const userList = useFetchCollection('users');
  const {currentUser} = useContext(UserContext);
  const user = userList.find(data=>data.userEmail == currentUser.email);

  async function onSubmit(data) {
    const finalPrice = Math.floor(data.price - (data.price * (data.discount / 100)));
    // Map images and specifications to the desired structure
    const images = data.images.map(image => image.url);
    const specifications = data.specifications.map(spec => spec.spec);
    const productDoc =await addDoc(productRef, {
      brand: data["product-brand"],
      category: data["product-category"],
      description: data["product-description"],
      discount: data.discount || 0,
      price: data.price,
      finalPrice,
      images,
      name: data["product-name"],
      specification: specifications,
      stock: data.stock,
      featured: data.featured || false,  // Default to false if not specified
    });

    //updating db for seller user -productListing
    const docRef = doc(db,'users',user.id);
    await updateDoc(docRef,{
      productListed: arrayUnion(productDoc.id)
    })

    reset(); 
    naviagte('/seller-Dashboard')
  }

  return (
    <div className="product-list-container">
      <h2 className="form-title">Add New Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="product-form">
        <label htmlFor="product-name">Name of Product</label>
        <input {...register("product-name", { required: "Product name is required", maxLength: { value: 99, message: "Maximum length is 99 characters" } })} name="product-name" className="input-field" />
        {errors["product-name"] && <p className="error-message">{errors["product-name"].message}</p>}

        <label htmlFor="product-brand">Brand Name</label>
        <input {...register("product-brand", { required: "Brand name is required", maxLength: { value: 99, message: "Maximum length is 99 characters" } })} name="product-brand" className="input-field" />
        {errors["product-brand"] && <p className="error-message">{errors["product-brand"].message}</p>}

        <label htmlFor="product-description">Product Description</label>
        <textarea {...register("product-description", { required: "Product description is required" })} name="product-description" className="input-field" />
        {errors["product-description"] && <p className="error-message">{errors["product-description"].message}</p>}

        <label htmlFor="product-category">Category</label>
        <select {...register("product-category", { required: "Category is required" })} className="input-field">
          <option value="women">women</option>
          <option value="men">men</option>
          <option value="furniture">Furniture</option>
          <option value="beauty">Beauty</option>
          <option value="electronics">Electronics</option>
          <option value="others">Others</option>
        </select>
        {errors["product-category"] && <p className="error-message">{errors["product-category"].message}</p>}

        <label htmlFor="price">Price</label>
        <input type="number" {...register("price", { min: { value: 1, message: "Minimum price is 1" }, required: "Price is required" })} className="input-field" />
        {errors.price && <p className="error-message">{errors.price.message}</p>}

        <label htmlFor="discount">Discount in %</label>
        <input type="number" {...register("discount", { min: { value: 0, message: "Minimum discount is 0" } })} className="input-field" />
        {errors.discount && <p className="error-message">{errors.discount.message}</p>}

        <div className="field-array-container">
          <label>Images</label>
          {imageFields.map((field, index) => (
            <div key={field.id} className="field-array-item">
              <input {...register(`images.${index}.url`, { required: "Image URL is required" })} placeholder="Image URL" className="input-field" />
              {errors.images && errors.images[index] && <p className="error-message">{errors.images[index].url.message}</p>}
              <button type="button" onClick={() => removeImage(index)} className="remove-button">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => appendImage({ url: '' })} className="add-button">Add Image</button>
        </div>

        <div className="field-array-container">
          <label>Specifications</label>
          {specFields.map((field, index) => (
            <div key={field.id} className="field-array-item">
              <input {...register(`specifications.${index}.spec`, { required: "Specification is required" })} placeholder="Specification" className="input-field" />
              {errors.specifications && errors.specifications[index] && <p className="error-message">{errors.specifications[index].spec.message}</p>}
              <button type="button" onClick={() => removeSpec(index)} className="remove-button">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => appendSpec({ spec: '' })} className="add-button">Add Specification</button>
        </div>

        <label htmlFor="stock">Available Stock</label>
        <input type="number" {...register("stock", { min: { value: 10, message: "Minimum stock is 10" }, required: "stock is required" })} className="input-field" />
        {errors.stock && <p className="error-message">{errors.stock.message}</p>}

        <input type="submit" className="submit-button" />
      </form>
    </div>
  );
};

export default FormProductList;

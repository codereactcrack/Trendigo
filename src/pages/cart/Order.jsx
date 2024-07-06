import React, { useContext } from 'react';
import useFetchCollection from '../../hooks/useFetchCollection';
import UserContext from '../../context/AuthContext/UserContext';
import { doc, updateDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '../../services/firebase';
import toast from 'react-hot-toast';

const Order = (props) => {
  const amount = props.amount;

  const userList = useFetchCollection('users');
  const { currentUser } = useContext(UserContext);

  if (!userList || !currentUser) {
    return <div>Loading...</div>;
  }

  const user = userList.find(data => data.userEmail === currentUser.email);
  if (!user) {
    return <div>User not found</div>;
  }

  async function orderHandler() {
    const userDocRef = doc(db, 'users', user.id);
    const currentTime = new Date();
    const readableTime = currentTime.toString();
    const sortableTime = currentTime.toISOString();

    try {
      
      const orderDocRef = await addDoc(collection(db, 'orders'), {
        userId: user.id,
        items: user.cartItems,
        amount,
        readableTime,
        sortableTime
      });

      const orderId = orderDocRef.id;

      await updateDoc(orderDocRef, {
        orderId
      });

      await updateDoc(userDocRef, {
        cartItems: []
      });

      toast.success('Order placed successfully',orderId);
    } catch (error) {
      toast.error('Error placing order');
      console.error('Error placing order: ', error);
    }
  }

  return (
    <div>
      <button className='place-order-button' onClick={orderHandler}> PLACE ORDER </button>
    </div>
  );
}

export default Order;

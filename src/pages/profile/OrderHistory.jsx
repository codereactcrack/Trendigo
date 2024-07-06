import React, { useContext, useEffect, useState } from 'react';
import useFetchCollection from '../../hooks/useFetchCollection';
import UserContext from '../../context/AuthContext/UserContext';
import './css/OrderHistory.css';

const OrderHistory = () => {
  const userList = useFetchCollection('users');
  const orders = useFetchCollection('orders');
  const products = useFetchCollection('product-list');
  const { currentUser } = useContext(UserContext);
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    if (orders && products && currentUser) {
      const user = userList.find(data => data.userEmail === currentUser.email);
      if (user) {
        const userOrders = orders.filter(order => order.userId === user.id)
                                 .sort((a, b) => new Date(b.sortableTime) - new Date(a.sortableTime));

        const detailedOrders = userOrders.map(order => {
          const items = order.items.map(itemId => {
            const product = products.find(product => product.id === itemId);
            return product ? { ...product, quantity: 1 } : null;
          }).filter(item => item !== null);
          return { ...order, items };
        });

        setOrderDetails(detailedOrders);
      }
    }
  }, [orders, products, currentUser, userList]);

  if (!userList || !orders || !currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className='order-history-container'>
      {orderDetails.length > 0 ? (
        <ul className='order-list'>
          {orderDetails.map(order => (
            <li key={order.id} className='order-item'>
              <div className='order-info'>
                <p><strong>Order ID:</strong> {order.orderId}</p>
                <p><strong>Amount:</strong> ₹{order.amount}</p>
                <p><strong>Time:</strong> {order.readableTime}</p>
                <ul className='item-list'>
                  {order.items.map((item, index) => (
                    <li key={index} className='item'>
                      <div className='item-info'>
                        <img src={item.images[0]} alt={item.name} className='item-image' />
                        <div>
                          <p className='item-name'>{item.name}</p>
                          <p className='item-price'>Price: ₹{item.finalPrice}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found</p>
      )}
    </div>
  );
};

export default OrderHistory;

import React, { useContext } from 'react';
import UserContext from '../../context/AuthContext/UserContext';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase';
import './css/Profile.css';
import LoginIcon from '@mui/icons-material/Login';
import ProfileType from './ProfileType';
import OrderHistory from './OrderHistory';

const Profile = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  function logoutHandler() {
    signOut(auth).then(() => {
      localStorage.clear();
      setCurrentUser(null);
      navigate('/');
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <div className='profile-container'>
      {currentUser ? (
        <div className='profile-details'>
          <div className='profile-header'>
            <div className='profile-info'>
              <h2 className='profile-heading'>Profile</h2>
              <p className='profile-name'>Name: {currentUser.displayName}</p>
              <p className='profile-email'>Email: {currentUser.email}</p>
              {/* Add more user details here if available */}
              <ProfileType />
            </div>
            <button className='profile-logout-button' onClick={logoutHandler}>LOGOUT</button>
          </div>
          <div className='order-history'>
            <h3 className='order-history-heading'>Order History</h3>
            <OrderHistory />
          </div>
        </div>
      ) : (
        <div className='profile-login'>
          <button className='profile-login-button' onClick={() => navigate('/login')}>
            <LoginIcon className='login-icon' /> Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;

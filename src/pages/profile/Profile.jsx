import React, { useContext } from 'react'
import UserContext from '../../context/AuthContext/UserContext'
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase';

const Profile = () => {
    const {currentUser,setCurrentUser}= useContext(UserContext);
    const navigate = useNavigate();

    function logoutHandler(){
        signOut(auth).then(() => {
          // Sign-out successful.
          localStorage.clear();
          setCurrentUser(null)
          navigate('/');
        }).catch((error) => {
          // An error happened.
          console.log(error);
        });
    }

  return (
    <div>
        {currentUser ? 
          <div>
            Profile : - {currentUser.displayName} 
            <button onClick={logoutHandler}>LOGOUT</button>
          </div>: 
          <div> 
            <button onClick={()=>navigate('/login')}>Login</button>
        </div>
        } 
        </div>
  )
}

export default Profile
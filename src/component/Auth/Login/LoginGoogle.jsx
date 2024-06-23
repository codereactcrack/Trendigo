import { signInWithPopup } from 'firebase/auth'
import React, { useContext } from 'react'
import { auth, googleProvider } from '../../../services/firebase'
import UserContext from '../../../context/AuthContext/UserContext'
import {useNavigate} from 'react-router-dom'
import GoogleIcon from '@mui/icons-material/Google';
import './css/LoginGoogle.css'

import useAddUserDb from '../../../hooks/useAddUserDb'

const LoginGoogle = () => {

  const {setCurrentUser} = useContext(UserContext);
  const navigate = useNavigate();

  async function googleLoginHandler(){
    try {
      const userAuth = await signInWithPopup(auth,googleProvider);
      setCurrentUser(userAuth.user);
      await useAddUserDb(userAuth);
      navigate('/profile');
    } catch (error) {
      alert(error.message)
      console.log(error.message); 
    }
  }

  return (
    <div className='google-login-container'>
      <button onClick={googleLoginHandler} className='google-login-button'><GoogleIcon className='google-icon'/></button>
    </div>
  )
}

export default LoginGoogle
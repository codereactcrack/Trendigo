import { signInWithPopup } from 'firebase/auth'
import React, { useContext } from 'react'
import { auth, googleProvider } from '../../../services/firebase'
import UserContext from '../../../context/AuthContext/UserContext'
import {useNavigate} from 'react-router-dom'
import GoogleIcon from '@mui/icons-material/Google';
import './css/LoginGoogle.css'

import useAddUserDb from '../../../hooks/useAddUserDb'
import toast from 'react-hot-toast'

const LoginGoogle = () => {

  const {setCurrentUser} = useContext(UserContext);
  const navigate = useNavigate();

  async function googleLoginHandler(){
    try {
      const userAuth = await signInWithPopup(auth,googleProvider);
      setCurrentUser(userAuth.user);
      await useAddUserDb(userAuth);
      navigate('/profile');
      toast.success(`Welcome! ${userAuth.user.displayName}`)
    } catch (error) {
      console.log(error.message)
      toast.error('Please Try Again')
    }
  }

  return (
    <div className='google-login-container'>
      <button onClick={googleLoginHandler} className='google-login-button'><GoogleIcon className='google-icon'/></button>
    </div>
  )
}

export default LoginGoogle
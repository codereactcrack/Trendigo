import { createUserWithEmailAndPassword, sendEmailVerification, updateCurrentUser, updateProfile } from 'firebase/auth';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { auth } from '../../../services/firebase';
import UserContext from '../../../context/AuthContext/UserContext';
import { useNavigate } from 'react-router-dom';
import './css/RegisterPage.css'
import Banner2 from '../../../assets/images/banner2.jpg'
import SendIcon from '@mui/icons-material/Send';
import Logo from '../../../assets/images/logo.png'

const RegisterPage = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const password = watch("password");

  const onSubmit = async (data) => {
    const {firstName,lastName, email, password } = data;
    const userName = firstName + ' '+lastName ;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser,{ displayName:userName })
      await sendEmailVerification(auth.currentUser);
      alert('A verification email has been sent to your email address. Please verify your email before logging in.');
      setCurrentUser(null); 
      navigate('/login');
    } catch (error) {
      alert(error.message)
      console.error(error.message);
    }
  };


  return (
    <div className='register-container'>

      <div className='register-form-left'>
        <form onSubmit={handleSubmit(onSubmit)} className='register-form'>
          <img src ={Logo} alt='logo' className='register-logo'/>
          <span className='register-heading'>Create Your Profile:</span>
          <label className='register-label'>First Name:
            <input type='text' placeholder='Enter First Name..' className='register-input'
              {...register("firstName", { required: "First Name is required", 
                maxLength: { value: 20, message: "First Name cannot exceed 20 characters" } })}/>
              {errors.firstName && <p role="alert">{errors.firstName.message}</p>}
          </label>
          <label className='register-label'> Last Name:
            <input type='text' placeholder='Enter Last Name..' className='register-input'
              {...register("lastName", { maxLength: { value: 20, message: "Last Name cannot exceed 20 characters" } })}/>
              {errors.lastName && <p role="alert">{errors.lastName.message}</p>}
          </label>
          <label className='register-label'> Email Address:
            <input type='email' placeholder='Enter Email Address' className='register-input'
              {...register("email", { required: "Email is required" })}/>
            {errors.email && <p role="alert">{errors.email.message}</p>}
          </label>

          <label className='register-label'> Password:
            <input type='password' placeholder='Password' className='register-input'
              {...register("password", { required: "Password is required",
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
                  message: "Password must be at least 8 characters, include an uppercase letter, a lowercase letter, and a number"
                } })} />
            {errors.password && <p role="alert">{errors.password.message}</p>}
          </label>
          <label className='register-label'> Confirm Password:
            <input type='password' placeholder='Confirm Password' className='register-input'
              {...register("confirmpassword", { required: "Confirm Password is required",
                validate: value => value === password || "Passwords do not match"})}/>
            {errors.confirmpassword && <p role="alert">{errors.confirmpassword.message}</p>}
          </label>
          <button type="submit" className='register-button'>
            REGISTER USER
            <SendIcon className='send-icon' />
          </button>
        </form>
      </div>
      <div className='register-right-banner'>
        <img src={Banner2} alt='Banner Register Page'/>
      </div>
      
    </div>
  );
};

export default RegisterPage;

import React from 'react'
import LoginEmail from './LoginEmail'
import LoginGoogle from '../Login/LoginGoogle'
import { NavLink } from 'react-router-dom'
import Logo from '../../../assets/images/logo.png'
import Banner1 from '../../../assets/images/banner1.avif';
import './css/LoginPage.css'

const LoginPage = () => {
  return (
    <div className='login-container'>
      <div className='login-left-banner'>
        <img src={Banner1} alt='banner' />
      </div>
      <div className='login-right-auth'>
        <div className='logo-heading'>
          <div className='logo'>
            <img src={Logo} alt='logo' />
          </div>
          <div className='heading'>
            <div className='primary-heading'>TrendiGO</div>
            <div className='slogan'>Get Ready to Blab and Laugh!</div>
          </div>
        </div>
        <div className='email-auth'>
          <LoginEmail />
        </div>
        <div className='bottom-line'></div>
        <div className='social-auth'>
          <LoginGoogle />
        </div>
        <div className='tos'>
          By creating an account, you agree to our <NavLink to='/terms'>Terms of Service</NavLink> and <NavLink to='/terms'>Privacy Policy</NavLink>.
        </div>
        <div className="register-user">
          Don't have an account? <NavLink to='/sign-up'>Sign Up</NavLink>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

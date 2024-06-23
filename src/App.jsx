import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './App.css'

import Home from './pages/home/Home';
import Shop from './pages/shop/Shop';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import Cart from './pages/cart/Cart';
import Wishlist from './pages/wishlist/Wishlist';
import Template from './component/template/Template';
import ProtectedRoute from './component/Auth/ProtectedRoute/ProtectedRoute';
import Profile from './pages/profile/Profile';
import LoginPage from './component/Auth/Login/LoginPage';
import RegisterPage from './component/Auth/Register/RegisterPage';
import Terms from './pages/terms&privacy/Terms';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/' element={<Template/>}>
          <Route index element ={<Home/>} />
          <Route path='/home' element ={<Home />} />
          <Route path='shop' element ={<Shop/>} />
          <Route path='about-us' element ={<About/>} />
          <Route path='contact-us' element ={<Contact />} />
          <Route path='cart' element ={<ProtectedRoute element={<Cart /> } />}/>
          <Route path='wishlist' element ={ <ProtectedRoute element={<Wishlist />} />} />
          <Route path='/profile' element ={<Profile/>} />
          <Route path='/terms' element ={<Terms/>} />
        </Route>
        <Route path='login' element ={<LoginPage />}/>
        <Route path='sign-up' element ={<RegisterPage />}/>
      </Route>
    )
  );
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './App.css'

import Home from './pages/home/Home';
import Shop from './pages/shop/Shop';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import Cart from './pages/cart/Cart';
import Wishlist from './pages/wishlist/Wishlist';
import Login from './component/auth/Login';
import Template from './component/template/Template';
import ProtectedRoute from './component/protected/ProtectedRoute';

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
          <Route path='cart' element ={<Cart />} />
          <Route path='wishlist' element ={<Wishlist />} />
        </Route>
        <Route path='login' element ={<ProtectedRoute element = {<Login />} />} />
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

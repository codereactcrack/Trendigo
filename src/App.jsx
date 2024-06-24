import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './App.css'
import { Suspense, lazy } from 'react';

const Home = lazy (()=> import('./pages/home/Home'));
const Shop =lazy(()=> import('./pages/shop/Shop'))  ;
const About = lazy (()=> import('./pages/about/About'));
const Contact = lazy(()=>import( './pages/contact/Contact'));
const Cart = lazy(()=>import ('./pages/cart/Cart'))
const Wishlist = lazy(()=> import ('./pages/wishlist/Wishlist'))
const Template = lazy(()=> import ('./component/template/Template'))
const ProtectedRoute = lazy(()=> import ('./component/Auth/ProtectedRoute/ProtectedRoute'))
const Profile = lazy(()=> import ('./pages/profile/Profile'))
const LoginPage = lazy(()=>import ('./component/Auth/Login/LoginPage' ))
const RegisterPage = lazy(()=>import ('./component/Auth/Register/RegisterPage'))
const Terms = lazy(()=>import ('./pages/terms&privacy/Terms'))

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/' element={<Template/>}>
          <Route index element ={<Home/>} />
          <Route path='/home' element ={<Home />} />
          <Route path='shop' element ={<Shop/>} >
            <Route path=':filterType/:filterValue' element ={<Shop />} />
          </Route>
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
    <Suspense fallback={<h1>Loading.....</h1>} >
      <RouterProvider router={router} />
    </Suspense>
    </>
  )
}

export default App

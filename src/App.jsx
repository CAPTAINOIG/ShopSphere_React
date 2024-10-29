import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductDetails from './pages/ProductDetails';
import Navbar from './component/Navbar';
import Upbar from './component/Upbar';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ProductList from './pages/ProductList';
import Cart from './pages/Productcart/Cart';
import Paymentpage from './paymentgateway/Paymentpage';
import Faqs from './productreviews/Faqs';
import Newarrivals from './category/Newarrivals';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  // FOR OTP PAGE 
  // const handleOtpSubmit = (otp) => {
  //   console.log('OTP entered:', otp);
  //   // Handle OTP verification or submission here
  // };
  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className='font-[Mirza]'>
      <Navbar openToggle={toggleIsOpen} allProducts={allProducts} setProducts={setAllProducts} />
      {isOpen && <Upbar  allProducts={allProducts} setProducts={setAllProducts} />}
      <Routes>
        <Route path='/' element={<ProductDetails allProducts={allProducts} setAllProducts={setAllProducts} />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/faq' element={<Faqs />} />
        <Route path='/arrival' element={<Newarrivals />} />
        <Route path="/product/:productId" element={<ProductList />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/gateway" element={<Paymentpage/>} />
      </Routes>
      <ToastContainer/>
    </div>
  );
}

export default App;

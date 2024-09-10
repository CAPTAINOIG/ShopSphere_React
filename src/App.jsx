import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductDetails from './pages/ProductDetails';
import Navbar from './component/Navbar';
import Upbar from './component/Upbar';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import ProductList from './pages/ProductList';
import Arrivalist from './pages/Arrivalist';

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
      {/* Pass allProducts and setAllProducts to Navbar */}
      <Navbar openToggle={toggleIsOpen} allProducts={allProducts} setProducts={setAllProducts} />
      {isOpen && <Upbar onClickHandler={handleClose} />}
      <Routes>
        <Route path='/' element={<ProductDetails allProducts={allProducts} setAllProducts={setAllProducts} />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path="/product/:productName" element={<ProductList />} />
        <Route path="/arrival/:productName" element={<Arrivalist />} />
      </Routes>
    </div>
  );
}

export default App;

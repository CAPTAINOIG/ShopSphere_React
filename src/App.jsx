import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { useState } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductDetails from './pages/ProductDetails';
import ProductList from './pages/ProductList';
import Cart from './pages/Productcart/Cart';
import Paymentpage from './paymentgateway/Paymentpage';
import Faqs from './productreviews/Faqs';
import Newarrivals from './category/Newarrivals';
import ForgotPassword from './pages/ForgotPassword';
import PasswordReset from './pages/PasswordReset';
import OnSale from './category/OnSale';
import Shop from './category/Shop';
import ErrorPage from './component/ErrorPage';
import Upbar from './component/Upbar';
import NavbarLayout from './component/NavbarLayout';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleIsOpen = () => setIsOpen(!isOpen);

  const hiddenPaths = ['/gateway'];
  const hideNavbar = hiddenPaths.includes(location.pathname) || location.pathname === '*' || location.pathname === '/error';

  return (
    <div className='font-[Mirza]'>
      {isOpen && <Upbar allProducts={allProducts} setProducts={setAllProducts} />}

      <Routes>
        <Route
          path="/"
          element={
            <NavbarLayout
              openToggle={toggleIsOpen}
              isHidden={hideNavbar}
            />
          }
        >
          <Route index element={<ProductDetails />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/password-reset" element={<PasswordReset />} />
          <Route path="/faq" element={<Faqs />} />
          <Route path="/onsale" element={<OnSale />} />
          <Route path="/arrival" element={<Newarrivals />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:productId" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
        </Route>

        {/* Pages without Navbar */}
        <Route path="/gateway" element={<Paymentpage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;

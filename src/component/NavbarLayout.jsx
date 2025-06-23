import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const NavbarLayout = ({ openToggle, allProducts, setAllProducts, isHidden }) => {
  return (
    <>
      {!isHidden && (
        <Navbar openToggle={openToggle} allProducts={allProducts} setProducts={setAllProducts} />
      )}
      <Outlet />
    </>
  );
};

export default NavbarLayout;

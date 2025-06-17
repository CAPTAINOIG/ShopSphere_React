import React, { useEffect, useState } from "react";
// import ava1 from '../assets/image/ava2.png';
import { Link } from "react-router-dom";
import Count from "./Count";

const Homepage = () => {

  return (
    <div className="grid lg:grid-cols-2 bg-gray-100 p-10">
      <div>
        <p className="lg:text-7xl md:text-6xl text-4xl font-bold">
          Express Your Style
        </p>
        <p className="lg:text-7xl font-bold md:text-6xl text-4xl">
          with the Perfect
        </p>
        <p className="lg:text-7xl font-bold md:text-6xl text-4xl">Outfit</p>
        <p className="my-3">
          Explore our wide selection of carefully curated apparel, tailored to
          highlight your unique personality and complement your fashion
          preferences.
        </p>
        <div className="my-10">
          <Link
            className="bg-black rounded-full p-3 px-7 hover:bg-pink-600 hover:text-white text-white "
            to="/login"
          >
            Shop Now
          </Link>
          <div className="flex lg:gap-10 md:gap-10 my-5">
           <Count/>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <img
          className="rounded-lg shadow-lg opacity-70 w-full max-w-sm"
          src="https://plus.unsplash.com/premium_photo-1682095757120-c9abb908ed60?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG1vZGVsfGVufDB8fDB8fHww"
          alt=""
        />
      </div>
    </div>
  );
};

export default Homepage;

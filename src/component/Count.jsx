import React, { useEffect, useState } from "react";

const Count = () => {
  const [count, setCount] = useState(1);
  const [quality, setQuality] = useState(1);
  const [customer, setCustomer] = useState(1);

  const brandTarget = 200;
  const qualityTarget = 2000;
  const customerTarget = 3000;

  useEffect(() => {
    const countBrand = () => {
      if (count < brandTarget) {
        const timer = setTimeout(() => setCount((prevCount) => prevCount + 1),10);
        return () => clearTimeout(timer);
      }
    };
    const countQuality = () => {
      if (quality < qualityTarget) {
        const timer = setTimeout(() => setQuality((prevQuality) => prevQuality + 1),10);
        return () => clearTimeout(timer);
      }
    };
    const countCustomer = () => {
      if (customer < customerTarget) {
        const timer = setTimeout(() => setCustomer((prevCustomer) => prevCustomer + 1),10);
        return () => clearTimeout(timer);
      }
    };
    countBrand();
    countQuality();
    countCustomer();
  }, [count, quality, customer]);
  return (
    <div className="flex lg:gap-10 md:gap-10 my-5">
      <div>
        <p className="lg:text-5xl md:text-6xl text-2xl font-bold">
          {count.toLocaleString()} +
        </p>
        <p>international brands</p>
      </div>
      <div>
        <p className="lg:text-5xl md:text-6xl text-2xl font-bold">
          {quality.toLocaleString()} +
        </p>
        <p>High Quality Products</p>
      </div>
      <div>
        <p className="lg:text-5xl md:text-6xl text-2xl font-bold">
          {customer.toLocaleString()} +
        </p>
        <p>Happy Customers</p>
      </div>
    </div>
  );
};

export default Count;

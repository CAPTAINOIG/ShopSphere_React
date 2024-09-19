import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Address from './Address';
import Delivery from './Delivery';
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { FaSquareCheck } from "react-icons/fa6";
import { handleNextStep } from '../Redux/counterSlice';
import Paymentgateway from './Paymentgateway';
import Thank from './Thank';


const Paymentpage = () => {
    const storeIndex = useSelector((state => state.counterReducer.address.currentStep))
    // console.log(storeIndex);

    const dispatch = useDispatch()

    useEffect(() => {
      return () => {
        // Dispatch an action to reset currentStep to 0 when component unmounts
        dispatch(handleNextStep({ currentStep: -1 }));
      };
    }, [dispatch]);

    const list = [
        {
            name: 'Shipping Information',
            icon: <MdCheckBoxOutlineBlank />,
            icon2: <FaSquareCheck />
          },
          {
            name: 'Pickup Form',
            icon: <MdCheckBoxOutlineBlank />,
            icon2: <FaSquareCheck />
          },
          {
            name: 'Payment Gateway',
            icon: <MdCheckBoxOutlineBlank />,
            icon2: <FaSquareCheck />
          },
          
    ]

    return (
        <section className='bg-gray-300 w-full p-5'>
        <div className='lg:ms-[22%] justify-between lg:me-[15%] flex lg:flex-row flex-col gap-8'>
          {/* <div></div> */}
            <div className='stepContainer w-[70%]'>
                {storeIndex === 0 && <Address />}
                {storeIndex === 1 && <Delivery />}
                {storeIndex === 2 && <Paymentgateway />}
                {storeIndex === 3 && <Thank />}
            </div>

            <div className={storeIndex > 2 ? 'hidden' : 'lg:w-[30%] rounded-lg md:w-[53%] w-[84%] md:ms-[21%] lg:ms-0 ms-7 border-2 lg:order-last bg-white -order-last mt-8 h-[30%] shadow'}>
                {
                    list.map((items, index) => (
                        <ul key={index} className='flex justify-between border-b border-gray-500 p-5'>
                            <li className='font-semibold'>{items.name}</li>
                            <li className={storeIndex > index ? 'mt-2 text-pink-500' : 'mt-2'}>{storeIndex > index ? items.icon2 : items.icon}</li>
                        </ul>
                    ))
                }
            </div>
            </div>
        </section>

    )
}

export default Paymentpage
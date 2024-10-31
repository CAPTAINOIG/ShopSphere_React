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

    const dispatch = useDispatch()

    useEffect(() => {
      return () => {
        dispatch(handleNextStep({ currentStep: -1 }));
      };
    }, [dispatch]);

    // const list = [
    //     {
    //         name: 'Shipping Information',
    //         icon: <MdCheckBoxOutlineBlank />,
    //         icon2: <FaSquareCheck />
    //       },
    //       {
    //         name: 'Pickup Form',
    //         icon: <MdCheckBoxOutlineBlank />,
    //         icon2: <FaSquareCheck />
    //       },
    //       {
    //         name: 'Payment Gateway',
    //         icon: <MdCheckBoxOutlineBlank />,
    //         icon2: <FaSquareCheck />
    //       },
          
    // ]

    return (
        <section className='shadow-lg bg-pink-500 rounded-lg w-full p-5'>
        <div className='w-full'>
          {/* <div></div> */}
            <div className='stepContainer'>
                {storeIndex === 0 && <Address />}
                {storeIndex === 1 && <Delivery />}
                {storeIndex === 2 && <Paymentgateway />}
                {storeIndex === 3 && <Thank />}
            </div>

            {/* <div className={storeIndex > 2 ? 'hidden' : 'lg:w-[30%] rounded-lg md:w-[53%] w-[84%] md:ms-[21%] lg:ms-0 ms-7 border-2 lg:order-last bg-white -order-last mt-8 h-[30%] shadow'}>
                {
                    list.map((items, index) => (
                        <ul key={index} className='flex justify-between border-b border-gray-500 p-5'>
                            <li className='font-semibold'>{items.name}</li>
                            <li className={storeIndex > index ? 'mt-2 text-pink-500' : 'mt-2'}>{storeIndex > index ? items.icon2 : items.icon}</li>
                        </ul>
                    ))
                }
            </div> */}
            </div>
        </section>

    )
}

export default Paymentpage
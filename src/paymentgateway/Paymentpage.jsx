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
    const storeIndex = useSelector((state => state.counterReducer.currentStep))
    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            dispatch(handleNextStep({ currentStep: -1 }));
        };
    }, [dispatch]);

    return (
        <section className='shadow-lg bg-pink-500 rounded-lg w-full p-5'>
            <div className='w-full'>
                <div className='stepContainer'>
                    {storeIndex === 0 && <Address />}
                    {storeIndex === 1 && <Delivery />}
                    {storeIndex === 2 && <Paymentgateway />}
                    {storeIndex === 3 && <Thank />}
                </div>
            </div>
        </section>

    )
}

export default Paymentpage
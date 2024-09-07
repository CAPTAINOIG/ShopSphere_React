import React, { useState } from 'react'
import { BsSearch } from "react-icons/bs";


const Input = () => {
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearch =()=>{

    }
  return (
    <>
    {/* <div>
        <input type="text" placeholder="Enter your text here..." class="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-black focus:ring-2 focus:ring-blue-500" />
    </div> */}

<div className="flex lg:w-[60%] md:w-[70%] rounded-full h-[40px] md:ms-0 items-center lg:gap-[50px] md:gap-[50px] bg-white">
  <input 
    className="py-3 bg-transparent outline-none px-4 border border-gray-300 w-full rounded-full" 
    type="text"  
    placeholder="Search by keyword..." 
    value={searchQuery} 
    onChange={handleSearch} 
  />
</div>

    </>
  )
}

export default Input
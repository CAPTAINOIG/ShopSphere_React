import React from 'react'

const Sponsor = () => {
  return (
    <div>
      <div className=' bg-gray-800 my-5 lg:py-0 md:py-0 py-5'>
        <h2 className='text-2xl font-bold text-white text-center mb-6'>Supporting Brands</h2>
        <div className='flex flex-wrap justify-center gap-8'>
          <div className='w-24 h-16 mb-5 flex items-center justify-center border border-gray-300 rounded-lg shadow-lg p-2 bg-white'>
            <span className='text-xl font-semibold'>eBay</span>
          </div>
          <div className='w-24 h-16 flex items-center justify-center border border-gray-300 rounded-lg shadow-lg p-2 bg-white'>
            <span className='text-xl font-semibold'>Amazon</span>
          </div>
          <div className='w-24 h-16 flex items-center justify-center border border-gray-300 rounded-lg shadow-lg p-2 bg-white'>
            <span className='text-xl font-semibold'>Nike</span>
          </div>
          <div className='w-24 h-16 flex items-center justify-center border border-gray-300 rounded-lg shadow-lg p-2 bg-white'>
            <span className='text-xl font-semibold'>Gucci</span>
          </div>
          <div className='w-24 h-16 flex items-center justify-center border border-gray-300 rounded-lg shadow-lg p-2 bg-white'>
            <span className='text-xl font-semibold'>Versace</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sponsor
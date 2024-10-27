import React, { useState } from 'react';
import { faqs } from './faqsdata';

const Faqs = () => {

  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index); 
  };

  return (
    <div className='max-w-2xl mx-auto my-8'>
      <h2 className='text-2xl font-semibold text-center mb-6'>Frequently Asked Questions</h2>
      <div className='space-y-4'>
        {faqs.map((faq, index) => (
          <div key={index} className='border border-gray-300 rounded-lg'>
            <div
              onClick={() => toggleFAQ(index)}
              className='p-4 cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-lg'
            >
              <h3 className='text-lg font-medium'>{faq.question}</h3>
            </div>
            {openFAQ === index && (
              <div className='p-4 bg-white'>
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;

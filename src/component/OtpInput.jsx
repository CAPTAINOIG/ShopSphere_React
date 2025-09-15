// OtpInput.jsx
import React, { useState } from 'react';

const OtpInput = ({ onSubmit }) => {
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return; 

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically focus on the next input field
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }

    // If all inputs are filled, run the onSubmit function
    if (newOtp.every(num => num !== '')) {
      onSubmit(newOtp.join(''));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  return (
    <div className="flex space-x-2">
      {otp.map((num, index) => (
        <input
          key={index}
          id={`otp-${index}`}
          type="text"
          maxLength="1"
          value={num}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-12 h-12 text-center border border-gray-300 rounded"
        />
      ))}
    </div>
  );
};

export default OtpInput;

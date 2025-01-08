import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useSelector } from 'react-redux';

const Countryaddress = ({setLocation}) => {
  const [localLocation, setLocalLocation] = useState('');

const store = useSelector((state)=> state.counterReducer.address)


const handleSelect = (selectedOption) => {
  const selectedLocation = selectedOption.label || selectedOption.value.description;
  setLocalLocation(selectedLocation);
  setLocation(selectedLocation);  
};
  return (
    <div className='border border-black rounded lg:ms-10 md:ms-3 ms-3  w-[63%] lg:w-[80%] md:w-[62%] h-[40px]'>
    <div className='cursor-pointer'>
      <GooglePlacesAutocomplete
        apiKey=" AIzaSyAiBBG3mp9DjIydSmBo4FdHJKRsAREZgcc" 
        selectProps={{
          onChange: handleSelect,
        }}
        placeholder="Search for a location"
        styles={{
          container: {
            flex: 1,
            width: '100%',
          },
          textInputContainer: {
            backgroundColor: 'transparent',
            borderRadius: '0.375rem',
            borderWidth: '1px',
            borderColor: '#d1d5db',
            width: '100%',
            maxWidth: '100%',
            margin: '0 auto',
          },
          textInput: {
            height: '2.75rem',
            borderColor: '#d1d5db',
            borderWidth: '1px',
            borderRadius: '0.375rem',
            paddingHorizontal: '1rem',
            width: '100%',
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
        }}
      />
    </div>
    </div>
  );
};

export default Countryaddress
import React, { useState } from 'react';
import './TextInput.scss';

const TextInput = ({ onChange, value = '', label, placeholder, type = 'text' }) => {

  const [inputValue, setInputValue] = useState(value);

  const handleOnChange = (e) => {
    const val = e.target.value
    setInputValue(val)
    onChange && onChange(val)
  }

  return (
    <div className="TextInput">
      {label && <label for="lname">{label}</label>}
      <input type={type} id="lname" name="lastname" onChange={handleOnChange} value={inputValue} placeholder={placeholder}/>
    </div>
  );
}

export default TextInput;

import React, { useState } from 'react';
import './TextInput.scss';

const TextInput = ({ onChange, value = '', label, placeholder, type = 'text', autocomplete }) => {

  const [inputValue, setInputValue] = useState(value);

  const handleOnChange = (e) => {
    const val = e.target.value
    setInputValue(val)
    onChange && onChange(val)
  }

  return (
    <div className="TextInput">
      {label && <label>{label}</label>}
      <input
        type={type}
        name="lastname"
        onChange={handleOnChange}
        value={inputValue}
        placeholder={placeholder}
        autoComplete={autocomplete}
      />
    </div>
  );
}

export default TextInput;

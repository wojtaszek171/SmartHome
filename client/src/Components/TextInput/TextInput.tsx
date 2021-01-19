import * as React from 'react';
import './TextInput.scss';

const { useState } = React;

interface TextInputProps {
  value: string;
  label: string;
  type?: string;
  autocomplete?: string;
  placeholder?: string;
  onChange?: Function;
}

const TextInput: React.FC<TextInputProps> = ({ onChange, value = '', label, placeholder, type = 'text', autocomplete }) => {

  const [inputValue, setInputValue] = useState(value);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

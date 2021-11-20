import React, { ChangeEvent, FC } from 'react';
import './Checkbox.scss';

export interface CheckboxProps {
  checked?: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox: FC<CheckboxProps> = ({ checked = false, onChange }) => {

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked)
  }

  return (
    <div className='checkbox-component'>
      <input
        type='checkbox'
        onChange={handleChange}
      />
    </div>
  );
};

export default Checkbox;

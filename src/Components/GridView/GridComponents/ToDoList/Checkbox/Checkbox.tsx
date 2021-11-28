import React, { ChangeEvent, FC } from 'react';
import './Checkbox.scss';

export interface CheckboxProps {
  checked?: boolean;
  checkShape?: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox: FC<CheckboxProps> = ({ checked = false, checkShape, onChange }) => {

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked)
  }

  return (
    <div className={`checkbox-component${checkShape ? ' check-shape' : ''}`}>
      <input
        type='checkbox'
        onChange={handleChange}
      />
    </div>
  );
};

export default Checkbox;

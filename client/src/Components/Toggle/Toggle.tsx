import * as React from 'react';
import './Toggle.scss';

const { useState } = React;

interface ToggleProps {
  round?: boolean;
  checked?: boolean;
  label?: string;
  onClick?: Function;
}

const Toggle: React.FC<ToggleProps> = ({ round = true, onClick, checked = false, label }) => {

  const [isChecked, setIsChecked] = useState(checked);

  const handleOnClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(!isChecked);
    onClick && onClick(e.target.checked);
  }

  return (
    <div className="toggle">
      <label className="toggle-content">
        <span className="label noselect">{label}</span>
        <div className="switch">
          <input type="checkbox" onChange={handleOnClick} checked={isChecked}/>
          <span className={`slider ${round && 'round'}`}></span>
        </div>
      </label>
    </div>
  );
}

export default Toggle;

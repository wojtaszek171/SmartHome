import * as React from 'react';
import './Toggle.scss';

const { useState } = React;

interface ToggleProps {
  round?: boolean;
  checked?: boolean;
  label: string;
  onClick?: Function;
}

const Toggle: React.FC<ToggleProps> = ({ round, onClick, checked = false, label }) => {

  const [isChecked, setIsChecked] = useState(checked);

  const handleOnClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(!isChecked);
    onClick && onClick(e.target.checked);
  }

  return (
    <div className="Toggle">
      <label className="toggle-content">
        <div className="switch">
          <input type="checkbox" onChange={handleOnClick} checked={isChecked}/>
          <span className={`slider ${round && 'round'}`}></span>
        </div>
        <span className="label noselect">{label}</span>
      </label>
    </div>
  );
}

export default Toggle;

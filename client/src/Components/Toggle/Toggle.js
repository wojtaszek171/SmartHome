import React, { useState } from 'react';
import './Toggle.scss';

const Toggle = ({ round, onClick, checked = false, label }) => {

  const [isChecked, setIsChecked] = useState(checked);

  const handleOnClick = (e) => {
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

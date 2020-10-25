import React, { useState } from 'react';
import './Toggle.scss';

const Toggle = ({ round, onClick, checked = false }) => {

  const [isChecked, setIsChecked] = useState(checked);

  const handleOnClick = (e) => {
    setIsChecked(!isChecked);
    onClick && onClick(e.target.checked);
  }

  return (
    <div class="Toggle">
      <label class="switch">
        <input type="checkbox" onChange={handleOnClick} checked={isChecked}/>
        <span class={`slider ${round && 'round'}`}></span>
      </label>
    </div>
  );
}

export default Toggle;

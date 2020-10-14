import React from 'react';
import './LeftMenu.scss';
import TemperatureSection from './TemperatureSection';
import leftArrow from './assets/arrow_left.svg';

function LeftMenu() {

  return (
    <div className="left-menu-component">
      <TemperatureSection />
      <div className="button-bar">
        <div className="collapse-button">
          <img src={leftArrow} />
        </div>
      </div>
    </div>
  );
}

export default LeftMenu;

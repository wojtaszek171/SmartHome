import React from 'react';
import './LeftMenu.scss';
import TemperatureSection from './TemperatureSection';

function LeftMenu() {

  return (
    <div className="left-menu-component">
      <TemperatureSection />
    </div>
  );
}

export default LeftMenu;

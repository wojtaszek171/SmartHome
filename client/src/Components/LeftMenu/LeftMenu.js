import React, { useState } from 'react';
import './LeftMenu.scss';
import TemperatureSection from './TemperatureSection';
import leftArrow from './assets/arrow_left.svg';

function LeftMenu() {
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapseClick = () => {
    setCollapsed(!collapsed);
  }

  return (
    <div className="left-menu-component" >
      <div className={`left-menu-content${collapsed ? ' sidebar-collapsed' : ' sidebar-expanded'}`}>
        <TemperatureSection />
      </div>
      <div className="button-bar">
        <div className="collapse-button" onClick={handleCollapseClick}>
          <img src={leftArrow} className={collapsed ? ' sidebar-collapsed' : ' sidebar-expanded'} />
        </div>
      </div>
    </div>
  );
}

export default LeftMenu;

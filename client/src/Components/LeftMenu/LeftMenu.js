import React, { useState } from 'react';
import './LeftMenu.scss';
import TemperatureSection from './TemperatureSection';
import { isMobile } from 'react-device-detect';
import Icon from '../Icon/Icon';

function LeftMenu() {
  const [collapsed, setCollapsed] = useState(isMobile);

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
          <Icon name={'arrow-left'} className={collapsed ? ' sidebar-collapsed' : ' sidebar-expanded'} />
        </div>
      </div>
    </div>
  );
}

export default LeftMenu;

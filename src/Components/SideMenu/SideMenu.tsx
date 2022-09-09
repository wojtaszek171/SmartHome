import React, { FC, ReactElement, useEffect, useState } from 'react';
import './SideMenu.scss';
import Icon from '../Icon/Icon';

interface SideMenuProps {
  isOpen: boolean;
  children: ReactElement;
  onExpand: Function;
}

const SideMenu: FC<SideMenuProps> = ({ isOpen, children, onExpand }) => {
  const [collapsed, setCollapsed] = useState(!isOpen);

  useEffect(() => {
    setCollapsed(!isOpen);
  }, [isOpen]);

  const handleCollapseClick = () => {
    onExpand(collapsed);
    setCollapsed(!collapsed);
  };

  return (
    <div className='side-menu-component'>
      <div className='side-menu-wrapper'>
        <div className='button-wrapper'>
          <div className='collapse-button' onClick={handleCollapseClick}>
            <Icon name={'arrow-left'} className={collapsed ? 'sidebar-collapsed' : 'sidebar-expanded'} />
          </div>
        </div>
        <div className={`side-menu-content-wrapper${collapsed ? ' sidebar-collapsed' : ' sidebar-expanded'}`}>
          <div className={'side-menu-content'}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;

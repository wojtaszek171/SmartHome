import React, { FC, useState } from 'react';
import { eraseCookie } from '../../../helpers';

interface HeaderDropdownProps {
  name: string;
  clearSession: Function;
  openAdmin: Function;
}

const HeaderDropdown: FC<HeaderDropdownProps> = ({ name, clearSession, openAdmin }) => {
  const [expanded, setExpanded] = useState(false);

  const handleAdminClick = () => {
    openAdmin(true);
    setExpanded(false);
  }

  const handleLogout = () => {
    eraseCookie('token');
    clearSession();
    setExpanded(false);
  }

  return (
    <div className={'header-dropdown' + (expanded ? ' expanded' : '')}>
        {name && <button className="dropbtn" onClick={() => setExpanded(!expanded)}>{name}</button>}
        <div className="dropdown-content">
            <a href="#" onClick={handleAdminClick}>Admin</a>
            <a href="#" onClick={handleLogout}>Logout</a>
        </div>
    </div>
  );
}

export default HeaderDropdown;

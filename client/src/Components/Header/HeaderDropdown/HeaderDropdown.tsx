import React, { FC, useState } from 'react';
import { eraseCookie } from '../../../helpers';
import { useHistory } from "react-router-dom";

interface HeaderDropdownProps {
  name: string;
  clearSession: Function;
}

const HeaderDropdown: FC<HeaderDropdownProps> = ({ name, clearSession }) => {
  const [expanded, setExpanded] = useState(false);
  const history = useHistory();

  const handleAdminClick = () => {
    history.push("/admin");
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

import React, { FC, useState } from 'react';
import Modal from '../Modal/Modal';
import Login from '../Login';
import HeaderDropdown from './HeaderDropdown';
import './Header.scss';

interface HeaderProps {
  authToken: string;
  firstName: string;
}

const Header: FC<HeaderProps> = ({ authToken, firstName }) => {
  const [loginVisible, setLoginVisible] = useState(false);

  const handleTitleClick = () => {
    window.location.href = window.location.origin;
  }

  const handleLoginOpen = () => {
    setLoginVisible(true);
  }

  const handleLoginClose = () => {
    setLoginVisible(false);
  }

  return (
    <div className="header-component">
      <span className="header-title noselect" onClick={handleTitleClick}>Smart Home</span>
      {(authToken && firstName) ?
        <HeaderDropdown /> :
        <a href="#" className="login-button noselect" onClick={handleLoginOpen}>Login</a>
      }
      <Modal show={loginVisible} title={"Login to administrate"} onClose={handleLoginClose}>
        <Login onLogin={handleLoginClose}/>
      </Modal>
    </div>
  );
}

export default Header;

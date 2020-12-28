import React, { useState } from 'react';
import './Header.scss';
import Modal from '../Modal/Modal';
import Login from '../Login';

function Header() {
  const [loginVisible, setLoginVisible] = useState(false);

  const handleTitleClick = () => {
    window.location = window.location.origin;
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
      <a href="#" className="login-button noselect" onClick={handleLoginOpen}>Login</a>
      <Modal show={loginVisible} title={"Login to administrate"} onClose={handleLoginClose}>
        <Login/>
      </Modal>
    </div>
  );
}

export default Header;

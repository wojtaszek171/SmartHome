import React from 'react';
import './Header.scss';

function Header() {

  const handleTitleClick = () => {
    window.location = window.location.origin;
  }

  const handleLoginOpen = () => {
    console.log('login clicked');
  }

  return (
    <div className="header-component">
      <span className="header-title" onClick={handleTitleClick}>Aquarium</span>
      <a href="/#" className="login-button" onClick={handleLoginOpen}>Login</a>
    </div>
  );
}

export default Header;

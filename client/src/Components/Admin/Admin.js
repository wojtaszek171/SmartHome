import React, { useEffect } from 'react';
import Toggle from '../Toggle';
import './Admin.scss';

const Admin = () => {

  useEffect(() => {
  
  }, [])

  const handleToggleClick = (value) => {
    console.log('clicked '+value);
  }
  
  return (
    <div className="Admin">
      <div className="header">
        <span className="header-text">Administration panel</span>
      </div>
      <div className="settings">
        <Toggle round onClick={handleToggleClick} />
      </div>
    </div>
  );
}

export default Admin;

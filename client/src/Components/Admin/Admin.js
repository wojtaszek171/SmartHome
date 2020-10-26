import React, { useEffect } from 'react';
import TextInput from '../TextInput';
import Toggle from '../Toggle';
import './Admin.scss';

const Admin = () => {

  useEffect(() => {
  
  }, [])

  const handleToggleClick = (value) => {
    console.log('clicked '+value);
  }

  const handleTextInputChamge = (value) => {
    console.log(value);
  }
  
  return (
    <div className="Admin">
      <div className="header">
        <span className="header-text">Administration panel</span>
      </div>
      <div className="settings">
        <Toggle
          round
          onClick={handleToggleClick}
          label="Access from local network only"
        />
        <TextInput
          label={'setting'}
          placeholder={'put setting'}
          onChange={handleTextInputChamge}
        />
      </div>
    </div>
  );
}

export default Admin;

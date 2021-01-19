import * as React from 'react';
import './Header.scss';
import Modal from '../Modal/Modal';
import Login from '../Login';
import { connect } from 'react-redux';
import HeaderDropdown from './HeaderDropdown';
import { ApplicationState } from 'src/reducers';

const { useState } = React;

interface HeaderProps {
  authToken: string;
}

const HeaderNotConnected: React.FC<HeaderProps> = ({ authToken }) => {
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
      {authToken ?
        <HeaderDropdown /> :
        <a href="#" className="login-button noselect" onClick={handleLoginOpen}>Login</a>
      }
      <Modal show={loginVisible} title={"Login to administrate"} onClose={handleLoginClose}>
        <Login onLogin={handleLoginClose}/>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state: ApplicationState) => {
  const { session: { authToken } } = state;
  return {
    authToken
  }
};

export default connect(
  mapStateToProps,
  {}
)(HeaderNotConnected)

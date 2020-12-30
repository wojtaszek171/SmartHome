import React, { useState } from 'react';
import './Header.scss';
import { connect } from 'react-redux';
import { eraseCookie } from '../../helpers';
import { clearSession } from '../../reducers/session';

const HeaderDropdownNotConnected = ({ firstName, lastName, clearSession }) => {
  const [expanded, setExpanded] = useState(false);

  const handleLogout = () => {
    eraseCookie('token');
    clearSession();
  }

  return (
    <div className={'header-dropdown' + (expanded ? ' expanded' : '')}>
        <button className="dropbtn" onClick={() => setExpanded(!expanded)}>{`${firstName} ${lastName}`}</button>
        <div className="dropdown-content">
            <a href="#">Admin</a>
            <a href="#" onClick={handleLogout}>Logout</a>
        </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { session: { firstName, lastName }} = state;
  return {
    firstName,
    lastName
  }
};

export default connect(
  mapStateToProps,
  {
    clearSession
  }
)(HeaderDropdownNotConnected)


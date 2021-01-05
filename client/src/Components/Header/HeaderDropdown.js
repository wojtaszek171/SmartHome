import React, { useState } from 'react';
import './Header.scss';
import { connect } from 'react-redux';
import { eraseCookie } from '../../helpers';
import { clearSession } from '../../reducers/session';
import { useHistory } from "react-router-dom";

const HeaderDropdownNotConnected = ({ firstName, lastName, clearSession }) => {
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
        {firstName && <button className="dropbtn" onClick={() => setExpanded(!expanded)}>{`${firstName} ${lastName}`}</button>}
        <div className="dropdown-content">
            <a href="#" onClick={handleAdminClick}>Admin</a>
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


import React, { FC, useState } from 'react';
import { Modal, Header } from 'pwojtaszko-design';
import Login from '../Login';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthToken, getFirstName, getLastName } from 'src/selectors/session';
import { eraseCookie } from '../../helpers';
import { clearSession, openAdmin } from 'src/reducers/session/session';
import './Header.scss';

const HeaderContainer: FC = () => {
    const authToken = useSelector(getAuthToken);
    const firstName = useSelector(getFirstName);
    const lastName = useSelector(getLastName);
    const dispatch = useDispatch();
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

    const loggedIn = !!(authToken && firstName);

    const handleAdminClick = () => {
        dispatch(openAdmin(true));
    }

    const handleLogout = () => {
        eraseCookie('token');
        dispatch(clearSession());
    }

    const dropdownConfig: any = [
        {
            item: <span>Admin</span>,
            onClick: handleAdminClick,
            key: 'Admin'
        },
        {
            item: <span>Logout</span>,
            onClick: handleLogout,
            key: 'Logout'
        }
    ]

    return (
        <div className="header-component">
            <Header
                left={<>
                    <span className="header-title" onClick={handleTitleClick}>Smart Home</span>
                </>}
                right={<>
                    {!loggedIn && <a href="#" className="login-button" onClick={handleLoginOpen}>Login</a>}
                </>}
                dropdownTitle={`${firstName} ${lastName}`}
                dropdownElements={loggedIn ? dropdownConfig : []}
            />
            <Modal show={loginVisible} title={"Login to administrate"} onClose={handleLoginClose}>
                <Login onLogin={handleLoginClose} />
            </Modal>
        </div>
    );
}

export default HeaderContainer;

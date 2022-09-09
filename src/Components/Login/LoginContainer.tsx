import React, { FC, useState } from 'react';
import { Login } from 'pwojtaszko-design';
import { useDispatch } from 'react-redux';
import { isDev } from '../../helpers';
import { setSessionData } from '../../reducers/session/session';
import { authenticateAdmin } from '../../restService/restService';

interface LoginContainerProps {
    onLogin?: Function;
}

const LoginContainer: FC<LoginContainerProps> = ({ onLogin }) => {
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();

    const handleLogin = (login: string, password: string) => {
        authenticateAdmin(login, password)
            .then(res => {
                const { id, username, firstName, lastName, token: authToken } = res;
                dispatch(setSessionData({
                    id,
                    username,
                    firstName,
                    lastName,
                    authToken
                }));

                if(isDev()) {
                    document.cookie = `token=${authToken}`;
                }
                setMessage('');

                if (onLogin) {
                    onLogin();
                }
            })
            .catch(err => {
                setMessage('Wrong credentials');
            });
    };

    return (
        <Login
            message={message}
            onLogin={handleLogin}
        />
    );
}

export default LoginContainer;

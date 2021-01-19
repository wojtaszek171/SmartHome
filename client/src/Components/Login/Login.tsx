import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from 'src/reducers';
import { isDev } from '../../helpers';
import { setSessionData } from '../../reducers/session/session';
import { authenticateAdmin } from '../../restService/restService';
import Button from '../Button';
import TextInput from '../TextInput';
import './Login.scss';

const { useState } = React;

interface LoginProps {
    setSessionData: Function;
    onLogin?: Function;
}

const LoginNotConnected: React.FC<LoginProps> = ({ setSessionData, onLogin }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLoginChange = (value: string) => {
        setLogin(value)
    };

    const handlePasswordChange = (value: string) => {
        setPassword(value)
    };

    const handleLogin = async () => {
        const res = await authenticateAdmin(login, password);
        if (res.message) {
            setMessage(res.message);
        } else {
            const { id, username, firstName, lastName, token: authToken } = res;
            setSessionData({
                id,
                username,
                firstName,
                lastName,
                authToken
            });

            if(isDev()) {
                document.cookie = `token=${authToken}`;
            }

            setMessage('');

            if (onLogin) {
                onLogin();
            }
        }
    }

    return (
        <div className="login-component">
            <div className="login-form">
                <TextInput
                    label='username'
                    value={login}
                    autocomplete='off'
                    onChange={handleLoginChange}
                />
                <TextInput
                    label='password'
                    placeholder='******'
                    type='password'
                    value={password}
                    onChange={handlePasswordChange}
                />
                <Button text='login' handleClick={handleLogin}/>
                {message && <span className="login-error">{message}</span>}
            </div>
        </div>
    );
}

const mapStateToProps = (state: ApplicationState) => {
    return {}
};

export default connect(
  mapStateToProps,
  {
    setSessionData
  }
)(LoginNotConnected)

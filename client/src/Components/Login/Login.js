import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setSessionData } from '../../reducers/session';
import { authenticateAdmin } from '../../restService/restService';
import Button from '../Button';
import TextInput from '../TextInput';
import './Login.scss';

const LoginNotConnected = ({ setSessionData }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLoginChange = (value) => {
        setLogin(value)
    };

    const handlePasswordChange = (value) => {
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
            setMessage('');
        }
    }

    return (
        <div className="login-component">
            <div className="login-form">
                <TextInput
                    label='username'
                    value={login}
                    autocomplete={'off'}
                    onChange={handleLoginChange}
                />
                <TextInput
                    label='password'
                    placeholder='******'
                    type='password'
                    value={password}
                    onChange={handlePasswordChange}
                />
                <Button className='login-button' text='login' handleClick={handleLogin}/>
                {message && <span className="login-error">{message}</span>}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
      user: state.user,
    }
};

export default connect(
  mapStateToProps,
  {
    setSessionData
  }
)(LoginNotConnected)

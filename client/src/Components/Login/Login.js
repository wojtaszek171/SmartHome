import React, { useState } from 'react';
import { authenticateAdmin } from '../../restService/restService';
import Button from '../Button';
import './Login.scss';

const Login = (props) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLoginChange = (event) => {
        setLogin(event.target.value)
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    };

    const handleLogin = async () => {
        const res = await authenticateAdmin(login, password);
        if (res.message) {
            setMessage(res.message);
        } else {
            setMessage('');
        }
    }

    return (
        <div className="login-component">
            <div className="login-form">
                <input type='text' placeholder='login' value={login} onChange={handleLoginChange}/>
                <input type='password' placeholder='password' value={password} onChange={handlePasswordChange}/>
                <Button className='login-button' text='login' handleClick={handleLogin}/>
                {message && <span className="login-error">{message}</span>}
            </div>
        </div>
    );
}

export default Login;

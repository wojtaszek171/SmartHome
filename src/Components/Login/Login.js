import React, { useState } from 'react';
import Button from '../Button';
import './Login.scss';

const Login = (props) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginChange = (event) => {
        setLogin(event.target.value)
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    };

    const handleLogin = () => {
        console.log('login');
    }

    return (
        <div className="login-component">
            <div className="login-form">
                <input type='text' placeholder='login' value={login} onChange={handleLoginChange}/>
                <input type='password' placeholder='password' value={password} onChange={handlePasswordChange}/>
                <Button className='login-button' text='login' handleClick={handleLogin}/>
            </div>
        </div>
    );
}

export default Login;

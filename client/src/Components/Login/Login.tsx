import React, { useState } from 'react';
import Button from '../Button';
import TextInput from '../TextInput';
import './Login.scss';

interface LoginProps {
    message: string;
    onLogin: Function;
}

const Login: React.FC<LoginProps> = ({ message, onLogin }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginChange = (value: string) => {
        setLogin(value)
    };

    const handlePasswordChange = (value: string) => {
        setPassword(value)
    };

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
                <Button text='login' handleClick={() => onLogin(login, password)}/>
                {message && <span className="login-error">{message}</span>}
            </div>
        </div>
    );
}

export default Login;

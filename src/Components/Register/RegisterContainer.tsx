import React, { FC, useState } from 'react';
import { Register } from 'pwojtaszko-design';
import { configureAdmin } from 'src/restService/restService';

interface RegisterContainerProps {
    onRegister?: () => void;
}

const RegisterContainer: FC<RegisterContainerProps> = ({ onRegister }) => {
    const [message, setMessage] = useState('');

    const handleRegister = (
        name: string,
        surname: string,
        username: string,
        password: string,
        passwordRe: string
    ) => {
        let canRegister = true;
        setMessage('');

        if (password !== passwordRe) {
            setMessage(prev => prev + 'Passwords does not match \n');
            canRegister = false;
        }

        if (!password.length) {
            setMessage(prev => prev + 'Provide password \n');
            canRegister = false;
        }

        if (!username.length) {
            setMessage(prev => prev + 'Provide username \n');
            canRegister = false;
        }

        if (!name.length) {
            setMessage(prev => prev + 'Provide name \n');
            canRegister = false;
        }

        if (!surname.length) {
            setMessage(prev => prev + 'Provide surname \n');
            canRegister = false;
        }

        if (canRegister) {
            configureAdmin({
                firstName: name,
                lastName: surname,
                username,
                password
            }).then(() => {
                onRegister && onRegister();
            }).catch((e: Error) => {
                setMessage(e.message);
            });
        }
    };

    return (
        <Register
            message={message}
            onRegister={handleRegister}
        />
    );
}

export default RegisterContainer;

import * as React from 'react';
import './Button.scss';

interface ButtonProps {
    text: string;
    handleClick: Function;
}

const Button: React.FC<ButtonProps> = ({ text, handleClick }) => {

    const handleOnClick = () => {
        if (handleClick) {
            handleClick();
        }
    }

    return (
        <div className="button-component noselect">
            <button onClick={handleOnClick}>{text}</button>
        </div>
    );
}

export default Button;

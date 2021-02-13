import * as React from 'react';
import './Button.scss';

interface ButtonProps {
    text: string;
    handleClick: Function;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, handleClick, disabled = false }) => {

    const handleOnClick = () => {
        if (handleClick) {
            handleClick();
        }
    }

    return (
        <div className={`button-component noselect ${disabled ? ' disabled' : ''}`}>
            <button disabled={disabled} onClick={handleOnClick}>{text}</button>
        </div>
    );
}

export default Button;

import React from 'react';
import './Button.scss';

const Button = (props) => {
    const { text } = props;

    const handleOnClick = () => {
        const { onClick } = props

        if (onClick) {
            onClick();
        }
    }

    return (
        <div className="button-component">
            <button onClick={handleOnClick}>{text}</button>
        </div>
    );
}

export default Button;

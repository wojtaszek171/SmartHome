import React from 'react';
import './Button.scss';

const Button = (props) => {
    const { text } = props;

    const handleOnClick = () => {
        const { handleClick } = props

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

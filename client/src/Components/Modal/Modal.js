import React from 'react';
import './Modal.scss';

const Modal = (props) => {
  const { show, title, onClose, children } = props

  const handleClose = () => {
    onClose();
  }

  return (
    show && <>
        <div className='modal-background'/>
        <div className='modal-component'>
          <div className='title-box'>
            <span>{title}</span>
          </div>
          {onClose && <span className='close-button noselect' onClick={handleClose}>x</span>}
          <div className='content-box'>
            {children}
          </div>
          <div className='footer-box'></div>
        </div>
        </>
  );
}

export default Modal;

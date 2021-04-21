import React, { FC, useEffect, useRef } from 'react';
import './Modal.scss';

interface ModalProps {
  show: Boolean;
  title: string;
  onClose: Function;
  children: React.ReactElement;
}

const Modal: FC<ModalProps> = ({ show, title, onClose, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    onClose();
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      handleClose();
    }
  };

  const handleClickEscape = (event: KeyboardEvent) => {
    if (event.keyCode === 27) { 
      handleClose();
    }
  };
 
  useEffect(() => {
    if (onClose) {
      document.addEventListener('click', handleClickOutside, true);
      document.addEventListener('keydown', handleClickEscape, true)
      return () => {
        document.removeEventListener('click', handleClickOutside, true);
        document.removeEventListener('keydown', handleClickEscape, true)
      };
    }
  });

  return (
    show && <>
        <div className='modal-background'/>
        <div className='modal-component' ref={ref}>
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

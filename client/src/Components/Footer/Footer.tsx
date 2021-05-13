import React, { FC, ReactElement } from 'react';
import './Footer.scss';

interface FooterProps {
  left?: ReactElement;
  middle?: ReactElement;
  right?: ReactElement;
}

const Footer: FC<FooterProps> = ({ left, middle, right }) => {

  return (
    <div className="pwd-footer-component">
      <div className='pwd-footer-left'>
        {left}
      </div>
      <div className='pwd-footer-middle'>
        {middle}
      </div>
      <div className='pwd-footer-rigth'>
        {right}
      </div>
    </div>
  );
}

export default Footer;

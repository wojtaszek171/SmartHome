import React from 'react';
import './GridItem.scss';

const GridItem = ({ children, title }) => {
  return (
    <div className="grid-item-component">
      {title && <span className="item-title">{title}</span>}
      <div className="item-content">
        {children}
      </div>
    </div>
  );
}

export default GridItem;

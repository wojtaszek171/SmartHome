import React, { FC } from 'react';
import './GridItem.scss';

interface GridItemProps {
  title?: string;
  children: React.ReactNode;
}

const GridItem: FC<GridItemProps> = ({ children, title }) => {
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

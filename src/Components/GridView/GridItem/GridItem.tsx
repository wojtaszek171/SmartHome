import React, { FC, useEffect, useRef } from 'react';
import './GridItem.scss';

interface GridItemProps {
  title?: string;
  children: React.ReactNode;
}

const GridItem: FC<GridItemProps> = ({ children, title }) => {
  const gridItemRef = useRef<HTMLDivElement>(null);
  
  const currentScrollHeight = gridItemRef.current?.scrollHeight;

  useEffect(() => {
      if (gridItemRef.current) {

      }
  }, [currentScrollHeight]);

  return (
    <div className='grid-item-component' ref={gridItemRef}>
      {title && <span className='item-title'>{title}</span>}
      <div className='item-content'>
        {children}
      </div>
    </div>
  );
}

export default GridItem;

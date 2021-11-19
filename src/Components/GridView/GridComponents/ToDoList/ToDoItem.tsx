import React, { CSSProperties, FC } from 'react';

export interface ToDoItemProps {
  title?: string;
  order: number;
  styles?: CSSProperties;
  checked?: boolean;
}

const ToDoItem: FC<ToDoItemProps> = ({ title, styles, checked }) => {

  return (
    <div className='todo-item-component'>
      {checked && <div className='todo-row-checkbox'><input type='checkbox' /></div>}
      <span className='todo-row-title' style={styles}>{title}</span>
    </div>
  );
};

export default ToDoItem;

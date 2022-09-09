import React, { CSSProperties, FC } from 'react';
import { Checkbox } from 'pwojtaszko-design';

export interface ToDoItemProps {
  title?: string;
  order: number;
  styles?: CSSProperties;
  checked?: boolean;
}

const ToDoItem: FC<ToDoItemProps> = ({ title, styles, checked }) => {

  return (
    <div className='todo-item-component'>
      <span className='todo-row-title' style={styles}>{title}</span>
      {checked !== undefined && <div className='todo-row-checkbox'>
        <Checkbox
          checked={checked}
          checkShape={true}
        />
      </div>}
    </div>
  );
};

export default ToDoItem;

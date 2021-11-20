import React, { ChangeEvent, CSSProperties, FC } from 'react';
import Checkbox from './Checkbox';

export interface ToDoItemProps {
  title?: string;
  order: number;
  styles?: CSSProperties;
  checked?: boolean;
}

const ToDoItem: FC<ToDoItemProps> = ({ title, styles, checked }) => {

  const handleCheckboxChange = (changedChecked: boolean) => {
    console.log(changedChecked);
  }

  return (
    <div className='todo-item-component'>
      {checked !== undefined && <div className='todo-row-checkbox'>
        <Checkbox
          checked={checked}
          onChange={handleCheckboxChange}
        />
      </div>}
      <span className='todo-row-title' style={styles}>{title}</span>
    </div>
  );
};

export default ToDoItem;

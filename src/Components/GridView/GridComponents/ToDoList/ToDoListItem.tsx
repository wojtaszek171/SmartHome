import React, { FC } from 'react';

interface ToDoListItemProps {
    title?: string
}

const ToDoListItem: FC<ToDoListItemProps> = ({ title }) => {

  return (
    <div className="todo-item">
      <span className='todo-title'>
        {title}
      </span>
      <div className='todo-button'>✎</div>
      <div className='todo-button'>🗑</div>
    </div>
  );
}

export default ToDoListItem;

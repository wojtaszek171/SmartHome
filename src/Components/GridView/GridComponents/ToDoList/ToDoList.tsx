import React, { FC } from 'react';
import './ToDoList.scss';
import ToDoListItem from './ToDoListItem';

interface ToDoListProps {
}

const ToDoList: FC<ToDoListProps> = () => {

  return (
    <div className="todo-section-component">
      <ToDoListItem title={'test title'} />
      <ToDoListItem title={'test title'} />
      <ToDoListItem title={'test title'} />
    </div>
  );
}

export default ToDoList;

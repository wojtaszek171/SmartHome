import React, { FC } from 'react';
import ToDoItem, { ToDoItemProps } from './ToDoItem';
import './ToDoList.scss';

interface ToDoListProps {
  list: ToDoItemProps[]
}

const ToDoList: FC<ToDoListProps> = ({ list }) => {

  const sortedList = list.sort((a, b) => a.order - b.order);
  return (
    <div className="todo-component">
      {sortedList.map((toDoItem) => <ToDoItem {...toDoItem}/>)}
    </div>
  );
};

export default ToDoList;

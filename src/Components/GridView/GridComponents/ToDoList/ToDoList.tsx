import React, { FC, useState } from 'react';
import ToDoItem, { ToDoItemProps } from './ToDoItem';
import { Button, Input, Modal } from 'pwojtaszko-design';
import './ToDoList.scss';

interface ToDoListProps {
  list: ToDoItemProps[]
}

const ToDoList: FC<ToDoListProps> = ({ list }) => {
  const [showModal, setShowModal] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState('');
  const sortedList = list.sort((a, b) => a.order - b.order);

  const handleAddClick = () => {
    setShowModal(true);
  }

  const createNewItem = () => {
    setShowModal(true);
  }

  return (
    <div className='todo-component'>
      {sortedList.map((toDoItem) => <ToDoItem {...toDoItem}/>)}
      <div
        onClick={handleAddClick}
        className='todo-add-button'
      >
        <span>+</span>
      </div>
      <Modal
        show={showModal}
        onClose={() => { setShowModal(false) }}
      >
        <div className='todo-item-creator'>
          <Input
            type='text'
            label=''
            value={newItemTitle}
            onChange={setNewItemTitle}
            autocomplete='off'
          />
          <div className='submit-button'>
            <Button
              handleClick={createNewItem}
              text='Dodaj'
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ToDoList;

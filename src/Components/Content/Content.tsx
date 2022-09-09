import React from 'react';
import './Content.scss';
import GridView from '../GridView';

const Content = () => {

  return (
    <div className='content-component'>
        <div className='content-box'>
          <GridView />
        </div>
    </div>
  );
}

export default Content;

import React from 'react';
import './Content.scss';
import Button from '../Button';
import VideoStream from '../VideoStream/VideoStream';

function Content() {

  return (
    <div className="content-component">
        <div className="content-box">
          <Button text={'Przycisk'} onClick={()=>{console.log('button clicked');}}/>
          <VideoStream />
        </div>
    </div>
  );
}

export default Content;

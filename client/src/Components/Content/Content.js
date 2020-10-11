import React from 'react';
import './Content.scss';
// import Button from '../Button';
import VideoStream from '../VideoStream/VideoStream';
import LeftMenu from '../LeftMenu';

function Content() {

  return (
    <div className="content-component">
        <div className="content-box">
          <LeftMenu />

          {/* <Button text={'Przycisk'} onClick={()=>{console.log('button clicked');}}/> */}
          <VideoStream />
        </div>
    </div>
  );
}

export default Content;

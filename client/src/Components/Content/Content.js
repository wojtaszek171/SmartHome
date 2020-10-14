import React from 'react';
import './Content.scss';
import VideoStream from '../VideoStream/VideoStream';

function Content() {

  return (
    <div className="content-component">
        <div className="content-box">
          <VideoStream />
        </div>
    </div>
  );
}

export default Content;

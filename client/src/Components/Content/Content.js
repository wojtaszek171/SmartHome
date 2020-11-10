import React from 'react';
import './Content.scss';
import VideoStream from '../VideoStream/VideoStream';
import GridView from '../GridView';

function Content() {

  return (
    <div className="content-component">
        <div className="content-box">
          <GridView />
        </div>
    </div>
  );
}

export default Content;

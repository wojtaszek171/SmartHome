import * as React from 'react';
import './VideoStream.scss';
import VideoPlayer from 'react-video-js-player';
import poster from './poster.jpg';

const VideoStream = () => {
  const streamUrl = 'https://pwojtaszko.ddns.net:8085/hls/stream.m3u8';
  return (
    <div className="video-stream-component">
      <VideoPlayer
        controls={true}
        src={streamUrl}
        poster={poster}
      />
    </div>
  );
}

export default VideoStream;

import React from 'react';
import './VideoStream.scss';
import VideoPlayer from 'react-video-js-player';

function VideoStream() {
  const streamUrl = 'https://pwojtaszko.ddns.net:8085/hls/stream.m3u8';

  return (
    <div className="video-stream-component">
      <VideoPlayer
        controls={true}
        src={streamUrl}
      />
    </div>
  );
}

export default VideoStream;

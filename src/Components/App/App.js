import React, { useEffect } from 'react';
import './App.scss';
import Button from '../Button';
import Header from '../Header';
import HLSPlayer from 'react-hls';


function App() {

  useEffect(() => {
  
  }, [])
  return (
    <div className="App">
      <Header />
      <Button text={'Przycisk'} onClick={()=>{console.log('button clicked');}}/>
      <iframe width="960" height="720" src="http://pwojtaszko.ddns.net:8081"/>
      <video controls>
          <source src="http://pwojtaszko.ddns.net:8160/video.avi"/>
      </video>
      <HLSPlayer source={'http://pwojtaszko.ddns.net:8160/video.m3u8'} />
    </div>
  );
}

export default App;

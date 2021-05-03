import React, { useEffect, useState } from 'react';
import { getSockets } from '../../../../restService/restService';
import Sockets from './Sockets';

const SocketsContainer = () => {
  const [socketsSettings, setSocketsSettings] = useState([]);

  useEffect(() => {
    getSocketsSettings();
    setInterval(
      getSocketsSettings,
    5000);
  }, [])

  const getSocketsSettings = async () => {
    getSockets().then(res => {
      setSocketsSettings(res);
    }).catch(e => {
      console.log(e);
    });
  }

  return (
    <Sockets
      socketsSettings={socketsSettings}
    />
  );
}

export default SocketsContainer;

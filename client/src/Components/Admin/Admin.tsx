import * as React from 'react';
import { getWeatherLat, getWeatherLon } from 'src/restService/restService';
import Button from '../Button';
import TextInput from '../TextInput';
import './Admin.scss';
import SocketsSettings from './SocketsSettings/SocketsSettings';

const { useEffect, useState } = React;

const Admin = () => {

  const [weatherLat, setWeatherLat] = useState(0);
  const [weatherLon, setWeatherLon] = useState(0);
  const [socketsValues, setSocketValues] = useState({});

  const [updateDisabled, setUpdateDisabled] = useState(true);

  useEffect(() => {
    getWeatherLat().then(res => {
      setWeatherLat(res.value);
    })
    
    getWeatherLon().then(res => {
      setWeatherLon(res.value);
    })
  }, [])

  const handleLatChange = (value: number) => {
    setWeatherLat(value);
    setUpdateDisabled(false);
  }

  const handleLonChange = (value: number) => {
    setWeatherLon(value);
    setUpdateDisabled(false);
  }

  const handleSettingsUpdate = () => {
    console.log('update');
  }

  const handleSocketsUpdate = (values: any) => {
    console.log(values);
    
    setSocketValues(values);
    setUpdateDisabled(false);
  }

  return (
    <div className="Admin">
      <div className="header">
        <span className="header-text">Administration panel</span>
      </div>
      <div className="settings">
        <span className="setting-title">
          Weather
        </span>
        <div className="coordinates">
          <TextInput
            label={'Lat'}
            value={weatherLat}
            type="number"
            onChange={handleLatChange}
          />
          <TextInput
            label={'Lon'}
            value={weatherLon}
            type="number"
            onChange={handleLonChange}
          />
        </div>
        <span className="setting-title">
          Sockets
        </span>
        <SocketsSettings onChange={handleSocketsUpdate}/>
        <Button text="Update settings" disabled={updateDisabled} handleClick={handleSettingsUpdate}/>
      </div>
    </div>
  );
}

export default Admin;

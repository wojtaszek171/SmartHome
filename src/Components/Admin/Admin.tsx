import React, { FC, useEffect, useState } from 'react';
import SocketsSettings, { SocketItem } from './SocketsSettings/SocketsSettings';
import { AdminSettingsValues } from './AdminContainer';
import { Button, Input } from 'pwojtaszko-design';
import './Admin.scss';

interface AdminProps {
  settings: AdminSettingsValues;
  error: string;
  onSettingUpdate: Function;
}

const Admin: FC<AdminProps> = ({ settings, error, onSettingUpdate }) => {
  const [weatherLat, setWeatherLat] = useState('');
  const [weatherLon, setWeatherLon] = useState('');
  const [changedSockets, setChangedSockets] = useState<Array<SocketItem>>([]);

  const [updateDisabled, setUpdateDisabled] = useState(true);
  
  useEffect(() => {
    if(weatherLat !== settings.weatherLat || weatherLon !== settings.weatherLon || changedSockets.length) {
      setUpdateDisabled(false);      
    } else {
      setUpdateDisabled(true);
    }
  }, [weatherLat, weatherLon, changedSockets, settings])

  useEffect(() => {
    setWeatherLat(settings.weatherLat);
    setWeatherLon(settings.weatherLon);
  }, [settings]);

  const handleSocketsUpdate = (values: any) => {
    setChangedSockets(values);
  };

  const handleSettingsUpdate = () => {
    onSettingUpdate(
      changedSockets,
      [
        {
          name: 'weatherLat',
          value: weatherLat
        },
        {
          name: 'weatherLon',
          value: weatherLon
        }
      ]
    );
  };

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
          <Input
            label={'Lat'}
            value={weatherLat}
            type='number'
            onChange={setWeatherLat}
          />
          <Input
            label={'Lon'}
            value={weatherLon}
            type='number'
            onChange={setWeatherLon}
          />
        </div>
        <span className="setting-title">
          Sockets
        </span>
        <SocketsSettings
          onChange={handleSocketsUpdate}
          socketsFromDB={settings.socketsFromDB}
        />
        <Button
          text="Update settings"
          disabled={updateDisabled}
          handleClick={handleSettingsUpdate}
        />
        {error && <span className="update-error">{error}</span>}
      </div>
    </div>
  );
}

export default Admin;

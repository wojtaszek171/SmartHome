import React, { FC, useEffect, useState } from 'react';
import { SocketItem } from './SocketsSettings/SocketsSettings';
import { AdminSettingsValues } from './AdminContainer';
import { Button, Input } from 'pwojtaszko-design';
import { TFunction } from 'react-i18next';
import SocketsSettings from './SocketsSettings';
import './Admin.scss';

interface AdminProps {
  settings: AdminSettingsValues;
  error: string;
  onSettingUpdate: Function;
  t: TFunction
}

const Admin: FC<AdminProps> = ({ settings, error, onSettingUpdate, t }) => {
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
        <span className="header-text">{t('adminPanel')}</span>
      </div>
      <div className="settings">
        <span className="setting-title">
          {t('weather')}
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
          {t('sockets')}
        </span>
        <SocketsSettings
          onChange={handleSocketsUpdate}
          socketsFromDB={settings.socketsFromDB}
        />
        <Button
          text={t('updateSettings')}
          disabled={updateDisabled}
          onClick={handleSettingsUpdate}
        />
        {error && <span className="update-error">{error}</span>}
      </div>
    </div>
  );
}

export default Admin;

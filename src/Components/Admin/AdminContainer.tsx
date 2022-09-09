import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import i18nInstance from 'src/i18n/i18nInstance';
import { getSockets, getWeatherLat, getWeatherLon, setSetting, setSocket } from 'src/restService/restService';
import { getAuthToken } from 'src/selectors/session';
import Admin from './Admin';
import { socketsConfig } from './SocketsSettings/socketsConfig';
import { SocketItem, SocketsObject } from './SocketsSettings/SocketsSettings';

export interface AdminSettingsValues {
  weatherLat: string;
  weatherLon: string;
  socketsFromDB: SocketsObject;
}

const initialConfig = {
  weatherLat: '',
  weatherLon: '',
  socketsFromDB: {...socketsConfig}
}

const AdminContainer: FC = () => {
  const [settings, setSettings] = useState<AdminSettingsValues>({...initialConfig});
  const [error, setError] = useState('');
  const authToken = useSelector(getAuthToken);
  const { t } = useTranslation('common', { i18n: i18nInstance });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const settingsObject: AdminSettingsValues = {...initialConfig};

    await getWeatherLat().then(res => {
      settingsObject.weatherLat = res.value;
    });
    
    await getWeatherLon().then(res => {
      settingsObject.weatherLon = res.value;
    });

    await getSockets().then(res => {
      if (res && !res.message) {
          const socketsRes: SocketsObject = {...socketsConfig};

          res.forEach((socket: SocketItem) => {
              socketsRes[socket.key] = {...socket};
          });
          
          settingsObject.socketsFromDB = socketsRes;
      }
    });

    setSettings({...settingsObject});
  };

  const handleSettingsUpdate = (changedSockets: Array<SocketItem>, changedSettings: Array<{ name: string, value: any }>) => {
    setError('');

    if (changedSockets.some(socket => (socket.start && !socket.stop) || (!socket.start && socket.stop))) {
      setError('If you set start then you must set stop and vice versa');
      return;
    }

    Promise.all(changedSockets.map(socketObject => setSocket(authToken, socketObject)))
      .then(() => {
        fetchSettings();
      })
      .catch(e => {
        setError(e.message);
      });

    Promise.all(changedSettings.map(settingObject => setSetting(authToken, settingObject)))
      .then(() => {
        fetchSettings();
      })
      .catch(e => {
        setError(e.message);
      });
  };

  return (
    <Admin
      onSettingUpdate={handleSettingsUpdate}
      error={error}
      settings={settings}
      t={t}
    />
  );
}

export default AdminContainer;

import * as React from 'react';
import { getWeatherLat, getWeatherLon, setSocket } from 'src/restService/restService';
import Button from '../Button';
import TextInput from '../TextInput';
import './Admin.scss';
import SocketsSettings, { SocketItem, SocketsObject } from './SocketsSettings/SocketsSettings';
import { ApplicationState } from 'src/reducers';
import { connect } from 'react-redux';

const { useEffect, useState } = React;

interface FetchedValues {
  weatherLat: String;
  weatherLon: String;
}

const initialConfig = {
  weatherLat: '',
  weatherLon: ''
}

interface AdminProps {
  authToken: string;
}

const Admin: React.FC<AdminProps> = ({ authToken }) => {
  const [fetchedValues, setFetchedValues] = useState<FetchedValues>({...initialConfig});
  const [weatherLat, setWeatherLat] = useState('');
  const [weatherLon, setWeatherLon] = useState('');
  const [error, setError] = useState('');
  const [changedSockets, setChangedSockets] = useState<Array<SocketItem>>([]);

  const [updateDisabled, setUpdateDisabled] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, [])
  
  useEffect(() => {
    if(weatherLat !== fetchedValues.weatherLat || weatherLon !== fetchedValues.weatherLon || changedSockets.length) {
      setUpdateDisabled(false);
    } else {
      setUpdateDisabled(true);
    }
  }, [weatherLat, weatherLon, changedSockets, fetchedValues])

  const fetchSettings = async () => {
    let settingsObject: FetchedValues = {...initialConfig};

    await getWeatherLat().then(res => {
      setWeatherLat(res.value);
      settingsObject.weatherLat = res.value;
    })
    
    await getWeatherLon().then(res => {
      setWeatherLon(res.value);
      settingsObject.weatherLon = res.value;
    })

    setFetchedValues({...settingsObject});
  }

  const handleLatChange = (value: string) => {
    setWeatherLat(value);
  }

  const handleLonChange = (value: string) => {
    setWeatherLon(value);
  }

  const handleSocketsUpdate = (values: any) => {
    setChangedSockets(values);
  }

  const handleSettingsUpdate = () => {
    changedSockets.forEach(socketObject => {
      setSocket(authToken, socketObject);
    });

    setError('Settings update error');
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
            type='number'
            onChange={handleLatChange}
          />
          <TextInput
            label={'Lon'}
            value={weatherLon}
            type='number'
            onChange={handleLonChange}
          />
        </div>
        <span className="setting-title">
          Sockets
        </span>
        <SocketsSettings onChange={handleSocketsUpdate}/>
        <Button text="Update settings" disabled={updateDisabled} handleClick={handleSettingsUpdate}/>
        {error && <span className="update-error">{error}</span>}
      </div>
    </div>
  );
}

const mapStateToProps = (state: ApplicationState) => {
  const { session: { username, authToken } } = state;
  return {
    username,
    authToken
  }
};

export default connect(
  mapStateToProps,
  {}
)(Admin)

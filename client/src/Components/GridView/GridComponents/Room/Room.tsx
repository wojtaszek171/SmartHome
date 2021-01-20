import * as React from 'react';
import './Room.scss';
import { getRoomTemp, getRoomHumidity, getRoomPressure } from '../../../../restService/restService';
import Icon from '../../../Icon/Icon';

const { useEffect, useState } = React;

const Room = () => {
  const [roomTemp, setRoomTemp] = useState('--');
  const [roomPressure, setRoomPressure] = useState('--');
  const [roomHumidity, setRoomHumidity] = useState('--');

  useEffect(() => {
    setSensorValues();
    setInterval(
      setSensorValues,
    5000)
  }, [])

  const setSensorValues = async () => {
    try {
      setRoomTemp((await getRoomTemp()).toString());
      setRoomPressure((await getRoomPressure()).toString());
      setRoomHumidity((await getRoomHumidity()).toString());
    } catch (e) {
      throw e;
    }
  }

  return (
    <div className="room-section-component">
      <div className="room-tile">
        <Icon name='thermometer' width={'30px'}/>
        <span className="text-title">Temperatura</span>
        <span className="text-value">{roomTemp} °C</span>
      </div>
      <div className="room-tile">
        <Icon name='barometer' width={'30px'}/>
        <span className="text-title">Ciśnienie</span>
        <span className="text-value">{roomPressure} hPa</span>
      </div>
      <div className="room-tile">
        <Icon name='humidity' width={'30px'}/>
        <span className="text-title">Wilgotność</span>
        <span className="text-value">{roomHumidity} %</span>
      </div>
    </div>
  );
}

export default Room;

import React, { useEffect, useState } from 'react';
import { getRoomTemp, getRoomHumidity, getRoomPressure } from '../../../../restService/restService';
import Room from './Room';

const RoomContainer = () => {
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
    <Room
      temperature={roomTemp}
      pressure={roomPressure}
      humidity={roomHumidity}
    />
  );
}

export default RoomContainer;

import React, { useEffect, useState } from 'react';
import './RoomTemperature.scss';
import { getRoomTemp } from '../../../../restService/restService';

const RoomTemperature = () => {
  const [roomTemp, setRoomTemp] = useState('--');

  useEffect(() => {
    setTemperatureValue();
    setInterval(
      setTemperatureValue, 
    5000)
  }, [])

  const setTemperatureValue = async () => {
    try {
      const { value } =  await getRoomTemp();

      setRoomTemp(value.toFixed(2));
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="room-temperature-component">
      <div className="text-value">
        <span>{roomTemp}°C</span>
      </div>
    </div>
  );
}

export default RoomTemperature;

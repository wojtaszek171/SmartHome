import * as React from 'react';
import './TemperatureSection.scss';
import { getWaterTemp, getRoomTemp } from '../../../restService/restService';

const { useEffect, useState } = React;

const TemperatureSection = () => {
  const [roomTemp, setRoomTemp] = useState('--');
  const [waterTemp, setWaterTemp] = useState('--');

  useEffect(() => {
    setTemperatureValues();
    setInterval(
      setTemperatureValues, 
    5000)
    
  }, [])

  const setTemperatureValues = async () => {
    try {
      const roomTemp = await getRoomTemp();
      setRoomTemp(roomTemp.toString());
      const waterTemp = await getWaterTemp();
      setWaterTemp(waterTemp.toString());
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="temperature-section-component">
      <div>
        <span className="text-title">Temperature</span>
        <div className="section-box">
          <span className="text-subtitle">Water</span>
          <div className="temp-box">
            <span>{waterTemp}°C</span>
          </div>
        </div>
        <div className="section-box">
          <span className="text-subtitle">Room</span>
          <div className="temp-box">
            <span>{roomTemp}°C</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemperatureSection;

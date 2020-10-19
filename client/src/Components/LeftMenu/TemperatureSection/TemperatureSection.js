import React, { useEffect, useState } from 'react';
import './TemperatureSection.scss';
import { getSensorsData } from '../../../restService/restService';

function TemperatureSection() {
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
      const { response: { waterTemp, roomTemp }, error } = await getSensorsData();
      if (error) {
        throw new Error(error);
      }
      setRoomTemp(roomTemp.value.toFixed(2));
      setWaterTemp(waterTemp.value.toFixed(2));
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

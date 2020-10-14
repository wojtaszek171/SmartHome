import React, { useEffect, useState } from 'react';
import './TemperatureSection.scss';
import leftArrow from '../assets/arrow_left.svg';
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
      const { response, error } = await getSensorsData();
      if (error) {
        throw new Error(error);
      }
      setRoomTemp(response.waterTemp.value);
      setWaterTemp(response.roomTemp.value);
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
      <div className="button-bar">
        <div className="collapse-button">
          <img src={leftArrow} />
        </div>
      </div>
    </div>
  );
}

export default TemperatureSection;

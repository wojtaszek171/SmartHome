import * as React from 'react';
import { getWaterTemp } from '../../../../restService/restService';
import './AquariumSection.scss';

const { useEffect, useState } = React;

const AquariumSection = () => {

  const [waterTemp, setWaterTemp] = useState('--');

  useEffect(() => {
    setTemperatureValue();
    setInterval(
      setTemperatureValue, 
    5000)
  }, [])

  const setTemperatureValue = async () => {
    try {
      setWaterTemp(await getWaterTemp());
    } catch (e) {
      console.log(e); 
    }
  }

  return (
    <div className="aquarium-section-component">
      <div className="water-temperature">
        <div className="text-value">
          <span>{waterTemp}°C</span>
        </div>
      </div>
    </div>
  );
}

export default AquariumSection;

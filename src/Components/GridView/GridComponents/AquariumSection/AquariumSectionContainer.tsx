import React, { useEffect, useState } from 'react';
import { getWaterTemp } from '../../../../restService/restService';
import AquariumSection from './AquariumSection';

const AquariumSectionContainer = () => {
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
    <AquariumSection
      temperature={waterTemp}
    />
  );
}

export default AquariumSectionContainer;

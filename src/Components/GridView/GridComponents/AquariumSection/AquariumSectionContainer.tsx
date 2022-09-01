import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialSensorObject, setSensorsData } from 'src/reducers/sensors/sensors';
import { getSensorByKey } from 'src/selectors/sensors';
import AquariumSection from './AquariumSection';

const SENSOR_KEY = 'waterTemp';

const AquariumSectionContainer = () => {
  const dispatch = useDispatch();
  const waterTemp = useSelector(getSensorByKey(SENSOR_KEY));

  useEffect(() => {
    dispatch(setSensorsData([getInitialSensorObject(SENSOR_KEY)]))
  }, []);

  return (
    <AquariumSection
      temperature={waterTemp}
    />
  );
}

export default AquariumSectionContainer;

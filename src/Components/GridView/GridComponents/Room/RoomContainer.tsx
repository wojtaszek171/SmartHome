import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialSensorObject, setSensorsData } from 'src/reducers/sensors/sensors';
import { Sensor } from 'src/reducers/sensors/types';
import { getSensorByKey } from 'src/selectors/sensors';
import Room from './Room';

interface RoomContainerProps {
  tempKey?: string;
  pressureKey?: string;
  humidityKey?: string;
}

const RoomContainer: FC<RoomContainerProps> = ({ tempKey = '', pressureKey = '', humidityKey = '' }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    const sensorsArray: Sensor[] = [];
    if (tempKey?.length) {
      sensorsArray.push(getInitialSensorObject(tempKey));
    }
    if (pressureKey?.length) {
      sensorsArray.push(getInitialSensorObject(pressureKey));
    }
    if (humidityKey?.length) {
      sensorsArray.push(getInitialSensorObject(humidityKey));
    }
    dispatch(setSensorsData(sensorsArray))
  }, [dispatch, humidityKey, pressureKey, tempKey]);

  const roomTemp = useSelector(getSensorByKey(tempKey));
  const roomPressure = useSelector(getSensorByKey(pressureKey));
  const roomHumidity = useSelector(getSensorByKey(humidityKey));

  return (
    <Room
      temperature={roomTemp}
      pressure={roomPressure}
      humidity={roomHumidity}
    />
  );
}

export default RoomContainer;

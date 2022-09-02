import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { getSensorByKey } from 'src/selectors/sensors';
import Room from './Room';

interface RoomContainerProps {
  tempKey?: string;
  pressureKey?: string;
  humidityKey?: string;
}

const RoomContainer: FC<RoomContainerProps> = ({ tempKey = '', pressureKey = '', humidityKey = '' }) => {
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

import React, { FC } from 'react';
import { Sensor } from 'src/reducers/sensors/types';
import SensorComponent from '../Sensor';
import { SensorTypes } from '../Sensor/Sensor';
import './Room.scss';

interface RoomProps {
  temperature: Sensor;
  pressure: Sensor;
  humidity: Sensor;
}

const Room: FC<RoomProps> = ({ temperature, pressure, humidity }) => {
  return (
    <div className="room-section-component">
      {temperature !== undefined &&
        <SensorComponent
          type={SensorTypes.TEMPERATURE}
          data={temperature}
        />}
      {pressure !== undefined &&
        <SensorComponent
          type={SensorTypes.PRESSURE}
          data={pressure}
        />}
      {humidity !== undefined &&
        <SensorComponent
          type={SensorTypes.HUMIDITY}
          data={humidity}
        />}
    </div>
  );
}

export default Room;

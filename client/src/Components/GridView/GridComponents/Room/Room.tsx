import React, { FC } from 'react';
import Icon from '../../../Icon/Icon';
import './Room.scss';

interface RoomProps {
  temperature: string;
  pressure: string;
  humidity: string;
}

const Room: FC<RoomProps> = ({ temperature, pressure, humidity }) => {
  return (
    <div className="room-section-component">
      <div className="room-tile">
        <Icon name='thermometer' width={'30px'}/>
        <span className="text-title">Temperatura</span>
        <span className="text-value">{temperature} °C</span>
      </div>
      <div className="room-tile">
        <Icon name='barometer' width={'30px'}/>
        <span className="text-title">Ciśnienie</span>
        <span className="text-value">{pressure} hPa</span>
      </div>
      <div className="room-tile">
        <Icon name='humidity' width={'30px'}/>
        <span className="text-title">Wilgotność</span>
        <span className="text-value">{humidity} %</span>
      </div>
    </div>
  );
}

export default Room;

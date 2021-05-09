import React, { FC, useEffect, useState } from 'react';
import { SocketItem } from 'src/Components/Admin/SocketsSettings/SocketsSettings';
import Icon from 'src/Components/Icon/Icon';
import './SocketItem.scss';

interface SocketItemProps extends SocketItem {
  name: string;
};

const SocketItemComponent: FC<SocketItemProps> = ({ name, start, stop, enabled }) => {
  const [startHour, startMin] = start.split(":");
  const [stopHour, stopMin] = stop.split(":");
  const [currentDeg, setCurrentDeg] = useState(0);

  useEffect(() => {
    getCurrentDeg();
    const timeInterval = setInterval(
      getCurrentDeg,
      60000
    );    
    return () => {
      clearInterval(timeInterval);
    }
  }, []);

  const getCurrentDeg = () => {
    const currentDate = new Date();
    setCurrentDeg((Number(currentDate.getHours()) * 60 + Number(currentDate.getMinutes()))/1440*360);
  };

  const socketEnabled = () => {
    if (enabled && !start && !stop) {
      return true;
    }

    const currentDate = new Date();

    const startDate = new Date(currentDate.getTime());
    startDate.setHours(Number(startHour));
    startDate.setMinutes(Number(startMin));

    const stopDate = new Date(currentDate.getTime());
    stopDate.setHours(Number(stopHour));
    stopDate.setMinutes(Number(stopMin));

    if ( startDate > stopDate) {
      return !(startDate < currentDate && stopDate > currentDate);
    }

    return startDate < currentDate && stopDate > currentDate;
  };

  const minutesBetween = () => {
    let startDate = new Date(0, 0, 0, Number(startHour), Number(startMin), 0);
    let endDate = new Date(0, 0, 0, Number(stopHour), Number(stopMin), 0);
    let diff = endDate.getTime() - startDate.getTime();
    let hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    let minutes = Math.floor(diff / 1000 / 60);

    if (hours < 0) {
      hours = hours + 24;
    }

    return hours*60 + minutes;
  };  

  const degrees = minutesBetween()/1440*360;

  const cssDeg = 90 + degrees;
  const startDeg = (Number(startHour) * 60 + Number(startMin))/1440*360;

  return (
    <div className={`socket-item`}>
      {!enabled && <div className='socket-disabled'/>}
      <div className={'socket-title'}>
        <div className={`socket-indicator ${socketEnabled() ? 'enabled' : ''}`}/>
        <span>{name}</span>
      </div>
      <div className='socket-details'>
        <span>{`${start} - ${stop}`}</span>
        <div className='socket-clock'>
          <div className='range' style={{
            backgroundImage: `linear-gradient(${degrees >= 180 ? cssDeg-180 : cssDeg}deg, transparent 49%, ${degrees > 180 ? '#139035' : '#223343'} 50%),
              linear-gradient(90deg, #223343 49%, transparent 50%)`,
            transform: `rotate(${startDeg}deg)`
          }} />
          <div className='clockface'>
            <Icon name='clockface'/>
          </div>
          <div className='clockface-arrow' style={{ transform: `rotate(${currentDeg}deg)` }}>
            <Icon name='clockface-arrow'/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SocketItemComponent;

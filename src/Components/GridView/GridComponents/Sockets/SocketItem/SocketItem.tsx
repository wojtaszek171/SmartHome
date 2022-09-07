import React, { FC, useEffect, useState } from 'react';
import { SocketItem } from 'src/Components/Admin/SocketsSettings/SocketsSettings';
import Icon from 'src/Components/Icon/Icon';
import { parseLightModes } from 'src/utils/lightModes';
import './SocketItem.scss';

interface SocketItemProps extends SocketItem {
  name: string;
};

const SocketItemComponent: FC<SocketItemProps> = ({ name, lightModes, enabled }) => {
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

  const minutesBetween = (startH: number, startM: number, stopH: number, stopM: number) => {
    let startDate = new Date(0, 0, 0, Number(startH), Number(startM), 0);
    let endDate = new Date(0, 0, 0, Number(stopH), Number(stopM), 0);
    let diff = endDate.getTime() - startDate.getTime();
    let hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    let minutes = Math.floor(diff / 1000 / 60);

    if (hours < 0) {
      hours = hours + 24;
    }

    return hours*60 + minutes;
  };

  const socketModesArray = parseLightModes(lightModes);

  const getSlice = (socketMode: string[], i: number ) => {
    const modeHour = socketMode[1].split(':');
    const nextModeHour = (socketModesArray?.[i + 1] || socketModesArray[0])[1].split(':');    
    
    const degrees = minutesBetween(Number(modeHour[0]), Number(modeHour[1]), Number(nextModeHour[0]), Number(nextModeHour[1]))/1440*360 + 1;

    const startDeg = (Number(modeHour[0]) * 60 + Number(modeHour[1]))/1440*360 - 1;

    return <circle className={`mode-${socketMode[0]}`} stroke-dasharray={`${degrees/360*100} 100`} transform={`rotate(${startDeg}, 16, 16)`} />;
  };

  const getSlices = () => {
    if (enabled && !lightModes?.length) {
      return <circle className='mode-1' stroke-dasharray='101 100' />
    }

    if (socketModesArray?.length === 1) {
      return <circle className={`mode-${socketModesArray[0][0]}`} stroke-dasharray='101 100' />
    }

    return socketModesArray.map((mode, i) => getSlice(mode, i));
  };

  const useOnOffOnly = socketModesArray.every(([mode, time]) => {
    return mode === '0' || mode === '1';
  });

  return (
    <div className={`socket-item`}>
      {!enabled && <div className='socket-disabled'/>}
      <div className={'socket-title'}>
        <div className={`socket-indicator ${enabled ? 'enabled' : ''}`}/>
        <span>{name}</span>
      </div>
      <div className='socket-details'>
        <div className='socket-clock'>
          <svg className={`pie${useOnOffOnly ? ' standard' : ''}`} viewBox="0 0 32 32">
            {getSlices()}
          </svg>
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

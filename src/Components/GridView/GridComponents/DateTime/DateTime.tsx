import React from 'react';
import { useTranslation } from 'react-i18next';
import i18nInstance from 'src/i18n/i18nInstance';
import './DateTime.scss';

const { useEffect, useState } =  React;

const DateTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { t } = useTranslation('common', { i18n: i18nInstance })

  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  useEffect(() => {
    const timeInterval = setInterval(
      () => setCurrentTime(new Date()),
      1000
    );

    return () => {
      clearInterval(timeInterval);
    }
  }, [])

  const formatTime = () => {
    return `${('0' + currentTime.getHours()).slice(-2)}:${('0' + currentTime.getMinutes()).slice(-2)}:${('0' + currentTime.getSeconds()).slice(-2)}`;
  }

  return (
    <div className='datetime-component'>
      <div className='date-section'>
        <div className='date-col'>
          <div className='date-row date'>
            <span>{`${('0' + currentTime.getDate()).slice(-2)}.${('0' + (currentTime.getMonth() + 1)).slice(-2)}.${currentTime.getFullYear()}`}</span>
          </div>
          <div className='date-row time'>
            <span>{formatTime()}</span>
          </div>
          <div className='date-row day'>
            <span>{t(days[currentTime.getDay()])}</span>
          </div>
        </div>
      </div> 
    </div>
  );
}

export default DateTime;

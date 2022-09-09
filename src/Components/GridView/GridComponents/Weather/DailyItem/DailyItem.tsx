import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from 'src/Components/Icon/Icon';
import i18nInstance from 'src/i18n/i18nInstance';
import './DailyItem.scss';

const dayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

interface DailyItemProps {
  dayOfWeek: number;
  dayTemp: number;
  nightTemp: number;
  icon: string;
  onClick?: () => void;
}

const DailyItem: FC<DailyItemProps> = ({ dayOfWeek, dayTemp, nightTemp, icon, onClick}) => {
  const { t } = useTranslation('common', { i18n: i18nInstance });

  const handleWeatherClick = () => {
    if(onClick) {
      onClick();
    }
  }

  return (
    <div className='weather-forecast-day' onClick={handleWeatherClick}>
      <span className='day-title'> {t(dayNames[dayOfWeek])} </span>
      <div className='day-image'>
        <Icon name={icon}/>
      </div>
      <span className='temperature-day'>{dayTemp}°C</span>
      <span className='temperature-night'>{nightTemp}°C</span>
    </div>
  );
}

export default DailyItem;

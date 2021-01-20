import * as React from 'react';
import Icon from '../../../../Icon/Icon';
import './DailyItem.scss';

const dayNames = ['niedz', 'pon', 'wt', 'śr', 'czw', 'pt', 'sob']

interface DailyItemProps {
  dayOfWeek: number;
  dayTemp: number;
  nightTemp: number;
  icon: string;
  onClick?: Function;
}

const DailyItem: React.FC<DailyItemProps> = ({ dayOfWeek, dayTemp, nightTemp, icon, onClick}) => {

  const handleWeatherClick = () => {
    if(onClick) {
      onClick();
    }
  }

  return (
    <div className="weather-forecast-day" onClick={handleWeatherClick}>
      <span className="day-title"> {dayNames[dayOfWeek]} </span>
      <div className="day-image">
        <Icon name={icon}/>
      </div>
      <span className="temperature-day">{dayTemp}°C</span>
      <span className="temperature-night">{nightTemp}°C</span>
    </div>
  );
}

export default DailyItem;

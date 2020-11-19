import React from 'react';
import Icon from '../../../../Icon/Icon';
import './DailyItem.scss';

const dayNames = ['niedz', 'pon', 'wt', 'śr', 'czw', 'pt', 'sob']

const DailyItem = ({ dayOfWeek, dayTemp, nightTemp, icon, onClick}) => {

  return (
    <div className="weather-forecast-day" onClick={onClick && onClick}>
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

import React from 'react';
import './DailyItem.scss';

const dayNames = ['niedz', 'pon', 'wt', 'śr', 'czw', 'pt', 'sob']

const DailyItem = ({ day, dayTemp, nightTemp, icon}) => {

  return (
    <div className="weather-forecast-day">
        <span> {dayNames[day]} </span>
        <div className="day-image">
          <img src={`https://openweathermap.org/img/wn/${icon}@4x.png`}/>
        </div>
        <span className="temperature-day">{dayTemp}°C</span>
        <span className="temperature-night">{nightTemp}°C</span>
    </div>
  );
}

export default DailyItem;

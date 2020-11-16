import React from 'react';
import './HourlyItem.scss';

const HourlyItem = ({ hour, temp, icon}) => {

  return (
    <div className="weather-forecast-hour">
        <span className="hour-title">{`${("0" + hour).slice(-2)}:00`}</span>
        <div className="day-image">
          <img src={`https://openweathermap.org/img/wn/${icon}@4x.png`}/>
        </div>
        <span className="temperature">{temp}°C</span>
    </div>
  );
}

export default HourlyItem;

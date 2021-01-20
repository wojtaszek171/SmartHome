import * as React from 'react';
import './DateTime.scss';

const { useEffect, useState } =  React;

const DateTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const days = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];

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
    return `${("0" + currentTime.getHours()).slice(-2)}:${("0" + currentTime.getMinutes()).slice(-2)}:${("0" + currentTime.getSeconds()).slice(-2)}`;
  }

  return (
    <div className="datetime-component">
      <div className="date-section">
        <div className="date-col">
          <div className="date-row date">
            <span>{`${currentTime.getDate()}.${currentTime.getMonth()+1}.${currentTime.getFullYear()}`}</span>
          </div>
          <div className="date-row time">
            <span>{formatTime()}</span>
          </div>
          <div className="date-row day">
            <span>{days[currentTime.getDay()]}</span>
          </div>
        </div>
      </div> 
    </div>
  );
}

export default DateTime;

import React, { useEffect, useRef, useState } from 'react';
import { getCurrentWeather, getDailyWeather } from '../../../../restService/restService';
import DailyItem from './DailyItem/DailyItem';
import './Weather.scss';

const Weather = () => {

  const [weatherCurrent, setWeatherCurrent] = useState({
    temp: null,
    feels_like: null,
    humidity: null,
    pressure: null,
    sunrise: null,
    sunset: null,
    icon: null
  });
  const [weatherDaily, setWeatherDaily] = useState([]);

  let weatherRequestInterval = useRef(null)
  let weatherDailyRequestInterval = useRef(null)

  useEffect(() => {
    fetchCurrentWeather();
    weatherRequestInterval = setInterval(
      fetchCurrentWeather,
      60000 // update every minute
    );

    fetchDailyWeather();
    weatherDailyRequestInterval = setInterval(
      fetchCurrentWeather,
      3600000 // update every hour
    );

    return () => {
      clearInterval(weatherRequestInterval);
    }
  }, [])

  const fetchCurrentWeather = async () => {
    const currentWeather = await getCurrentWeather();
    setWeatherCurrent(currentWeather);
  }

  const fetchDailyWeather = async () => {
    const currentWeather = await getDailyWeather();
    setWeatherDaily(currentWeather);
  }

  return (
    <div className="weather-component">
        <div className="weather-row current">
          <div className="weather-city">
            <span>{'Warszawa'}</span>
          </div>
          <div className="weather-icon">
            <img src={`https://openweathermap.org/img/wn/${weatherCurrent.icon}@4x.png`}/>
          </div>
          <div className="weather-temperature">
            <span>{`${weatherCurrent.temp} °C`}</span>
          </div>
          <div className="weather-humidity">

          </div>
        </div>
        <div className="weather-row forecast">
          {weatherDaily.map((day) => <DailyItem {...day} />)}
        </div>
    </div>
  );
}

export default Weather;

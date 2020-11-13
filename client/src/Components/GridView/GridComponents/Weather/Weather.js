import React, { useEffect, useRef, useState } from 'react';
import { getCurrentWeather } from '../../../../restService/restService';
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
  const [weatherForecast, setWeatherForecast] = useState([]);

  let weatherRequestInterval = useRef(null)

  useEffect(() => {
    fetchCurrentWeather();
    weatherRequestInterval = setInterval(
      fetchCurrentWeather,
      60000
    );

    return () => {
      clearInterval(weatherRequestInterval);
    }
  }, [])

  const fetchCurrentWeather = async () => {
    const currentWeather = await getCurrentWeather();
    setWeatherCurrent(currentWeather);
  }

  const renderForecastItem = () => {
    return <div></div>
  }

  return (
    <div className="weather-component">
        <div className="weather-row current">
          <div className="weather-city">
            <span>{'Warszawa'}</span>
          </div>
          <div className="weather-icon">
            <img src={`http://openweathermap.org/img/wn/${weatherCurrent.icon}@4x.png`}/>
          </div>
          <div className="weather-temperature">
            <span>{`${weatherCurrent.temp} °C`}</span>
          </div>
          <div className="weather-humidity">

          </div>
        </div>
        <div className="weather-row forecast">
          {renderForecastItem()}
        </div>
    </div>
  );
}

export default Weather;

import React, { useEffect, useRef, useState } from 'react';
import './Weather.scss';

const Weather = () => {

  const [weatherCurrent, setWeatherCurrent] = useState({
    temp: 0,
    humidity: 0,
    pressure: 0,
    sunrise: '',
    sunset: '',
    icon: ''
  });
  const [weatherForecast, setWeatherForecast] = useState([]);

  let weatherRequestInterval = useRef(null)

  useEffect(() => {
    fetchWeather();
    weatherRequestInterval = setInterval(
      fetchWeather,
      60000
    );

    return () => {
      clearInterval(weatherRequestInterval);
    }
  }, [])

  const fetchWeather = () => {
    try {
      fetch(`https://pwojtaszko.ddns.net/api/weather/current`)
        .then(response => response.json())
        .then(data => {
          const { temp, humidity, pressure, sunrise, sunset, weather } = JSON.parse(data.value);
          const { icon, description } = weather[0];

          setWeatherCurrent({
            temp: Math.round(temp ),
            humidity,
            pressure,
            sunrise,
            sunset,
            icon
          })
        });
    } catch (e) {
      console.log(e);
    }
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

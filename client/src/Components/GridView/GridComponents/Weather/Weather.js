import React, { useEffect, useRef, useState } from 'react';
import './Weather.scss';

const Weather = () => {

  const [city, setCity] = useState('Warszawa');
  const [apiKey, setApiKey] = useState('');
  const [weatherCurrent, setWeatherCurrent] = useState({
    name: '',
    temp: '',
    humidity: '',
    pressure: '',
    sunrise: '',
    sunset: '',
    icon: ''
  });

  let weatherRequestInterval = useRef(null)

  useEffect(() => {
    fetchWeather();
    weatherRequestInterval = setInterval(
      fetchWeather,
      1800000
    );

    return () => {
      clearInterval(weatherRequestInterval);
    }
  }, [])

  const fetchWeather = () => {
    try {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pl`)
        .then(response => response.json())
        .then(data => {
          const { main: { temp, humidity, pressure }, sys: { sunrise, sunset }, weather, name } = data;
          const { icon, description } = weather[0];
          setWeatherCurrent({
            name,
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
            <span>{weatherCurrent.name}</span>
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

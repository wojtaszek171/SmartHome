import React from 'react';
import './Weather.scss';
import Weather from './Weather';
import { useSelector } from 'react-redux';
import { getCurrentWeather, getDailyWeather, getHourlyWeather } from 'src/selectors/weather';

const WeatherContainer: React.FC = () => {

  const currentWeather = useSelector(getCurrentWeather);
  const dailyWeather = useSelector(getDailyWeather);
  const hourlyWeather = useSelector(getHourlyWeather);

  return (
    <Weather
      current={currentWeather}
      daily={dailyWeather}
      hourly={hourlyWeather}
    />
  );
}


export default WeatherContainer;

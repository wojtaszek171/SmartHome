import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentWeather, getDailyWeather, getHourlyWeather } from 'src/selectors/weather';
import Weather from './Weather';
import './Weather.scss';

const WeatherContainer: FC = () => {

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

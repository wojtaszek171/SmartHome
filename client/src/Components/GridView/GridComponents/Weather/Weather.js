import React, { useEffect, useRef, useState } from 'react';
import { getCurrentWeather, getDailyWeather, getHourlyWeather } from '../../../../restService/restService';
import DailyItem from './DailyItem/DailyItem';
import './Weather.scss';
import Modal from '../../../Modal';
import HourlyItem from './HourlyItem/HourlyItem';
import { Chart } from "react-google-charts";

const Weather = () => {

  const [weatherCurrent, setWeatherCurrent] = useState({
    temp: null,
    feels_like: null,
    humidity: null,
    pressure: null,
    sunrise: null,
    sunset: null,
    icon: null,
    description: null
  });
  const [weatherDaily, setWeatherDaily] = useState([]);
  const [weatherHourly, setWeatherHourly] = useState([]);

  const [hourlyDaySelected, setHourlyDaySelected] = useState([]);
  let weatherRequestInterval = useRef(null)
  let weatherDailyRequestInterval = useRef(null)
  let weatherHourlyRequestInterval = useRef(null)

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

    fetchHourlyWeather();
    weatherHourlyRequestInterval = setInterval(
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
  
  const fetchHourlyWeather = async () => {
    const currentWeather = await getHourlyWeather();
    setWeatherHourly(currentWeather);
  }

  const handleHourlyDaySelect = (day) => {
    setHourlyDaySelected(weatherHourly.filter((hour) => hour.day === day).filter((_, i) => {
      return !((i + 1) % 3);
    }));
  }

  const handleHourlyClose = () => {
    setHourlyDaySelected([]);
  }

  const prepareChartData = () => {
    return hourlyDaySelected.map((hour) => [hour.hour, hour.temp]);
  }

  return (
    <div className="weather-component">
        <div className="weather-row current" onClick={() => handleHourlyDaySelect(new Date().getDate())}>
          <div className="weather-city">
            <span>{'Warszawa'}</span>
          </div>
          <div className="weather-icon">
            <img src={`https://openweathermap.org/img/wn/${weatherCurrent.icon}@4x.png`}/>
          </div>
          <div className="weather-temperature">
            <span>{`${weatherCurrent.temp} °C`}</span>
            <div className="weather-desc">
                <span className="weather-desc">{weatherCurrent.description}</span>
            </div>
          </div>
        </div>
        <div className="weather-row forecast">
          {weatherDaily.map((day) => <DailyItem onClick={() => handleHourlyDaySelect(day.day)} {...day} />)}
        </div>
        <Modal show={!!hourlyDaySelected.length} title={"Pogoda godzinowa"} onClose={handleHourlyClose}>
          <div className="weather-hourly">
            <div className="chart">
              <Chart
                width={'100%'}
                height={100}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={[
                  [
                    { type: 'number', label: 'x' },
                    { id: 'i0', type: 'number' },
                  ],
                  ...prepareChartData()
                ]}
                options={{
                  intervals: { style: 'none' },
                  legend: 'none',
                  curveType: 'function',
                  vAxis: {
                    gridlines: {
                      count: 0
                    },
                    textPosition: 'none'
                  },
                  hAxis: {
                    gridlines: {
                      count: 0
                    },
                    textPosition: 'none'
                  },
                  backgroundColor: { fill:'transparent' },
                  enableInteractivity: false
                }}
              />
            </div>
            <div className="temperatures">
              {hourlyDaySelected.map((hour) => <HourlyItem {...hour} />)}
            </div>
          </div>
        </Modal>
    </div>
  );
}

export default Weather;

import React, { useEffect, useRef, useState } from 'react';
import { getCurrentWeather, getDailyWeather, getHourlyWeather } from '../../../../restService/restService';
import DailyItem from './DailyItem/DailyItem';
import './Weather.scss';
import Modal from '../../../Modal';
import HourlyItem from './HourlyItem/HourlyItem';
import { Chart } from "react-google-charts";
import Icon from '../../../Icon/Icon';

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
  const [daySelected, setDaySelected] = useState({});

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
      clearInterval(weatherDailyRequestInterval);
      clearInterval(weatherHourlyRequestInterval);
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
    setHourlyDaySelected(weatherHourly.filter(hour => hour.day === day));
    if (day !== new Date().getDate()){
      const { humidity, pressure, sunrise, sunset, dayTemp, nightTemp, icon, dt } = weatherDaily.find(dayItem => dayItem.day === day);

      setDaySelected({
        dt,
        icon,
        dayTemp,
        nightTemp,
        humidity,
        pressure,
        sunrise,
        sunset
      });
    } else {
      const { humidity, pressure, sunrise, sunset, temp: dayTemp, icon, dt } = weatherCurrent;
      setDaySelected({
        dt,
        icon,
        dayTemp,
        nightTemp: null,
        humidity,
        pressure,
        sunrise,
        sunset
      })
    }
  }

  const handleHourlyClose = () => {
    setHourlyDaySelected([]);
  }

  const prepareChartData = () => {
    return hourlyDaySelected.map((hour) => [hour.hour, hour.temp, hour.temp]);
  }

  const displayModalTitle = () => {
    const date = new Date(daySelected.dt * 1000);
    return `Pogoda ${("0" + date.getDate()).slice(-2)}.${("0" + date.getMonth()).slice(-2)}`;
  }

  return (
    <div className="weather-component">
        <div className="weather-row current" onClick={() => handleHourlyDaySelect(new Date().getDate())}>
          <div className="weather-city">
            <span>{'Warszawa'}</span>
          </div>
          <div className="weather-icon">
            <Icon name={weatherCurrent.icon}/>
          </div>
          <div className="weather-temperature">
            <span>{`${weatherCurrent.temp}°C`}</span>
            <div className="weather-desc">
                <span className="weather-desc">{weatherCurrent.description}</span>
            </div>
          </div>
        </div>
        <div className="weather-row forecast">
          {weatherDaily.map((day) => <DailyItem onClick={() => handleHourlyDaySelect(day.day)} {...day} />)}
        </div>
        <Modal show={!!hourlyDaySelected.length} title={displayModalTitle()} onClose={handleHourlyClose}>
          <div className="weather-hourly">
            <div className="values">
              <div className="weather-icon">
                <Icon name={daySelected.icon}/>
              </div>
              <div className="weather-temperature">
                <div>
                  {daySelected.dayTemp !== null && <Icon name={'sun'}/>}
                  <span>{`${daySelected.dayTemp} °C`}</span>
                </div>
                {daySelected.nightTemp !== null && 
                  <div>
                    <Icon name={'moon'}/>
                    <span>{`${daySelected.nightTemp} °C`}</span>
                  </div>
                }
              </div>
              <div className="weather-other">
                <div className="other-value">
                  <Icon name='humidity' width={'30px'}/>
                  <span>{`${daySelected.humidity} %`}</span>
                </div>
                <div className="other-value">
                  <Icon name='barometer' width={'30px'}/>
                  <span>{`${daySelected.pressure} hPa`}</span>
                </div>
              </div>
            </div>
            <div className="chart">
              <Chart
                width={'100%'}
                height={100}
                chartType="AreaChart"
                loader={<div>Loading Chart</div>}
                data={[
                  [
                    { type: 'number', label: 'x' },
                    { id: 'i0', type: 'number' },
                    { type: 'number', role: 'annotation' },
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
                    textPosition: 'none',
                    viewWindow: {
                      max: Math.max.apply(Math, hourlyDaySelected.map(o => o.temp)) + 10
                    }
                  },
                  hAxis: {
                    gridlines: {
                      count: 0
                    },
                    textPosition: 'none'
                  },
                  annotations: {
                    stemColor : 'none'
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

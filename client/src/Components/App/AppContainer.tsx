import React, { FC, useEffect } from 'react';
import App from './App';
import { useDispatch, useSelector } from 'react-redux';
import { setWeatherData } from '../../reducers/weather/weather';
import { getCurrentUser, getCurrentWeather, getDailyWeather, getHourlyWeather } from '../../restService/restService';
import { setSessionData, clearSession } from '../../reducers/session/session';
import { getCookie, eraseCookie } from '../../helpers';
import { getAuthToken, getUsername } from 'src/selectors/session';

const AppContainer: FC = () => {
  const authToken = useSelector(getAuthToken);
  const username = useSelector(getUsername);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      dispatch(setSessionData({ authToken: token }));
    }
  }, [])

  useEffect(() => {
    const setCurrentUser = async () => {
      getCurrentUser(authToken).then(res => {
        dispatch(setSessionData(res));
      }).catch(e => {
        if (e.code === 'ERR0001') {
          eraseCookie('token');
          dispatch(clearSession());
        }
      });
    }

    if (authToken && !username) {
      setCurrentUser();
    }
  }, [authToken, username])

  useEffect(() => {
    fetchCurrentWeather();
    const weatherRequestInterval = setInterval(
      fetchCurrentWeather,
      60000 // update every minute
    );

    fetchDailyWeather();
    const weatherDailyRequestInterval = setInterval(
      fetchCurrentWeather,
      3600000 // update every hour
    );

    fetchHourlyWeather();
    const weatherHourlyRequestInterval = setInterval(
      fetchHourlyWeather,
      3600000 // update every hour
    );

    return () => {
      clearInterval(weatherRequestInterval);
      clearInterval(weatherDailyRequestInterval);
      clearInterval(weatherHourlyRequestInterval);
    }
  }, []);

  const fetchCurrentWeather = async () => {
    const current = await getCurrentWeather();
    dispatch(setWeatherData({ current }));
  }

  const fetchDailyWeather = async () => {
    const daily = await getDailyWeather();
    dispatch(setWeatherData({ daily }));
  }
  
  const fetchHourlyWeather = async () => {
    const hourly = await getHourlyWeather();
    dispatch(setWeatherData({ hourly }));
  }

  return (
      <App />
  );
};

export default AppContainer;

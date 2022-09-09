import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthToken, getUsername } from 'src/selectors/session';
import { getCookie, eraseCookie } from '../../helpers';
import { setSessionData, clearSession } from '../../reducers/session/session';
import { setWeatherData } from '../../reducers/weather/weather';
import { getAdminConfigurationStatus, getCurrentUser, getCurrentWeather, getDailyWeather, getHourlyWeather } from '../../restService/restService';
import App from './App';

const AppContainer: FC = () => {
  const [isAdminConfigured, setIsAdminConfigured] = useState(true);
  const authToken = useSelector(getAuthToken);
  const username = useSelector(getUsername);
  const dispatch = useDispatch();

  const checkAdminConfigStatus = () =>
    getAdminConfigurationStatus()
      .then(setIsAdminConfigured);

  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      dispatch(setSessionData({ authToken: token }));
    }

    checkAdminConfigStatus();
  }, [dispatch])

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
  }, [authToken, dispatch, username])

  useEffect(() => {
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
  }, [dispatch]);


  return (
    <App
      isAdminConfigured={!isAdminConfigured}
      onRegister={checkAdminConfigStatus}
    />
  );
};

export default AppContainer;

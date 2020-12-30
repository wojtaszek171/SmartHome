import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './App.scss';
import Header from '../Header';
import Footer from '../Footer';
import Content from '../Content';
import Admin from '../Admin';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { setWeatherData } from '../../reducers/weather';
import { getCurrentUser, getCurrentWeather, getDailyWeather, getHourlyWeather } from '../../restService/restService';
import { setSessionData } from '../../reducers/session';
import { getCookie } from '../../helpers';

const App = ({ authToken, username, setWeatherData, setSessionData }) => {

  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      setSessionData({ authToken: token });
    }
  }, [])

  useEffect(() => {
    const setCurrentUser = async () => {
      setSessionData({...await getCurrentUser(authToken)});
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
  })

  const fetchCurrentWeather = async () => {
    const current = await getCurrentWeather();
    setWeatherData({ current });
  }

  const fetchDailyWeather = async () => {
    const daily = await getDailyWeather();
    setWeatherData({ daily });
  }
  
  const fetchHourlyWeather = async () => {
    const hourly = await getHourlyWeather();
    setWeatherData({ hourly });
  }

  return (
      <div className="App">
        <Router>
          <Header />
            <div className="appMiddle">
              <Switch>
                <Route path="/" exact>
                  <Content />
                </Route>
                <Route path="/admin">
                  <Admin />
                </Route>
              </Switch>
            </div>
          <Footer />
        </Router>
      </div>
  );
}

const mapStateToProps = (state) => {
  const { session: { username, authToken } } = state;
  return {
    username,
    authToken
  }
};

export default connect(
  mapStateToProps,
  {
    setWeatherData,
    setSessionData
  }
)(App)

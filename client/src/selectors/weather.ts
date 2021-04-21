import { ApplicationState } from "src/reducers";

export const getCurrentWeather = (state: ApplicationState) => state.weather.current;

export const getDailyWeather = (state: ApplicationState) => state.weather.daily;

export const getHourlyWeather = (state: ApplicationState) => state.weather.hourly;

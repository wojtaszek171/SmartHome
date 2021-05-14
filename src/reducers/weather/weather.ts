import { ActionCreator, Reducer } from "redux";
import { SetWeatherData, WeatherState } from "./types";

const WEATHER_SET = 'WEATHER_SET';

const defaultState: WeatherState = {
  current: null,
  daily: [],
  hourly: []
}

export const weather: Reducer<WeatherState> = (state = defaultState, action) => {
    switch (action.type) {
      case WEATHER_SET:
        return {
          ...state,
          ...action.payload
        }
      default:
        return state
    }
}

export const setWeatherData: ActionCreator<SetWeatherData> = (data: WeatherState) => ({
  type: WEATHER_SET,
  payload: data
});

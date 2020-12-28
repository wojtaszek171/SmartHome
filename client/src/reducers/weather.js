const WEATHER_SET = 'WEATHER_SET';

const defaultState = {
  current: {},
  daily: [],
  hourly: []
}

export const weather = (state = defaultState, action) => {
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

export const setWeatherData = (data) => ({
  type: WEATHER_SET,
  payload: data
});

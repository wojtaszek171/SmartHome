import { Action } from "redux";

interface CurrentWeather {
    dt: number,
    temp: number,
    feels_like: number,
    humidity: number,
    pressure: number,
    sunrise: number,
    sunset: number,
    icon: string,
    description: string
}

interface DailyWeather {
    [index: number]: {
        dt: number,
        dayOfWeek: number,
        day: number,
        dayTemp: number,
        nightTemp: number,
        pressure: number,
        humidity: number,
        sunrise: number,
        sunset: number,
        icon: string
    }
}

interface HourlyWeather {
    [index: number]: {
        dt: number,
        dayOfWeek: number,
        day: number,
        dayTemp: number,
        nightTemp: number,
        pressure: number,
        humidity: number,
        sunrise: number,
        sunset: number,
        icon: string
    }
}

export interface WeatherState {
    current: CurrentWeather | null,
    daily: DailyWeather,
    hourly: HourlyWeather
}

export interface SetWeatherData extends Action {
    type: string;
    payload: WeatherState;
}

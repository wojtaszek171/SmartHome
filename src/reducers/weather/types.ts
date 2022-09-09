import { Action } from 'redux';

export interface CurrentWeather {
    dt: number;
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    sunrise: number;
    sunset: number;
    icon: string;
    description: string;
}

export interface DailyWeatherItem {
    dt: number;
    dayOfWeek: number;
    day: number;
    dayTemp: number;
    nightTemp: number;
    pressure: number;
    humidity: number;
    sunrise: number;
    sunset: number;
    icon: string;
}

export type DailyWeather = Array<DailyWeatherItem>

export interface HourlyWeatherItem {
    day: number;
    hour: number;
    temp: number;
    icon: string;
}

export type HourlyWeather = Array<HourlyWeatherItem>

export interface WeatherState {
    current: CurrentWeather | null;
    daily: DailyWeather;
    hourly: HourlyWeather;
}

export interface SetWeatherData extends Action {
    type: string;
    payload: WeatherState;
}

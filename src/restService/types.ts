export interface ErrnoException extends Error {
    errno?: number;
    code?: string;
    path?: string;
    syscall?: string;
    stack?: string;
}

export interface WeatherCurrentResponse {
    name: string;
    value: {
        dt: number;
        temp: number;
        feels_like: number;
        humidity: number;
        pressure: number;
        sunrise: number;
        sunset: number;
        weather: {
            id: number;
            icon: string;
            main: string;
            description: string;
        }[]
    },
    createdAt: string;
    updatedAt: string;
}

export interface WeatherDailyItem {
    dt: number;
    pop: number;
    uvi: number;
    rain: number;
    temp: {
       day: number;
       eve: number;
       max: number;
       min: number;
       morn: number;
       night: number;
    },
    clouds: number;
    sunset: number;
    moonset: number;
    sunrise: number;
    weather: {
          id: number;
          icon: string;
          main: string;
          description: string;
    }[],
    humidity: number;
    moonrise: number;
    pressure: number;
    wind_deg: number;
    dew_point: number;
    wind_gust: number;
    feels_like: {
       day: number;
       eve: number;
       morn: number;
       night: number;
    },
    moon_phase: number;
    wind_speed: number;
}

export interface WeatherDailyResponse {
    name: string;
    value: WeatherDailyItem[];
    createdAt: string;
    updatedAt: string;
}

export interface WeatherHourlyItem {
    dt: number;
    day: number;
    hour: number;
    icon: string;
    temp: number;
}

export interface WeatherHourlyResponse {
    name: string;
    value: WeatherHourlyItem[];
    createdAt: string;
    updatedAt: string;
}

export interface GetDailyWeatherItem {
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

export type GetDailyWeatherReponse = GetDailyWeatherItem[]

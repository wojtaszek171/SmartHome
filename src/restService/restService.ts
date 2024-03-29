import { SocketItem } from '../Components/Admin/SocketsSettings/SocketsSettings';
import { ErrnoException, GetDailyWeatherReponse, WeatherCurrentResponse, WeatherDailyItem, WeatherDailyResponse, WeatherHourlyItem, WeatherHourlyResponse } from './types';

const { REACT_APP_API_HOST, REACT_APP_API_PORT, REACT_APP_API_PATH } = window;

const HOST_URL = `${REACT_APP_API_HOST}${REACT_APP_API_PORT?.length ? ':' + REACT_APP_API_PORT : ''}${REACT_APP_API_PATH?.length ? '/' + REACT_APP_API_PATH : ''}`;

const requestStatus = async (response: Response) => {
    if (response.ok) {
        return response.json();
    } else {
        const errorRes = await response.json() as ErrnoException;
        if (errorRes.code) {
            throw errorRes;
        }
        throw new Error(response.statusText);
    }
}

export const configureAdmin = (
    registerAdminObj: {
        firstName: string,
        lastName: string,
        username: string,
        password: string
    }) =>
        fetch(`${HOST_URL}/api/users/configureAdmin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerAdminObj),
        })
            .then(requestStatus)
            .catch(e => {
                throw e;
            })

export const getAdminConfigurationStatus = () =>
    fetch(`${HOST_URL}/api/users/validateConfig`)
        .then(requestStatus)
        .catch(e => {
            throw e;
        });

export const getCurrentUser = (token: string) =>
    fetch(`${HOST_URL}/api/users/current`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(requestStatus)
    .catch(e => {
        throw e;
    });

export const getWeatherLat = () => 
    fetch(`${HOST_URL}/api/settings/weatherLat`)
        .then(requestStatus)
        .catch(e => {
            throw e;
        });

export const getWeatherLon = () => 
    fetch(`${HOST_URL}/api/settings/weatherLon`)
        .then(requestStatus)
        .catch(e => {
            throw e;
        });

export const getSockets = () =>
    fetch(`${HOST_URL}/api/sockets`)
        .then(requestStatus)
        .catch(e => {
            throw e;
        });

export const setSetting = (token: string, settingObject: { name: string, value: any }) => 
    fetch(`${HOST_URL}/api/settings/set`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(settingObject),
    })
        .then(requestStatus)
        .catch(e => {
            throw e;
        })

export const setSocket = (token: string, socketObj: SocketItem) => 
    fetch(`${HOST_URL}/api/sockets/set`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(socketObj),
    })
        .then(requestStatus)
        .catch(e => {
            throw e;
        })

export const getSensorsData = () => 
    fetch(`${HOST_URL}/api/sensors`)
        .then(requestStatus)
        .catch(e => {
            throw e;
        });

export const getCurrentWeather = () => {
    return fetch(`${HOST_URL}/api/weather/current`)
        .then(requestStatus)
        .then((data: WeatherCurrentResponse) => {
            const {
                dt,
                temp,
                feels_like,
                humidity,
                pressure,
                sunrise,
                sunset,
                weather
            } = data.value;

            const { icon, description } = weather[0];

            return{
                dt,
                temp: Math.round(temp),
                feels_like,
                humidity,
                pressure,
                sunrise,
                sunset,
                icon,
                description
            }
        })
        .catch(e => {
            throw e;
        });
}

export const getDailyWeather = () => {
    return fetch(`${HOST_URL}/api/weather/daily`)
        .then(requestStatus)
        .then((data: WeatherDailyResponse) => {
            const allDays = data.value;

            return allDays.reduce((acc: GetDailyWeatherReponse, dayEl: WeatherDailyItem) => {
                const {
                    dt,
                    temp: {
                        day: dayTemp,
                        night: nightTemp
                    },
                    pressure,
                    humidity,
                    weather,
                    sunrise,
                    sunset
                } = dayEl;

                const icon = weather[0].icon;
                const date = new Date(dt*1000);

                if (new Date().getDate() !== date.getDate()) {
                    acc.push({
                        dt,
                        dayOfWeek: date.getDay(),
                        day: date.getDate(),
                        dayTemp: Math.round(dayTemp),
                        nightTemp: Math.round(nightTemp),
                        pressure,
                        humidity,
                        sunrise,
                        sunset,
                        icon
                    });
                }
                return acc;
            }, []);
        })
        .catch(e => {
            console.log(e);
        });
}

export const getHourlyWeather = () => {
    return fetch(`${HOST_URL}/api/weather/hourly`)
        .then(requestStatus)
        .then((data: WeatherHourlyResponse) => {
            const allHours = data.value;

            return allHours.reduce((acc: Partial<WeatherHourlyItem>[], dayEl: WeatherHourlyItem) => {
                const { day, hour, temp, icon } = dayEl;

                acc.push({
                    day,
                    hour,
                    temp: Math.round(temp),
                    icon
                });
                return acc;
            }, []);
        })
        .catch(e => {
            throw e;
        });
}

export const authenticateAdmin = (username: string, password: string) => {
    return fetch(`${HOST_URL}/api/users/authenticate`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password
            }),
        })
        .then(requestStatus)
        .catch(e => {
            throw e;
        });
}

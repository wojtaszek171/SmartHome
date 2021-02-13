const HOST_URL = 'https://pwojtaszko.ddns.net';

export const getCurrentUser = (token: string) => 
    fetch(`${HOST_URL}/api/users/current`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => data)
    .catch(e => {
        throw e;
    });

export const getWeatherLat = () => 
    fetch(`${HOST_URL}/api/settings/weatherLat`)
        .then(response => response.json())
        .then(data => data)
        .catch(e => {
            throw e;
        });

export const getWeatherLon = () => 
    fetch(`${HOST_URL}/api/settings/weatherLon`)
        .then(response => response.json())
        .then(data => data)
        .catch(e => {
            throw e;
        });

export const getSensorsData = () => 
    fetch(`${HOST_URL}/api/sensors`)
        .then(response => response.json())
        .then(data => data)
        .catch(e => {
            throw e;
        });

export const getWaterTemp = () => 
    fetch(`${HOST_URL}/api/sensors/waterTemp`)
        .then(response => response.json())
        .then(data => data.value.toFixed(1))
        .catch(e => {
            throw e;
        });

export const getRoomTemp = (): Promise<number> => 
    fetch(`${HOST_URL}/api/sensors/roomTemp`)
        .then(response => response.json())
        .then(data => Math.round((data.value + Number.EPSILON) * 10) / 10)
        .catch(e => {
            throw e;
        });

export const getRoomHumidity = (): Promise<number> => 
    fetch(`${HOST_URL}/api/sensors/roomHumidity`)
        .then(response => response.json())
        .then(data => Math.round((data.value + Number.EPSILON) * 10) / 10)
        .catch(e => {
            throw e;
        });

export const getRoomPressure = (): Promise<number> => 
    fetch(`${HOST_URL}/api/sensors/pressure`)
        .then(response => response.json())
        .then(data => Math.round((data.value + Number.EPSILON) * 10) / 10)
        .catch(e => {
            throw e;
        });

export const getCurrentWeather = () => {
    return fetch(`${HOST_URL}/api/weather/current`)
        .then(response => response.json())
        .then(data => {
            const { dt, temp, feels_like, humidity, pressure, sunrise, sunset, weather } = JSON.parse(data.value);
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
        .then(response => response.json())
        .then(data => {
            const allDays = JSON.parse(data.value);

            return allDays.reduce((acc: any, dayEl: any) => {
                const { dt, temp: { day: dayTemp, night: nightTemp }, pressure, humidity, weather, sunrise, sunset } = dayEl;
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
        .then(response => response.json())
        .then(data => {
            const allHours = JSON.parse(data.value);

            return allHours.reduce((acc: any, dayEl: any) => {
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
        }).then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(e => {
            throw e;
        });
}

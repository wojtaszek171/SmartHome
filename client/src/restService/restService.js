const HOST_URL = 'https://pwojtaszko.ddns.net';

export const getSensorsData = () => 
    fetch(`${HOST_URL}/api/sensors`)
        .then(response => response.json())
        .then(data => data)
        .catch(e => {
            console.log(e);
        });

export const getWaterTemp = () => 
    fetch(`${HOST_URL}/api/sensors/waterTemp`)
        .then(response => response.json())
        .then(data => data.value.toFixed(1))
        .catch(e => {
            console.log(e);
        });

export const getRoomTemp = () => 
    fetch(`${HOST_URL}/api/sensors/roomTemp`)
        .then(response => response.json())
        .then(data => data.value.toFixed(1))
        .catch(e => {
            console.log(e);
        });

export const getCurrentWeather = () => {
    return fetch(`${HOST_URL}/api/weather/current`)
        .then(response => response.json())
        .then(data => {
            const { temp, feels_like, humidity, pressure, sunrise, sunset, weather } = JSON.parse(data.value);
            const { icon, description } = weather[0];

            return{
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
            console.log(e);
        });
}

export const getDailyWeather = () => {
    return fetch(`${HOST_URL}/api/weather/daily`)
        .then(response => response.json())
        .then(data => {
            const allDays = JSON.parse(data.value);

            return allDays.reduce((acc, dayEl) => {
                const { dt, temp: { day: dayTemp, night: nightTemp }, pressure, humidity, weather, sunrise, sunset } = dayEl;
                const icon = weather[0].icon;
                const date = new Date(dt*1000);

                if (new Date().getDate() !== date.getDate()) {
                    acc.push({
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

            return allHours.reduce((acc, dayEl) => {
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
            console.log(e);
        });
}

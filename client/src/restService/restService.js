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
        .then(data => data)
        .catch(e => {
            console.log(e);
        });

export const getRoomTemp = () => 
    fetch(`${HOST_URL}/api/sensors/roomTemp`)
        .then(response => response.json())
        .then(data => data)
        .catch(e => {
            console.log(e);
        });

export const getCurrentWeather = () => {
    return fetch(`${HOST_URL}/api/weather/current`)
        .then(response => response.json())
        .then(data => {
            const { temp, feels_like, humidity, pressure, sunrise, sunset, weather } = JSON.parse(data.value);
            const { icon } = weather[0];

            return{
                temp: Math.round(temp),
                feels_like,
                humidity,
                pressure,
                sunrise,
                sunset,
                icon
            }
        })
        .catch(e => {
            console.log(e);
        });
}
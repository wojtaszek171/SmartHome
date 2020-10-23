const HOST_URL = 'https://pwojtaszko.ddns.net';

export const getSensorsData = () => 
    fetch(`${HOST_URL}/api/sensors`)
        .then(response => response.json())
        .then(data => data);

export const getWaterTemp = () => 
    fetch(`${HOST_URL}/api/sensors/Water`)
        .then(response => response.json())
        .then(data => data);

export const getRoomTemp = () => 
    fetch(`${HOST_URL}/api/sensors/Room`)
        .then(response => response.json())
        .then(data => data);
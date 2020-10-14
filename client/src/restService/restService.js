const HOST_URL = 'https://pwojtaszko.ddns.net';

export const getSensorsData = () => 
    fetch(`${HOST_URL}/api/sensors`)
        .then(response => response.json())
        .then(data => data);

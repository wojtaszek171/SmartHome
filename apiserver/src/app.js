var indexRouter = require('./routes/index');
const config = require('./config.json');
const fetch = require("node-fetch");

require('rootpath')();

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_middleware/error-handler');
const weatherService = require('./routes/weather/weather.service');
const sensorService = require('./routes/sensors/sensor.service');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes
app.use('/', indexRouter);
app.use('/users', require('./routes/users/users.controller'));
app.use('/sensors', require('./routes/sensors/sensors.controller'));
app.use('/sockets', require('./routes/sockets/sockets.controller'));
app.use('/weather', require('./routes/weather/weather.controller'));

// openweathermap reading
const readWeather = async () => {
    // TODO add reading location from database
    const lat = 52.229676;
    const lon = 21.012229;
    try {
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${config.weather_api}&units=metric&lang=pl`)
            .then(response => response.json())
            .then(data => {
                const { current, daily } = data;
                weatherService.set({
                    name: 'current',
                    value: current
                });
                weatherService.set({
                    name: 'daily',
                    value: daily
                });
            });


        let savedHours = [];
        const storeAfter = new Date();
        storeAfter.setDate(storeAfter.getDate()-1);
        const storeAfterTimestamp = storeAfter.getTime();

        const hourlyRes = await weatherService.getByName('hourly');
        if (hourlyRes.value) {
            savedHours = JSON.parse(hourlyRes.value).filter((hour => hour.dt*1000 > storeAfterTimestamp))
        }

        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${config.weather_api}&units=metric&lang=pl`)
            .then(response => response.json())
            .then(data => {
                data.list.forEach((hour) => {
                    const { dt, main: { temp }, weather } = hour;
                    const date = new Date(dt * 1000);
                    const icon = weather[0].icon;
                    const hourToSave = {
                        dt,
                        day: date.getDate(),
                        hour: date.getHours(),
                        temp,
                        icon
                    };
                    const dateIndex = savedHours.findIndex((savedHour) => savedHour.dt === hourToSave.dt);
                    if (dateIndex !== -1) {
                        savedHours[dateIndex] = hourToSave;
                    } else {
                        savedHours.push(hourToSave);
                    }
                })
                weatherService.set({
                    name: 'hourly',
                    value: savedHours
                });
            })
            .catch(err => {
                throw err;
            });
    } catch (e) {
        console.log(e);
    }
}

const readSensors = () => {
    const { spawn } = require("child_process");

    let process = spawn('python3', ["../pythonApp/sensors.py"] );

    process.stdout.on('data', function (data) {
        const sensors = JSON.parse(data.toString());

        sensors.forEach(sensor => {
            const { name, value } = sensor;
            sensorService.set({
                name,
                value
            });
        });
    });
}

const startStream = () => {
    const { exec } = require("child_process");

    exec('sudo raspivid --nopreview -o - -t 0 -w 960 -h 720 -fps 25 -b 4000000 -g 50  | ffmpeg -re -f h264 -i - -vcodec copy -g 50 -strict experimental -f flv -metadata streamName=myStream rtmp://pwojtaszko.ddns.net/show/stream', (err, stdout, stderr) => {
        if (err) {
            console.error(err)
        }
    });
}


setInterval(() => {
    readSensors();
}, 5000);

setTimeout(() => {
    readWeather();
}, 5000)
setInterval(() => {
    readWeather();
}, 900000);

// startStream();

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 8393;
app.listen(port, () => console.log('Server listening on port ' + port));
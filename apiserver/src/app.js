var indexRouter = require('./routes/index');
const config = require('./config.json');
const fetch = require("node-fetch");
const cookieParser = require("cookie-parser");

require('rootpath')();

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_middleware/error-handler');
const weatherService = require('./routes/weather/weather.service');
const settingsService = require('./routes/settings/settings.service');
const userService = require('./routes/users/user.service');
const prompt = require('prompt');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes
app.use(cookieParser());
app.use('/', indexRouter);
app.use('/users', require('./routes/users/users.controller'));
app.use('/sensors', require('./routes/sensors/sensors.controller'));
app.use('/sockets', require('./routes/sockets/sockets.controller'));
app.use('/weather', require('./routes/weather/weather.controller'));
app.use('/settings', require('./routes/settings/settings.controller'));

const validateAdmin = async () => {
    const usersArray = await userService.getAll();

    if (!usersArray.length) {
        const registerProps = [
            {
                name: 'firstName'
            },
            {
                name: 'lastName'
            },
            {
                name: 'username',
            },
            {
                name: 'password',
                hidden: true
            }
        ];

        prompt.start();
    
        prompt.get(registerProps, function (err, result) {
            if (err) { return onErr(err); }
            userService.create({
                firstName: result.firstName,
                lastName: result.lastName,
                username: result.username,
                password: result.password
            });
        });
    
        function onErr(err) {
            console.log(err);
            return 1;
        }
    }    
}

// openweathermap reading
const readWeather = async () => {
    let lat;
    let lon;

    try {
        const latRes = await settingsService.getByName('weatherLat');
        const lonRes = await settingsService.getByName('weatherLon');

        lat = latRes.value;
        lon = lonRes.value;
    } catch (e) {
        lat = '52.229676';
        lon = '21.012229';

        settingsService.set({
            name: 'weatherLat',
            value: lat
        })

        settingsService.set({
            name: 'weatherLon',
            value: lon
        })
    }

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

        let hourlyRes = null;

        try {
            hourlyRes = await weatherService.getByName('hourly');
            if (hourlyRes.value) {
                savedHours = JSON.parse(hourlyRes.value).filter((hour => hour.dt*1000 > storeAfterTimestamp))
            }
        } catch (e) {
            console.log('No hourly weather');
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

const startStream = () => {
    const { exec } = require("child_process");

    exec('sudo raspivid --nopreview -o - -t 0 -w 960 -h 720 -fps 25 -b 4000000 -g 50  | ffmpeg -re -f h264 -i - -vcodec copy -g 50 -strict experimental -f flv -metadata streamName=myStream rtmp://pwojtaszko.ddns.net/show/stream', (err, stdout, stderr) => {
        if (err) {
            console.error(err)
        }
    });
}

const main = () => {
    validateAdmin();

    readWeather();
    setInterval(() => {
        readWeather();
    }, 900000);
}

setTimeout(main, 1000);

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 8393;
app.listen(port, () => console.log('Server listening on port ' + port));
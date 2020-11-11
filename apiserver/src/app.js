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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes
app.use('/', indexRouter);
app.use('/users', require('./routes/users/users.controller'));
app.use('/sensors', require('./routes/sensors/sensors.controller'));
app.use('/weather', require('./routes/weather/weather.controller'));

// openweathermap reading
const readWeather = () => {
    // TODO add reading location from database
    const lat = 52.229676;
    const lon = 21.012229;
    try {
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${config.weather_api}&units=metric&lang=pl`)
            .then(response => response.json())
            .then(data => {
                const { current, hourly, daily } = data;
                weatherService.set({
                    name: 'current',
                    value: current
                });
                weatherService.set({
                    name: 'hourly',
                    value: hourly
                });
                weatherService.set({
                    name: 'daily',
                    value: daily
                });
            });
    } catch (e) {
        console.log(e);
    }
}

readWeather();
setInterval(() => {
    readWeather();
}, 900000);

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 8393;
app.listen(port, () => console.log('Server listening on port ' + port));
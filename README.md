# SmartHome
Smart home panel project.

## This project is working with
- https://github.com/wojtaszek171/personalApi
- https://github.com/wojtaszek171/MicrocontrollerHome
- https://github.com/wojtaszek171/pwojtaszko-design

## Used technologies:
- React.js
- TypeScript
- Redux

## Backend:
- fetching opeanweathermap weather, saving to MySQL and broadcasting it using my API
- saving values from sensors attached to ESP8266 NodeMCU to database using PHP api and broadcasting it using API
- switching power sockets using ESP8266 NodeMCU, start and stop times are fetched from DB using API
- python scripts for reading sensors values
- auto recreated MySQL structure (if any element missing)
- api server (with authentication using authTokens)

## UX:
- room sensors values (temperature, humidity, pressure)
- outside sernor value (temperature)
- widget with weather for whole week
- modal with hourly weather
- widget with sockets current status
- changing weather location (admin)
- changing socket switch times (admin)

Demo - https://pwojtaszko.ddns.net/

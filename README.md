# SmartHome
Smart home panel project. Prepared to be deployed on Apache server with nginx server for streaming device camera video, api server set on NodeJS and MySQL database. All to be set on RaspberryPi 4b.

Used technologies:
- React.js
- NodeJS
- Python
- RaspberryPi (electronics)
- C++ (Arduino IDE)

Backend:
- saving weather to MySQL and broadcasting it using API (saved using NodeJS server)
- saving values from sensors attached to ESP8266 NodeMCU to database using PHP api and broadcasting it using API
- switching power sockets using ESP8266 NodeMCU, start and stop times are fetched from DB using API
- python scripts for reading sensors values
- auto recreated MySQL structure (if any element missing)
- api server (with authentication using authTokens)

UX:
- displaying room sensors values (temperature, humidity, pressure)
- displaying aquarium sernors values (temperature)
- displaying raspberry camera streamed video
- displaying weather with 5 days forecast
- admin panel for changing weather location
- admin panel for changing socket switch times

Demo - https://pwojtaszko.ddns.net/

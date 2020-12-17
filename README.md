# SmartHome
Smart home panel project. Prepared to be deployed on Apache server with nginx server for streaming device camera video, api server set on NodeJS and MySQL database. All to be set on RaspberryPi 4b.

Used technologies:
- React.js
- NodeJS
- Python
- RaspberryPi (electronics)

Backend:
- saving weather to MySQL and broadcasting it using API (saved using NodeJS server)
- saving values from sensors attached to RaspberryPi to database and broadcasting it using API
- python scripts for reading sensors values
- auto recreated MySQL structure (if any element missing)
- api server (with authentication using authTokens)

UX:
- displaying room sensors values (temperature, humidity, pressure)
- displaying aquarium sernors values (temperature)
- displaying raspberry camera streamed video
- displaying weather with 5 days forecast

Demo - https://pwojtaszko.ddns.net/

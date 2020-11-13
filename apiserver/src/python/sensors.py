import sys
import mysql.connector
import datetime
import time
import smbus2
import bme280
import json

def updateSensorValues():
    sensorsResponse = []

    # '1-wire' sensor reading
    sensorId = "28-01193a653db9"
    tempfile = open("/sys/bus/w1/devices/{0}/w1_slave".format(sensorId))
    temptext = tempfile.read()
    tempfile.close()
    tempcelsius = temptext.split("\n")[1].split(" ")[9]
    temperature = float(tempcelsius[2:])
    temperature = temperature / 1000

    sensorsResponse.append({ "name": "waterTemp", "value": temperature})

    # BME280 sensor reading
    port = 1
    address = 0x76
    bus = smbus2.SMBus(port)
    calibration_params = bme280.load_calibration_params(bus, address)
    data = bme280.sample(bus, address, calibration_params)

    sensorsResponse.append({ "name": "roomTemp", "value": data.temperature})

    sensorsResponse.append({ "name": "pressure", "value": data.pressure})

    sensorsResponse.append({ "name": "roomHumidity", "value": data.humidity})

    # values return
    return json.dumps(sensorsResponse)

print(updateSensorValues())

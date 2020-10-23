import sys
import mysql.connector
import datetime
import time


def updateSensorValues(passwd, database):
    sensorIds = ["28-01193a653db9","28-3c01b556d54a"]
    sensorNames = ["water","room"]

    mydb = mysql.connector.connect(host = "localhost", user = "root", passwd = passwd, database = database)

    for i in range(len(sensorIds)):
        sensorId = sensorIds[i]
        sensorName = sensorNames[i]
        tempfile = open("/sys/bus/w1/devices/{0}/w1_slave".format(sensorId))
        temptext = tempfile.read()
        tempfile.close()
        tempcelsius = temptext.split("\n")[1].split(" ")[9]
        temperature = float(tempcelsius[2:])
        temperature = temperature / 1000
        cursor = mydb.cursor()
        print(temperature)
        cursor.execute("INSERT INTO `Sensors` (`name`, `value`, `updatedAt`, `createdAt`, `id`) VALUES (%s, %s, %s, %s, %s) ON DUPLICATE KEY UPDATE value=%s, updatedAt=%s",(sensorName, temperature, datetime.datetime.now(), datetime.datetime.now(), sensorId, temperature, datetime.datetime.now()))
        time.sleep(1)

    mydb.commit()
    mydb.close()

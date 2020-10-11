import mysql.connector
from sensors import updateSensorValues
from getpass import getpass
from stream import startStream
import threading
import time

passwd = getpass()

def main():
    startStream()
    threading.Thread(sensorsReading()).start()

def sensorsReading():
    while 1:
        database = "home"
        updateSensorValues(passwd, database)
        time.sleep(5)

main()
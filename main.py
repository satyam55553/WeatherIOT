import serial
import pyrebase
import time
import datetime

from serial import Serial


config = {
    "apiKey": "",
    "authDomain": "",
    "databaseURL": "",
    "storageBucket": "",
    #   "serviceAccount": "path/to/serviceAccountCredentials.json"
}

firebase = pyrebase.initialize_app(config)
db = firebase.database()

ser=serial.Serial('COM2',9600) #connect to COM2 port with baud rate=9600

for x in range(5):
    
    data=ser.readline() #read a line from serial terminal
    
    # timestamp = str(time.time())
    date = str(datetime.datetime.fromtimestamp(time.time()).strftime('%Y-%m-%d'))
    timeVal= str(datetime.datetime.fromtimestamp(time.time()).strftime('%H:%M'))
    print(date," ",timeVal)

    sensorString=data.decode() #H32.00T27.00
    print(sensorString)
    if sensorString[0]=='H':
        readingHumidity=sensorString[1:6]
        readingTemp=sensorString[7:12]
        print("H= ",readingHumidity," T= ",readingTemp)


    sensorData = {"date":date , "reading": readingHumidity, "time": timeVal}
    db.child("Humidity_data").push(sensorData)

    sensorData = {"date":date , "reading": readingTemp, "time": timeVal}
    db.child("Temperature_data").push(sensorData)




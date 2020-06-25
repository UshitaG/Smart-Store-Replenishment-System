import RPi.GPIO as GPIO
import time
import sys
from hx711 import HX711
from pymongo import MongoClient

client = MongoClient(
    "mongodb+srv://ushita:ushita26@cluster0-s5zz8.mongodb.net/test?retryWrites=true&w=majority")
db = client.test
collection = db.items

def cleanAndExit():
    print "Cleaning..."
    GPIO.cleanup()
    print "Bye!"
    sys.exit()

#Set GPIO pins to 5 and 6 for input weight.
hx = HX711(5,6)


hx.set_reading_format("LSB", "MSB")



hx.set_reference_unit(412)

hx.reset()
hx.tare()

while True:
    try:
       

        list=[]
        val = hx.get_weight(60) #Gets weight every 1 minute
        list.append(val)
        if len(list)==5:
            avg=sum(list/len(list))
	    result = collection.update_one({"machine_no": 1}, {"$set": {"current_weight": avg}})
            print(result)
            list.clear();
        
        hx.power_down()
	
        hx.power_up()
        time.sleep(60)
    except (KeyboardInterrupt, SystemExit):
        cleanAndExit()

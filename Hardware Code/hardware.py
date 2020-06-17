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






# I've found out that, for some reason, the order of the bytes is not always the same between versions of python, numpy and the hx711 itself.
# If you're experiencing super random values, change these values to MSB or LSB until to get more stable values.
# There is some code below to debug and log the order of the bits and the bytes.
# The first parameter is the order in which the bytes are used to build the "long" value.
# The second paramter is the order of the bits inside each byte.

hx.set_reading_format("LSB", "MSB")

# HOW TO CALCULATE THE REFFERENCE UNIT
# To set the reference unit to 1. Put 1kg on your sensor or anything you have and know exactly how much it weights.
# If 2000 grams is 184000 then 1000 grams is 184000 / 2000 = 92.

hx.set_reference_unit(412)

hx.reset()
hx.tare()

while True:
    try:
        # These three lines are usefull to debug whether to use MSB or LSB in the reading formats
        # for the first parameter of "hx.set_reading_format("LSB", "MSB")".
        # Comment the two lines "val = hx.get_weight(180)" and "print val" and uncomment the three lines to see what it prints.
        #np_arr8_string = hx.get_np_arr8_string()
        #binary_string = hx.get_binary_string()
        #print binary_string + " " + np_arr8_string
     

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

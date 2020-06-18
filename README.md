# Smart-Store-Replenishment
Built a hardware that continuously tracks inventories of items in a store, by measuring their real time weight and places a new order when the inventory level reaches below the point, when stock needs to be replenished.

Technologies Used- NodeJs, React, MongoDB

Hardware Used- Raspberry Pi, Load Cell , Hx711 Load Cell Amplifier

The folders:

Frontend: Built using React, the webpage that would be visible to a store manager. Can view and edit details of all items and employees in the store, and also check which shelves need replenishment, and the current stock of each item in store.

Backend: The server built on Node.js, which interacts with the Atlas database and fetches the details and also sends replenishment emails to respective employees when stock of item falls below threshold.

Hardware Code: Consists of the python files which is put on the Raspberry Pi. This updates current weight of shelf the Raspberry Pi is attached to. hx711.py is an open-source file that consists of functions which configure the GPIO pins of the hardware and fetch the weight, while run hardware.py to get the machine started, and use the functions of hx711.py and perform operations to get weight, update weight to Atlas database and other operations as required.

Software Fix: The django server which on button clicks generates random weights, below and above threshold (to trigger replenishment emails and restocking for the items). This is the software fix built since we did not have our hardware with us during the second round due to the unfortunate lockdown.

To run the project run all the three Backend, Frontend and Hardware code.
Since currently the hardware is connected, run the Software Fix.
Follow the instructions in the respective README to run the complete project.

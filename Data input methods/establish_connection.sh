#!/bin/sh

#  establish_connection.sh
#  
#
#  Created by Asheesh k agarwal on 16/12/17.
#  
node Temperature\ sensor/establish_connection_temperature.js "HostName=Ignitedevices.azure-devices.net;DeviceId=temperaturesensor;SharedAccessKey=YXGs3doK4s1lyuwfk8F912bCJrqaUPkQX6RSMdtm/kA=" & node Vibration\ sensor/establish_connection_vibration.js "HostName=Ignitedevices.azure-devices.net;DeviceId=vibrationsensor;SharedAccessKey=JTHvEav/XjmRh/qkK6oMspKx0UX+1OUBkbgSfRAkK48=" & node Electricity\ current\ sensor/establish_connection_current.js "HostName=Ignitedevices.azure-devices.net;DeviceId=currentsensor;SharedAccessKey=JUk5DSRHZjH+ukX2eFmgw+qJGx0EA9vg1kdtB458oF8="

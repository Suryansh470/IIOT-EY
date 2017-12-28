'use strict';

var Protocol = require('azure-iot-device-mqtt').Mqtt;
// var Protocol = require('azure-iot-device-http').Http;
// var Protocol = require('azure-iot-device-amqp').Amqp;
var Client = require('azure-iot-device').Client;
var Message = require('azure-iot-device').Message;

var connectionString = process.argv[2];

var client = Client.fromConnectionString(connectionString, Protocol);

var connectCallback = function (err) {
    if (err) {
        console.error('Could not connect: ' + err.message);
    } else {
        console.log('Client connected');
        client.on('message', function (msg) {
                  console.log('Id: ' + msg.messageId + ' Body: ' + msg.data);
                  // When using MQTT the following line is a no-op.
                  client.complete(msg, printResultFor('completed'));
                  });
        
        // Create a message and send it to the IoT Hub every two second
        var sendInterval = setInterval(function () {
                                       //fake data is input here 
                                       var temperature = 50 + ((Math.random() * 30)-15); // range: [35, 65]
                                       var data = JSON.stringify({ deviceId: 'temperatureSensor', temperature: temperature });
                                       var message = new Message(data);
                                       message.properties.add('temperatureAlertUCL', (temperature > 55) ? 'true' : 'false');
                                       message.properties.add('temperatureAlertLCL', (temperature < 45) ? 'true' : 'false');
                                       console.log('Sending message: ' + message.getData());
                                       client.sendEvent(message, printResultFor('send'));
                                       }, 2000);
        
        client.on('error', function (err) {
                  console.error(err.message);
                  });
        
        client.on('disconnect', function () {
                  clearInterval(sendInterval);
                  client.removeAllListeners();
                  client.open(connectCallback);
                  });
    }
};

client.open(connectCallback);

// Helper function to print results in the console
function printResultFor(op) {
    return function printResult(err, res) {
        if (err) console.log(op + ' error: ' + err.toString());
        if (res) console.log(op + ' status: ' + res.constructor.name);
    };
}

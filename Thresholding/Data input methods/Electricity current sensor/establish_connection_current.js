'use strict';

var Protocol = require('azure-iot-device-mqtt').Mqtt;
// Uncomment one of these transports and then change it in fromConnectionString to test other transports
// var Protocol = require('azure-iot-device-http').Http;
// var Protocol = require('azure-iot-device-amqp').Amqp;
var Client = require('azure-iot-device').Client;
var Message = require('azure-iot-device').Message;

var connectionString = process.argv[2];

// fromConnectionString must specify a transport constructor, coming from any transport package.
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
                  // The AMQP and HTTP transports also have the notion of completing, rejecting or abandoning the message.
                  // When completing a message, the service that sent the C2D message is notified that the message has been processed.
                  // When rejecting a message, the service that sent the C2D message is notified that the message won't be processed by the device. the method to use is client.reject(msg, callback).
                  // When abandoning the message, IoT Hub will immediately try to resend it. The method to use is client.abandon(msg, callback).
                  // MQTT is simpler: it accepts the message by default, and doesn't support rejecting or abandoning a message.
                  });
        
        // Create a message and send it to the IoT Hub every second
        var sendInterval = setInterval(function () {
                                       //fake data is input here
                                       // Considering the required current range between [22, 38]
                                       var current = 30 + ((Math.random() * 16)-8); // range: [22, 38]
                                       var data = JSON.stringify({ deviceId: 'currentSensor', current: current });
                                       var message = new Message(data);
                                       message.properties.add('currentAlertUCL', (current > 33) ? 'true' : 'false');
                                       message.properties.add('currentAlertLCL', (current < 27) ? 'true' : 'false');
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



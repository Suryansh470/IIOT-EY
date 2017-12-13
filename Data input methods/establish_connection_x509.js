'use strict';

var fs = require('fs');
var Protocol = require('azure-iot-device-mqtt').Mqtt;
// Uncomment one of these transports and then change it in fromConnectionString to test other transports
// var Protocol = require('azure-iot-device-http').Http;
// var Protocol = require('azure-iot-device-amqp').Amqp;
var Client = require('azure-iot-device').Client;
var Message = require('azure-iot-device').Message;

// String containing Hostname and Device Id in the following format:
//  "HostName=<iothub_host_name>;DeviceId=<device_id>;x509=true"
var connectionString = '<DEVICE CONNECTION STRING WITH x509=true>';
var certFile = '<PATH-TO-CERTIFICATE-FILE>';
var keyFile = '<PATH-TO-KEY-FILE>';
var passphrase = '<KEY PASSPHRASE IF ANY>';

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
                                       //fake data with variables is input here by removing windspeed, temperature, and humidity
                                       var windSpeed = 10 + (Math.random() * 4); // range: [10, 14]
                                       var temperature = 20 + (Math.random() * 10); // range: [20, 30]
                                       var humidity = 60 + (Math.random() * 20); // range: [60, 80]
                                       var data = JSON.stringify({ deviceId: 'myFirstDevice', windSpeed: windSpeed, temperature: temperature, humidity: humidity });
                                       var message = new Message(data);
                                       message.properties.add('temperatureAlert', (temperature > 28) ? 'true' : 'false');
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

var options = {
    cert : fs.readFileSync(certFile, 'utf-8').toString(),
    key : fs.readFileSync(keyFile, 'utf-8').toString(),
passphrase: passphrase
};

// Calling setOptions with the x509 certificate and key (and optionally, passphrase) will configure the client transport to use x509 when connecting to IoT Hub
client.setOptions(options);
client.open(connectCallback);

// Helper function to print results in the console
function printResultFor(op) {
    return function printResult(err, res) {
        if (err) console.log(op + ' error: ' + err.toString());
        if (res) console.log(op + ' status: ' + res.constructor.name);
    };
}


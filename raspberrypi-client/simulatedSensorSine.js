/*
 * IoT Hub Raspberry Pi NodeJS - Microsoft Sample Code - Copyright (c) 2017 - Licensed MIT
 */
'use strict';

var fs = require("fs");
var t;
var f = 0.1;

fs.open('time.txt','w+',function(err,fd){
        if (err){
        return console.error(err);
        }
        console.log("File opened successfully");
        
        fs.readFile('time.txt',function(err,data){
                    if (err){
                    return console.error(err);
                    }
                    console.log("read successfully");
                    console.log(data.toString());
                    t = parseInt(data.toString());
                    t += 2;
                    console.log(data.toString());
                    fs.writeFile('time.txt',t, function(err){
                                 if(err){
                                 return console.error(err);
                                 }
                                 
                                 fs.close(fd,function(err){
                                          if (err){
                                          return console.error(err);
                                          }
                                          });
                                 });
                    });
        });

function Sensor(/* options */) {
    // nothing todo
}

Sensor.prototype.init = function (callback) {
    // nothing todo
    callback();
}

Sensor.prototype.read = function (callback) {
    callback(null, {
             temperature: random(45, 55),
             vibration: Math.floor(10 * Math.sin(2 * Math.PI * f * t)),
             current: random(27,33)
             });
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}

module.exports = Sensor;


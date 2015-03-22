var config = require('./config');
var m2m = require('m2m-ota-javascript');
var Listener = require('./lib/listener');

var listener = new Listener(config.port,config.host,function(message){
    console.log(message.timestamp.toString() + ' - received ACK...     ' + message.sequenceNumber);
    listener.client.close();
});

var message = new m2m.Message({messageType: m2m.Common.MOBILE_ORIGINATED_EVENT,sequenceNumber: 1});
message.pushString(0,config.imei);
message.pushByte(10,10);
//message.pushInt(20,20);
message.pushFloat(30,30.0);
message.pushByteArray(40,new Buffer([1,2,3]));
//message.pushIntArray(50,[1,2,3]);
//message.pushFloatArray(60,[1.0,2.0,3.0]);

console.log(message.timestamp.toString() + ' - sending message...');
listener.send(message);

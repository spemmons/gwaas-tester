var config = require('./config');
var m2m = require('m2m-ota-javascript');
var Listener = require('./lib/listener');

var listener = new Listener(config.port,config.host,function(message){
    listener.log('received ACK...     ' + message.sequenceNumber,message.timestamp);
    listener.client.close();
});

var message = new m2m.Message({messageType: m2m.Common.MOBILE_ORIGINATED_EVENT,sequenceNumber: 1});
message.pushString(0,config.imei);
message.pushByte(10,10);
message.pushUByte(15,15);
message.pushInt(20,20);
message.pushUInt(25,25);
message.pushFloat(30,30.0);
//message.pushDouble(35,35.0);
message.pushTimestamp(40,message.timestamp);
message.pushByteArray(50,new Buffer([1,2,3]));
message.pushUByteArray(50,new Buffer([1,2,3]));
message.pushIntArray(60,[1,-2,3]);
message.pushUIntArray(65,[1,2,3]);
message.pushFloatArray(70,[1.0,2.0,3.0]);
//message.pushDoubleArray(75,[1.0,2.0,3.0]);

listener.log('sending message...' + message.sequenceNumber);
listener.send(message);

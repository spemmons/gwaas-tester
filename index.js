var config = require('./config');
var m2m = require('m2m-ota-javascript');
var Listener = require('./lib/listener');

var CLOSING_DELAY = 2;

var heartbeat = new m2m.Message({messageType: m2m.Common.MOBILE_ORIGINATED_EVENT,sequenceNumber: 1}).pushString(0,config.imei);

var listener = new Listener(config.port,config.host,function(message){
    console.log(message.timestamp.toString() + ' - received ACK...     ' + message.sequenceNumber);
    if ((heartbeat.sequenceNumber += 1) < 5)
        sendHeartbeat();
    else {
        console.log((new Date()).valueOf().toString() + ' - closing in ' + CLOSING_DELAY + '...');
        setTimeout(function() { listener.client.close(); },CLOSING_DELAY * 1000);
    }
});

function sendHeartbeat(){
    heartbeat.timestamp = (new Date()).valueOf();
    console.log(heartbeat.timestamp.toString() + ' - sending heartbeat...' + heartbeat.sequenceNumber);
    listener.send(heartbeat);
}

sendHeartbeat();

var config = require('./config');
var m2m = require('m2m-ota-javascript');
var Listener = require('./lib/listener');

var CLOSING_DELAY = 2;

var heartbeat = new m2m.Message({messageType: m2m.Common.MOBILE_ORIGINATED_EVENT,sequenceNumber: 1}).pushString(0,config.imei);

var listener = new Listener(config.port,config.host,function(message){
    listener.log(message.timestamp.toString() + ' - received ACK...     ' + message.sequenceNumber,message.timestamp);
    if ((heartbeat.sequenceNumber += 1) < 5)
        sendHeartbeat();
    else {
        listener.log('closing in ' + CLOSING_DELAY + '...');
        setTimeout(function() { listener.client.close(); },CLOSING_DELAY * 1000);
    }
});

function sendHeartbeat(){
    heartbeat.timestamp = (new Date()).valueOf();
    listener.log('sending heartbeat...' + heartbeat.sequenceNumber,heartbeat.timestamp);
    listener.send(heartbeat);
}

sendHeartbeat();

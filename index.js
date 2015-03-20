var config = require('./config');
var m2m = require('m2m-ota-javascript');
var Listener = require('./lib/listener');

var heartbeat = new m2m.Message({messageType: m2m.Common.MOBILE_ORIGINATED_EVENT}).pushString(0,config.imei);

var listener = new Listener(config.port,config.host,function(message){
    if ((heartbeat.sequenceNumber += 1) < 5)
        sendHeartbeat();
    else
        listener.client.close();
});

function sendHeartbeat(){
    console.log('sending heartbeat...' + heartbeat.sequenceNumber + ': ' + heartbeat.toWire());
    listener.send(heartbeat);
    console.log('done')
}

sendHeartbeat();


var _ = require('lodash');
var dgram = require('dgram');
var m2m = require('m2m-ota-javascript');

var lastTimestamp = null;

function Listener(port,host,onmessage){

    this.port = port;
    this.host = host;
    this.client = dgram.createSocket('udp4');

    this.client.on('close',function () {
        log('connection closed');
    });

    this.client.on('error',function (err) {
        log('error=' + err);
    });

    this.client.on('message',function (buffer,info) {
        try {

            log('incoming - size: ' + buffer.length + ' from: ' + info.address + ':' + info.port);
            var message = new m2m.Message({buffer: buffer});
            onmessage(message);
        } catch(e) {
            log('on message failure= ' + e);
        }
    });

}

Listener.prototype.send = function(message){
    var buffer = message.toWire();
    log('outgoing - size: ' + buffer.length + ' from: ' + this.host + ':' + this.port);
    this.client.send(buffer,0,buffer.length,this.port,this.host);
};

function log(string,givenTimestamp) {
    var timestamp = givenTimestamp ? givenTimestamp : (new Date()).valueOf();
    var delta = lastTimestamp === null ? '   ' : (timestamp - lastTimestamp).toString();
    console.log(timestamp.toString() + ' (' + _.padLeft(delta,4) + ') - ' + string);
    lastTimestamp = timestamp;
}

Listener.prototype.log = log;

module.exports = Listener;

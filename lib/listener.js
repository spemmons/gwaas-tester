var dgram = require('dgram');
var m2m = require('m2m-ota-javascript');

function Listener(port,host,onmessage){

    this.port = port;
    this.host = host;
    this.client = dgram.createSocket('udp4');

    this.client.on('close',function () {
        console.log((new Date()).valueOf().toString() + ' - connection closed');
    });

    this.client.on('error',function (err) {
        console.log('error=' + err);
    });

    this.client.on('message',function (buffer,info) {
        try {
            console.log((new Date()).valueOf().toString() + ' - incoming - size: ' + buffer.length + ' from: ' + info.address + ':' + info.port);
            onmessage(new m2m.Message({buffer: buffer}));
        } catch(e) {
            console.log('on message failure= ' + e);
        }
    });

}

Listener.prototype.send = function(message){
    var buffer = message.toWire();
    console.log((new Date()).valueOf().toString() + ' - outgoing - size: ' + buffer.length + ' from: ' + this.host + ':' + this.port);
    this.client.send(buffer,0,buffer.length,this.port,this.host);
};

module.exports = Listener;
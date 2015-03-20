var dgram = require('dgram');
var m2m = require('m2m-ota-javascript');

function Listener(port,host,onmessage){

    this.port = port;
    this.host = host;
    var client = this.client = dgram.createSocket('udp4');

    client.on('close',function () {
        console.log('connection closed');
        client.close();
    });

    client.on('error',function (err) {
        console.log('error=' + err);
    });

    client.on('message',function (buffer,info) {
        try {
            console.log('message=' + buffer);
            console.log('info=' + info);
            onmessage(new m2m.Message({buffer: buffer}));
        } catch(e) {
            console.log('failure= ' + e);
        }
    });

}

Listener.prototype.send = function(message){
    var buffer = message.toWire();
    this.client.send(buffer,0,buffer.length,this.port,this.host);
};

module.exports = Listener;
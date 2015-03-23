var readline = require('readline');
var m2m = require('m2m-ota-javascript');

var done = false;
var cli = readline.createInterface({input: process.stdin,output: process.stdout});
cli.setPrompt('> ');
cli.prompt();
cli.on('line',function(line){
    try{
        var buffer = parseHexString(line);
        console.log(buffer.inspect());
        console.dir(new m2m.Message({buffer: buffer}));
    } catch(e) {
        console.log('error=' + e);
    }
    cli.prompt();
});
cli.on('SIGINT',function(){
    console.log('');
    process.exit(0);
});

function parseHexString(hexstring) {
    hexstring = hexstring.toLowerCase().replace(/ /g,'');

    if (hexstring.length % 2) throw(new Error('hex strings must be even lengths'));
    if (!/^[0-9a-f]+$/.test(hexstring)) throw(new Error('hex strings may only contain 0-9, a-f, or A-F'));

    var result = [];
    while (hexstring.length >= 2) {
        result.push(parseInt(hexstring.substring(0, 2), 16));
        hexstring = hexstring.substring(2, hexstring.length);
    }

    return new Buffer(result);
}
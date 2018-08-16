var net = require('net');
var optiopns = {
    port: 80,
    host: 'localhost'

};
var client = net.connect(optiopns, () => {
    client.write("haha");
});

client.on('data', function (data) {
    console.log(data.toString());
    client.end();
});
//Socket

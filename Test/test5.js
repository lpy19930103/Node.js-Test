var net = require('net');
net.createServer((conn) => {
    conn.on('data', (data => {
        console.log(data.toString());
        conn.write("hello world")
    }))
}).listen(80);
//Socket
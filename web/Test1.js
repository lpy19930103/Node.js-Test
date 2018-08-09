var events = require('events');
var fs = require('fs');

var eventEmitter = new events.EventEmitter();

var connectHandler = function connected() {
    console.log('connecting success');
    eventEmitter.emit('data_received')
};

eventEmitter.on('connection', connectHandler);

eventEmitter.on('data_received', function () {
    console.log('数据接收成功。');
});

eventEmitter.emit('connection');

console.log('事件执行完毕');

fs.readFile('./input.txt', function (err, data) {
    if (err) {
        console.log(err.stack);
        return
    }
    console.log(data.toString());
});
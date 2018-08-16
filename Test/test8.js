//ipc
var childProcess = require('child_process');
var child = childProcess.spawn('node', ['child.js'], {
    stdio: [0, 1, 2, 'ipc']
});
child.on('message', ((message) => {
    console.log(message);
}));

child.send({hello: 'hello child'});
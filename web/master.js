const fs = require('fs');
var childProcess = require('child_process');

for (var i = 0; i < 3; i++) {
    // var workProcess = childProcess.fork('support.js'[i]);
    var workProcess = childProcess.exec('node support.js' + i, (error, stdout, stderr) => {
        if (error) {
            console.log(error.stack);
            console.log('Error code: ' + error.code);
            console.log('Signal received: ' + error.signal);
        }
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
    });
    workProcess.on('exit', code => {
        console.log(`子进程已退出，退出码 + ${code}`)
    })
}
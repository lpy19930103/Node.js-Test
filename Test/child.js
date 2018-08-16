process.on('message', (msg) => {
    msg.hello = 'hello parent';
    process.send(msg);
});
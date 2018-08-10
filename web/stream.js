var fs = require("fs");
var data = '';

// 创建可读流
var readerStream = fs.createReadStream('input.txt');
// 设置编码为 utf8。
readerStream.setEncoding('UTF8');
// 处理流事件 --> data, end, and error
readerStream.on('data', function (chunk) {
    data += chunk;
});
readerStream.on('end', function () {
    console.log(data);
});
readerStream.on('error', function (err) {
    console.log(err.stack);
});

var writeStream = fs.createWriteStream('input.txt', {'flags': 'a'});
var data = '\n第四行\n第五行';
writeStream.write(data, 'UTF8');
writeStream.end();
writeStream.on('finish', function () {
    console.log('写入完成')
});
writeStream.on('error', function (err) {
    console.log(err.stack);
});

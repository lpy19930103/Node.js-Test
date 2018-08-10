const express = require('express');
const parser = require('body-parser');
const multerUtil = require('./multerUtil');
const cookieParser = require('cookie-parser');
const util = require('util');

const app = express();
app.use(cookieParser());

app.get('/', function (req, res) {
    res.end(`cookie = ${ util.inspect(req.cookies)}`);
});

app.get('/get', function (req, res) {
    var response = {
        "first_name": req.query.first_name,
        "last_name": req.query.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
});

var urlencoded = parser.urlencoded({extended: false});
app.post('/post', urlencoded, function (req, res) {
    var response = {
        "first_name": req.body.first_name,
        "last_name": req.body.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
});

var upload = multerUtil.single('file');
app.post('/upload', upload, function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            res.json('{"msg":"上传失败"}');
        }
        console.log(req.file);  // 上传的文件信息
        res.json('{"msg":"上传成功"}');
    });

});
var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
});
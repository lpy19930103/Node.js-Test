var cheerio = require('cheerio');
var superagent = require('superagent');

var express = require('express');
var http = require('http');
var router = express.Router();
var app = new express();
var fs = require('fs');
var indexRouter = router.get('/', (req, res, next) => {
    superagent.get('http://www.howzf.com/esfn/EsfnSearch_csnew.jspx')
        .set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8')
        .set('Referer', 'http://www.howzf.com/')
        .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36')
        .end((err, sres) => {
            if (err) return next(err);
            let $ = cheerio.load(sres.text);
            let items = [];
            $("div.houseBox2").each(() => {
                let $element = $("h5 a[target='_blank']");
                items.push({
                    title: $element.attr('title'),
                    href: $element.attr('href')
                });
            });
            res.send(items);
        });
});
app.use('/', indexRouter);
app.set('port', 3000);
var server = http.createServer(app);
server.listen(3000, () => {
    console.log("qidong")
});


function load() {
    superagent.get('http://www.howzf.com/esfn/EsfnSearch_csnew.jspx')
        .set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8')
        .set('Referer', 'http://www.howzf.com/')
        .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36')
        .end((err, sres) => {
            if (err) return next(err);
            let $ = cheerio.load(sres.text);
            let items = [];
            $("h5 a[target='_blank']").each((idx, element) => {
                console.log($(element).attr());
                let $element = $(element);
                items.push({
                    title: $element.attr('title'),
                    href: $element.attr('href')
                });
            });
            console.log(items)
        });
}

load();

const superagent = require('superagent');
const cheerio = require('cheerio');
const Eventproxy = require('eventproxy');
const url = require('url');
const async = require('async');
var homeInfo = require('./test3');
const cnodeUrl = 'https://hz.lianjia.com/ershoufang/';

var fetchUrl = (url, callback) => {
    homeInfo(url, (err, info) => {
        callback(err, info);
    });
};

superagent.get(cnodeUrl + '/esfn/EsfnSearch_csnew.jspx')
    .set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8')
    .set('Referer', 'http://www.howzf.com/')
    .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36')
    .end((err, sres) => {
        if (err) return next(err);
        let $ = cheerio.load(sres.text);
        let items = [];
        $("div.info a[target='_blank']").each((idx, element) => {
            let $element = $(element);
            var resolve = url.resolve(cnodeUrl, $element.attr('href'));
            items.push(resolve);
        });

        async.mapLimit(items, 5, (url, callback) => {
            fetchUrl(url, callback)
        }, (err, result) => {
            console.log(err);
            console.log(result);
        });
        /* var eventproxy = new Eventproxy();
         eventproxy.after('topic_html', items.length, (topics) => {
             topics.map((topicPair) => {
                 var info = topicPair[0];
                 let topicHtml = topicPair[1];
                 let $ = cheerio.load(topicHtml);
                 $("#myUl .hover").click(() => {
                     $('#mapsearchlist.fr').text();
                 });

                 return ({
                     href: info['href'],
                     title: info['title'],
                 });
             });
             console.log('final:');
             console.log(topics);
         });

         items.forEach((topicUrl) => {
             superagent.get(topicUrl['href'])
                 .set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*!/!*;q=0.8')
                 .set('Referer', 'http://www.howzf.com/')
                 .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36')
                 .end((err, res) => {
                     console.log('fetch ' + topicUrl['href'] + ' successful');
                     eventproxy.emit('topic_html', [topicUrl, res.text])
                 });
         });*/
    });

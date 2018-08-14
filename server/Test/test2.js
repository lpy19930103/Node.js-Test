const superagent = require('superagent');
const cheerio = require('cheerio');
const Eventproxy = require('eventproxy');
const url = require('url');

const cnodeUrl = 'https://cnodejs.org/';

superagent.get(cnodeUrl)
    .end((err, res) => {
        if (err) {
            return console.log(err);
        }
        var topicUrls = [];
        let $ = cheerio.load(res.text);
        $('#topic_list .topic_title').each(function (idx, element) {
            let $element = $(element);
            let href = url.resolve(cnodeUrl, $element.attr('href'));
            topicUrls.push(href);
        });

        var eventproxy = new Eventproxy();
        eventproxy.after('topic_html', topicUrls.length, (topics) => {
            topics.map((topicPair) => {
                let topicUrl = topicPair[0];
                let topicHtml = topicPair[1];
                let $ = cheerio.load(topicHtml);
                return ({
                    title: $('.topic_full_title').text().trim(),
                    href: topicUrl,
                    comment1: $('.reply_content').eq(0).text().trim(),
                });
            });
            console.log('final:');
            console.log(topics);
        });


        topicUrls.forEach((topicUrl) => {
            superagent.get(topicUrl)
                .end((err, res) => {
                    console.log('fetch ' + topicUrl + ' successful');
                    eventproxy.emit('topic_html', [topicUrl, res.text])
                })
        });
    });

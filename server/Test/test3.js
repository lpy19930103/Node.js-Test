const superagent = require('superagent');
const cheerio = require('cheerio');
var url = 'http://www.howzf.com/esf/xq_csnew_80619972.htm';
superagent.get(url)
    .set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8')
    .set('Referer', 'http://www.howzf.com/')
    .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36')
    .end((err, res) => {
        if (err) {
            return console.log(err)
        }
        let $ = cheerio.load(res.text);
        console.log($("div.infopic_box").attr());

    });
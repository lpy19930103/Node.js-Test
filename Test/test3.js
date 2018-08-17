const superagent = require('superagent');
const cheerio = require('cheerio');
// var url = 'https://hz.lianjia.com/ershoufang/103102699616.html';


var homeInfo = (url, callback) => {
    superagent.get(url)
        .set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8')
        .set('Referer', 'http://www.howzf.com/')
        .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36')
        .end((err, res) => {
            if (err) {
                return console.log(err)
            }
            let $ = cheerio.load(res.text);
            let homeInfos = [];
            let listingInfos = [];
            $("div.introContent div.base ul li").each((idx, element) => {
                let $element = $(element);
                homeInfos.push($element.text());
            });
            $("div.introContent div.transaction ul li").each((idx, element) => {
                let $element = $(element);
                listingInfos.push($element.find("span").text().replace(/\ +/g, "").replace(/[\r\n]/g, ""));
            });
            var info = ({
                title: $("div.title h1.main").text(),
                subTitle: $("div.title div.sub").text(),
                price: `总价${$("div.price span.total").text()} ${$("div.price span.unit span").text()} 单价${$("div.price span.unitPriceValue").text()}`,
                firstPay: $("div.price span.taxtext").text(),
                homeTag: $("div.newwrap div.tags div.content").text().replace(/\ +/g, "").replace(/[\r\n]/g, ","),
                otherInfo: $("div.newwrap div.introContent div.baseattribute div.content").text().replace(/\ +/g, "").replace(/[\r\n]/g, ","),
                homeInfos: homeInfos,
                listingInfos: listingInfos,

            });
            callback('success', info);
            console.log(info);
            return info;
        });
};

module.exports = homeInfo;
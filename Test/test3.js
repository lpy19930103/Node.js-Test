const superagent = require('superagent');
const cheerio = require('cheerio');
var utils = require('./utils');
var url = 'https://hz.lianjia.com/ershoufang/103102699616.html';
var sql = require('./homesql');

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
       /*     var info = ({
                url: url,
                title: $("div.title h1.main").text(),
                subTitle: $("div.title div.sub").text(),
                price: `总价${$("div.price span.total").text()} ${$("div.price span.unit span").text()} 单价${$("div.price span.unitPriceValue").text()}`,
                firstPay: $("div.price span.taxtext").text(),
                homeTag: $("div.newwrap div.tags div.content").text().replace(/\ +/g, "").replace(/[\r\n]/g, ","),
                otherInfo: $("div.newwrap div.introContent div.baseattribute div.content").text().replace(/\ +/g, "").replace(/[\r\n]/g, ","),
                homeInfos: homeInfos,
                listingInfos: listingInfos,

            });*/
            if (utils.isNotEmpty($("div.title h1.main").text()) && utils.isNotEmpty($("div.title div.sub").text())) {
                var addSql = 'INSERT INTO home(url,title,subTitle,price,firstPay,name,homeTag,otherInfo,homeInfos,listingInfos) VALUES(?,?,?,?,?,?,?,?,?,?)';
                var addParams = [url
                    , $("div.title h1.main").text()
                    , $("div.title div.sub").text()
                    , `总价${$("div.price span.total").text()} ${$("div.price span.unit span").text()} 单价${$("div.price span.unitPriceValue").text()}`
                    , $("div.price span.taxtext").text()
                    , $("div.aroundInfo div.communityName a").text()
                    , $("div.newwrap div.tags div.content").text().replace(/\ +/g, "").replace(/[\r\n]/g, ",")
                    , $("div.newwrap div.introContent div.baseattribute div.content").text().replace(/\ +/g, "").replace(/[\r\n]/g, ",").substr(0, 70)
                    , homeInfos.toString()
                    , listingInfos.toString()
                ];
                sql.add(addSql, addParams);
                callback('success', "");
                // console.log(info);
            }

        });
};

module.exports = homeInfo;
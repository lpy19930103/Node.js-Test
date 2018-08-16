var webpage = require('webpage');
var page = webpage.create();
var url = 'http://www.howzf.com/esf/xq_csnew_50162077.htm';
var fs = require('fs');

page.settings = {
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*!/!*;q=0.8',
    Referer: 'http://www.howzf.com/',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36'
};
phantom.outputEncoding = "gbk";//指定编码方式
page.open(url, function (status) {
    console.log(status);
    if (status === 'fail') {
        console.log('open page fail!');
    } else {
        console.log(page.content);//打印出HTML内容
        fs.writeFile('text1.json', page.content);
        setTimeout(() => {

        }, 2000);

    }
    page.close();//关闭网页
    phantom.exit();//退出phantomjs命令行
});
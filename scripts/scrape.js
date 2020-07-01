var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) {

    request("https://bitcoinmagazine.com/", function (err, res, body) {
        var $ = cheerio.load(body);
        var articles = [];
        $(".post").each(function (i, element) {
            var head = $(this).children(".post-title").text();
            var sum = $(this).children(".post-excerpt").text();

            if (head && sum) {
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                var dataToAdd = {
                    headline: headNeat,
                    summary: sumNeat
                };
                articles.push(dataToAdd);
            }
        });
        cb(articles);
        console.log(articles);
    });
};

module.exports = scrape;
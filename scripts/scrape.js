var request = require("request");
var cheerio = require("cheerio");
var scrape = function (cb) {

    request("https://www.bbc.com/news/coronavirus", function (err, res, body) {
        var $ = cheerio.load(body);
        var articles = [];
        $(".gs-c-promo-heading gs-o-faux-block-link__overlay-link gel-pica-bold nw-o-link-split__anchor").each(function (i, element) {
            var head = $(this).children(".gs-c-promo-heading__title gel-pica-bold nw-o-link-split__text").text().trim();
            var sum = $(this).children("gs-c-promo-summary gel-long-primer gs-u-mt nw-c-promo-summary gs-u-display-none gs-u-display-block@m").text().trim();

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
    });
};

module.exports = scrape;
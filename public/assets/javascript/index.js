$(document).ready(function () {
    var articleContainer = $(".articleContainer");
    $(document).on("click", ".btn.save", handleArticleSave);
    $(document).on("click", ".scrape-new", handleArticleScrape);

    // initPage();
    function initPage() {
        articleContainer.empty()
        $.get("/api/headlines")
            .then(function (data) {
                if (data && data.length) {
                    renderArticles(data);
                }
                else {
                    renderEmpty();
                }
            });
    }

    function renderArticles(articles) {
        var articlePanels = [];

        for (var i = 0; i < articles.length; i++) {
            articlePanels.push(createPanel(articles[i]));
        }
        articleContainer.append(articlePanels);
    }

    function createPanel(article) {
        var panel =
            $([
                "<div class='panel panel-default'>",
                "<div class ='panel-heading'>",
                "<h3>",
                article.headline,
                "<a class='btn btn-success save'>",
                "Save Article",
                "</a>",
                "</h3>",
                "/div>",
                "<div class='panel-body'>",
                article.summary,
                "</div>",
                "</div>"

            ].join(""));
        panel.data("_id", article.id);
        return panel;
    }

    function renderEmpty() {
        var emptyAlert =
            $(["<div class='alert alert-warning text-center'>",
                "<h4>'Sorry, there are no new articles'</h4>",
                "</div>",
                "<div class='panel panel-default'>",
                "<div class'panel-heading text-center'>",
                "<h3>What would you like to do?</h3>",
                "</div>",
                "<div class='panel-body text-center'>",
                "<h4><a class='scrape-new'>Scrape New Articles</a></h4>",
                "</div>",
                "</div>"
            ].join(""));
        articleContainer.append(emptyAlert);
    }


    function handleArticleSave() {
        var articleToSave = $(this).parents(".panel").data();
        articleToSave = true;
        $.ajax({
            method: "PATCH",
            url: "/api/headlines",
            data: articleToSave
        })
            .then(function (data) {
                if (data.ok) {
                    initPage();

                }
            });
    }

    function handleArticleScrape() {
        $.get("/api/fetch")
            .then(function (data) {
                initPage();
                console.log(data.message);
            });
    }
});
/* OPT-57485 START */
var productUrls = ['Promotion', 'offer', 'Promo'];

Insider.__external.isProductUrlsVisited = false;

productUrls.some(function (url) {
    if (Insider.fns.hasParameter(url)) {
        Insider.__external.isProductUrlsVisited = true;
    }
});

Insider.__external.isProductUrlsVisited;
/* OPT-57485 END */
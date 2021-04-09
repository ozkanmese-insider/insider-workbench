/* OPT-57485 START */
var productUrls = ['result/?q=omen', 'result/?q=gaming', '/gaming'];

Insider.__external.isSearchedUrls = false;

productUrls.some(function (url) {
    if (Insider.fns.hasParameter(url)) {
        Insider.__external.isSearchedUrls = true;
    }
});

Insider.__external.isSearchedUrls;
/* OPT-57485 END */
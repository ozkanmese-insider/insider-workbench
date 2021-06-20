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


/* OPT-58561 Start */
Insider.__external.isClickedBanner = false;

Insider.eventManager.once('click.banner:58561', '#ins-wrap1531840524000, #ins-wrap1531840524001', function () {
    Insider.__external.isClickedBanner = true;
});

Insider.__external.isClickedBanner;
/* OPT-58561 Start */
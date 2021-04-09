/* OPT-57485 START */
var productUrls = ['Promotion', 'offer', 'Promo'];
var storageName = 'ins-visit-count-57485';
var visitCount = Insider.storage.get(storageName) || 0;

productUrls.some(function (url) {
    if (Insider.fns.hasParameter(url)) {
        Insider.storage.localStorage.set({
            name: storageName,
            value: visitCount + 1,
            expires: 60
        });
    }
});

Insider.storage.localStorage.get(storageName) === 2;
/* OPT-57485 END */

Insider.storage.localStorage.get('ins-visit-count-57485') === 2;
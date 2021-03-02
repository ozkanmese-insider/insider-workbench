/*OPT-53710 START*/
var storageName = 'ins-last-searched-product-opt53710';

Insider.eventManager.once('click.add:to:search:opt53710', '.suggestions_panel__products > a', function () {
    var searchedFromBarProductInformations = {
        url: Insider.dom(this).attr('href'),
        imgUrl: Insider.dom(this).find('.SCB-Product-IMG').attr('src')
    };

    Insider.storage.localStorage.set({
        name: storageName,
        value: JSON.stringify(searchedFromBarProductInformations)
    });
});

if (Insider.systemRules.call('isOnProductPage')) {
    var isSearchedProduct = Insider.fns.getReferrer();
    var searchedProductInformations = {
        url: Insider.systemRules.call('getCurrentProduct').url,
        imgUrl: Insider.systemRules.call('getCurrentProduct').img
    };

    if (isSearchedProduct.indexOf('/search?text=') > -1) {
        Insider.storage.set({
            name: storageName,
            value: JSON.stringify(searchedProductInformations)
        });
    }
}

Insider.storage.localStorage.get(storageName);
/*OPT-53710 END*/

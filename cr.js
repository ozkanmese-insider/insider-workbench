/*OPT-53710*/
var storageName = 'ins-last-searched-product-opt53710';

if (Insider.systemRules.call('isOnProductPage')) {
    var isSearchedProduct = Insider.fns.getReferrer();

    if (isSearchedProduct.indexOf('/search?text=') > -1) {
        var searchedProductInformations = {
            url: Insider.systemRules.call('getCurrentProduct').url,
            imgUrl: Insider.systemRules.call('getCurrentProduct').img
        };

        Insider.storage.set({
            name: storageName,
            value: JSON.stringify(searchedProductInformations)
        });
    }
}

Insider.storage.localStorage.get(storageName);
/*OPT-53710*/
/* OPT-52363 START */
var storageName = 'ins-last-searched-item-opt-52363';

if (Insider.fns.hasParameter('search?text=')) {
    Insider.eventManager.once('click.add:to:search:opt52363', '.product_tile__link', function () {
        var searchedFromPageName = Insider.dom(this).find('.product_tile__title').text();

        Insider.storage.localStorage.set({
            name: storageName,
            value: searchedFromPageName,
            expires: 30
        });
    });
}

Insider.eventManager.once('click.add:to:search:opt52363', '.suggestions_panel__products > a', function () {
    var searchedFromBarProduct = Insider.dom(this).find('.suggestion_product__title').text();

    Insider.storage.localStorage.set({
        name: storageName,
        value: searchedFromBarProduct,
        expires: 30
    });
});

Insider.storage.localStorage.get(storageName) || '';
/* OPT-52363 END */
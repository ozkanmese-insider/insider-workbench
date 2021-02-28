/* OPT-53128 START*/
var storageData = 'ins-product-infos-53128';
var storageInformations = {
    addedItemsInformations: {
        cats: '',
        ids: ''
    },
    afterAddedItemsInformations: {
        ids: ''
    }
};
var productDatasArray = [];

if ((Insider.systemRules.call('isOnCartPage') || Insider.fns.hasParameter('/checkouts/'))) {
    var productUrls = Insider.storageAccessor.paidProducts().map(function (product) {
        return product.url;
    });

    productUrls.forEach(function (url) {
        Insider.request.get({
            url: url,
            data: '',
            success: function (response) {
                var element = document.createElement('div');

                element.innerHTML = response.response;

                var categoryText = Insider.dom('.pro-meta--col.category .detail', element).text().trim();
                var productIDText = Insider.dom('span#pro_sku', element).text().trim();
                var productDatas = {
                    cat: categoryText,
                    id: productIDText
                };

                productDatasArray.push(productDatas);
            }
        });
    });
    var storageInformations = {
        addedItemsInformations: {
            cats: productDatasArray.cat,
            ids: productDatasArray.id
        }
    };
    
    storageInformations;
}

/* OPT-53128 END*/

// last_3_months_order_categories
Insider.storage.localStorage.get('ins-paid-products-category-53128') || ''; /*OPT-53128*/

self.init = function () {
    setTimeout(function () {
        self.checkConditions();
    }, 2000);
};

self.checkConditions = function () {
    if ((Insider.systemRules.call('isOnCartPage') || Insider.fns.hasParameter('/checkouts/'))) {
        var productUrls = Insider.storageAccessor.paidProducts().map(function (product) {
            return product.url;
        });

        productUrls.forEach(function (url) {
            Insider.request.get({
                url: url,
                data: '',
                success: function (response) {
                    var element = document.createElement('div');

                    element.innerHTML = response.response;
                    var productInfos = JSON.parse(Insider.storage.localStorage.get(productInfosStorage)) || [];
                    var categoryText = Insider.dom('.pro-meta--col.category .detail', element).text().trim();
                    var productIDText = Insider.dom('span#pro_sku', element).text().trim();
                    var productDatas = {
                        cat: categoryText,
                        id: productIDText
                    };

                    productInfos.push(productDatas);

                    Insider.storage.set({
                        name: productInfosStorage,
                        value: JSON.stringify(productInfos)
                    });

                    JSON.parse(Insider.storage.localStorage.get(productInfosStorage));
                }
            });
        });
    }

    if (Insider.systemRules.call('isOnAfterPaymentPage')) {
        var productDatas = JSON.parse(Insider.storage.localStorage.get(productInfosStorage));
        var paidProducts = Insider.systemRules.call('getPaidProducts');
        var index;

        for (var i =0; i < productDatas.length; i++) {
            for (var z = 0; z < paidProducts.length; z++) {
                if (productDatas[i].id.indexOf(paidProducts[z].id)) {
                    index = categoryBought.indexOf(productDatas[i].cat);

                    if (index > -1) {
                        categoryBought.splice(index, 1);
                    }

                    categoryBought.push(productDatas[i].cat);
                }
            }
        }

        Insider.storage.set({
            name: paidProductsCategories,
            value: JSON.stringify(categoryBought),
            expires: Insider.dateHelper.addDay(90)
        });

        JSON.parse(Insider.storage.localStorage.get(paidProductsCategories));
    }
};

self.init();
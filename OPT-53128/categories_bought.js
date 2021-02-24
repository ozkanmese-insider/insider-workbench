if ((Insider.systemRules.call('isOnCartPage') || Insider.fns.hasParameter('123'))) {
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
                var categories = [];
                var categoryText = Insider.dom('.pro-meta--col.category .detail', element).text().trim();
                categoryText !== '' && categories.push(categoryText);
                if (categories.length === 0) {
                    Insider.dom('.breadcrumb li:not(:first):not(:last)', element).each(function (key, catItem) {
                        var text = Insider.dom(catItem).text().trim();
                        text !== '' && categories.indexOf(text) === -1 && categories.push(text);
                    });
                }
                {
                    url: category
                }
                console.log(categories);
            }
        });
    });
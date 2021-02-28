/* OPT-53128 START*/
(function (self) {
    var storageName = 'ins-purchased-control-opt53128';
    var storageData = Insider.storage.get(storageName) || {
        cartListOfCategory: {},
        purchasedCategoryOfProduct: {},
        currentCartListProductId: []
    };

    self.init = function () {
        self.setEvent();
        self.checkCurrentState();
        self.checkAfterPaymentCategory();
        self.setStorage();
    };
    self.setEvent = function () {
        Insider.eventManager.off('cart:amount:update.opt53128')
            .on('cart:amount:update.opt53128', function () {
                setTimeout(function () {
                    self.checkCurrentState();
                }, 500);
            });
    };
    self.checkCurrentState = function () {
        var differenceProduct = self.getDifferenceProductWithCartPage();

        differenceProduct.forEach(function (product) {
            var foundCategory = self.getCategoryOfProductFromStorage(product.id);

            if (foundCategory === '') {
                self.sendRequest(product.url);
            } else {
                storageData.currentCartListProductId.push(product.id);
            }
        });
    };
    self.getDifferenceProductWithCartPage = function () {
        var cartList = Insider.storageAccessor.cartProductList().productList || [];

        return cartList.filter(function (product) {
            return !storageData.currentCartListProductId.includes(product.id);
        });
    };
    self.getCategoryOfProductFromStorage = function (productId) {
        var category = '';

        Object.keys(storageData.cartListOfCategory).some(function (key) {
            if (storageData.cartListOfCategory[key].indexOf(productId) > -1) {
                category = key;

                return false;
            }
        });

        return category;
    };
    self.sendRequest = function (url) {
        Insider.request.get({
            url: url,
            data: '',
            success: function (response) {
                var element = document.createElement('div');

                element.innerHTML = response.response;
                self.storeProductInformation(element);
            }
        });
    };
    self.storeProductInformation = function (element) {
        storageData = Insider.storage.get(storageName);
        var category = Insider.dom('.pro-meta--col.category .detail', element).text().trim();
        var productId = Insider.dom('span#pro_sku', element).text().trim();

        typeof storageData.cartListOfCategory[category] === 'undefined' ?
            storageData.cartListOfCategory[category] = [productId] :
            storageData.cartListOfCategory[category].push(productId);
        storageData.currentCartListProductId.push(productId);
        self.setStorage();
    };
    self.checkAfterPaymentCategory = function () {
        if (Insider.systemRules.call('isOnAfterPaymentPage')) {
            var paidProducts = Insider.storageAccessor.paidProducts();

            paidProducts.forEach(function (product) {
                var category = self.getCategoryOfProductFromStorage(product.id);

                typeof storageData.purchasedCategoryOfProduct[category] === 'undefined' ?
                    storageData.purchasedCategoryOfProduct[category] = [product.id] :
                    storageData.purchasedCategoryOfProduct[category].push(product.id);
            });
        }
    };
    self.setStorage = function () {
        Insider.storage.set({
            name: storageName,
            value: storageData,
            expires: Insider.dateHelper.addDay(90)
        });
    };
    self.init();
})({});
/* OPT-53128 END*/


/* Object.keys(Insider.storage.localStorage.get('ins-purchased-control-opt53128').purchasedCategoryOfProduct).includes('Phấn Nước Cushion') */
Object.keys(Insider.storage.localStorage.get('ins-purchased-control-opt53128').purchasedCategoryOfProduct).join('||');
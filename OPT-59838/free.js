/* return Insider.utils.getDataFromIO('page', 'type') === 'Confirmation' &&
    !(Insider.storage.localStorage.get('isAfterPaymentPage') || false);
 */
/* OPT-29474 START */
Insider.__external.GetHoursSinceTheLastPurchase = function () {
    var currentDate = new Date().getTime();
    var lastPurchaseDate = Insider.storage.get('ins-last-purchase-date');

    if (Insider.systemRules.call('isOnAfterPaymentPage')) {
        Insider.storage.set({
            name: 'ins-last-purchase-date',
            value: currentDate
        });
    }

    if (lastPurchaseDate !== null) {
        return Math.round((currentDate - lastPurchaseDate) / (1000 * 3600));
    }

    return null;
};
/* OPT-29474 END */
/* OPT-59838 START */
Insider.__external.lastPurchaseDate = function () {
    var storageName = 'ins-last-purchase-date-59838';
    var currentDate = new Date().getTime();
    var lastPurchaseDate = Insider.storage.get(storageName);

    if (Insider.systemRules.call('isOnAfterPaymentPage')) {
        Insider.storage.set({
            name: storageName,
            value: currentDate
        });
    }

    if (lastPurchaseDate !== null) {
        var timeDifference = Math.round((currentDate - lastPurchaseDate) / (1000 * 3600));

        return timeDifference;
    }

    return null;
};
/* OPT-59838 END */

/* OPT-59838 START */
var hoursSinceTheLastPurchase = Insider.__external.lastPurchaseDate();

hoursSinceTheLastPurchase !== null ? hoursSinceTheLastPurchase > 24 : true;
/* OPT-59838 END */
/* OPT-29474 START  */
var hoursSinceTheLastPurchase = typeof Insider.__external.getHoursSinceTheLastPurchase === 'function' &&
    Insider.__external.getHoursSinceTheLastPurchase();

hoursSinceTheLastPurchase !== null ? hoursSinceTheLastPurchase > 24 : true;
/* OPT-29474 END */




/*SD-32396-- User attributes */
if (spApi.isOnAfterPaymentPage()) {
    spApi.localStorageSet('insLastPurchasedProd', JSON.stringify(JSON.parse(spApi.storageData('paid-products') || '[]')[0] || []));
    spApi.localStorageSet('insLastPurchasedDate', JSON.stringify(spApi.getTime()));
}
if (spApi.isOnCategoryPage() && spApi.getCategories().length > 0) {
    spApi.localStorageSet('insLastVisitedCategory', spApi.getCategories()[0]);
}

if (spApi.isOnProductPage()) {
    setTimeout(function () {
        spApi.localStorageSet('insLastVisitedProd', JSON.stringify(spApi.getCurrentProduct()));
    }, 1000);
}

setTimeout(function () {
    if (typeof insider_object == 'undefined') {
        var lastPurchasedProduct = (JSON.parse(spApi.localStorageGet('insLastPurchasedProd') || "{}"));
        var lastVisitedProduct = JSON.parse(spApi.localStorageGet('insLastVisitedProd') || "{}");
        var basketProducts = spApi.isOnCartPage() ? spApi.getPaidProducts() : (JSON.parse(spApi.storageData('paid-products')) || []);
        var prodCats = JSON.parse(spApi.storageData('prodCats')) || [];

        if (prodCats.length > 0 || basketProducts.length > 0 || !sQuery.isEmptyObject(lastVisitedProduct) || !sQuery.isEmptyObject(lastPurchasedProduct)) {
            window.insider_object = {
                user: {
                    name: sQuery('.usrHeaderLogined a:first').attr('title') || '',
                    location: JSON.parse(spApi.localStorageGet('userLocation') || '{}').city || '',
                    totalBasketAmount: spApi.isOnCartPage() ? (spApi.getTotalCartAmount() || 0).toString() : Number(spApi.storageData('total-cart-amount')).toString(),
                    basketItemCount: spApi.isOnCartPage() ? (spApi.getPaidProducts().length || 0).toString() : basketProducts.length.toString(),
                    lastVisitedProductName: decodeURIComponent(lastVisitedProduct.name).trim() || "",
                    lastPurchasedDate: spApi.isOnAfterPaymentPage() ? (JSON.stringify(spApi.getTime())) : (spApi.localStorageGet('insLastPurchasedDate')) || '',
                    lastVisitedCategory: spApi.isOnCategoryPage() ? (spApi.getCategories()[0]) : (spApi.localStorageGet('insLastVisitedCategory')) || '',
                    lastVisitedProductImage: lastVisitedProduct.img || "",
                    lastPurchasedProductName: lastPurchasedProduct.name || "",
                    lastPurchasedProductImage: lastPurchasedProduct.img || "",
                    language: spApi.getLang() || "tr_TR",
                    bonusRouble: "0",
                    basketItemName: (basketProducts[0] || {}).name || "",
                    basketItemImage: (basketProducts[0] || {}).img || "",
                    basketItemCategory: ((basketProducts.map(function (item) {
                        return prodCats.map(function (prodInfo) {
                            return item.name == decodeURIComponent(prodInfo.name) ? prodInfo.cat : '';
                        });
                    })[0] || [])[0]) || ""
                }
            };
        }
    }
}, 1500);


/* ENDOF: SD-32396 -- User attributes */




if (spApi.isUserLoggedIn() && typeof spApiUserData !== "undefined") {
    sQuery.cookie('insUserData', JSON.stringify({
        "email": spApiUserData.email
    }), {
        expires: 3650,
        path: "/",
        domain: window.location.host.replace("www.", "")
    });
}


sQuery('#insTriggerContent').elementLoadComplete(function () {
    sQuery('body').append('<style>#insTriggerContent { top: auto !important; bottom: 15px !important; }</style>');
});

// SD-36473
if (spApi.isOnCartPage()) {
    var basketContainer = setInterval(function () {
        if (sQuery('.js-basket-container.basket__container:visible').exists()) {
            spApi.conLog('clearInterval');
            clearInterval(basketContainer);
            spApi.updateCartCount(spApi.getCartCount());
        }
    }, 150)
    setTimeout(function () {
        if (typeof basketContainer !== 'undefined') {
            spApi.conLog('clearInterval - setTimeout');
            clearInterval(basketContainer);
        }
    }, 1000 * 5);
}
// END SD-36473

//OPT-3962 START - OPEN TO USE
spApi.sendGaEvent = function (builderId) {
    ga('gtm99.send', {
        'hitType': 'event',
        'eventCategory': 'INSIDER',
        'eventAction': spApi.decryptCampName(spApi.getCamp(spApi.userSegments[builderId]).camp.campName) +
            '-reco-view-product-click',
        'eventLabel': '(builder ID: ' + builderId + ')',
        'nonInteraction': spApi.gaNonInteraction
    });
};
//OPT-3962 END - OPEN TO USE

/* OPT-16158 Start */
spApi.userAddedBrandButDidntPurchased = function (brand) {
    var brandStorageName = 'ins-user-added-brand-didnt-purchased';
    var brandStorage = JSON.parse(spApi.storageData(brandStorageName)) || {};

    if (spApi.isOnAfterPaymentPage()) {
        if (brandStorage[brand] === 'true') {
            delete brandStorage[brand];

            spApi.storageData(brandStorageName, brandStorage);

            return false;
        }
    } else if (spApi.getDataFromDataLayer('ecommerce').hasOwnProperty('checkout')) {
        var cartItemBrands = [];

        (spApi.getDataFromDataLayer('ecommerce').checkout.products || []).forEach(function (element) {
            cartItemBrands.push((element.brand || '').toLowerCase());
        });

        if (cartItemBrands.indexOf(brand) > -1) {
            brandStorage[brand] = 'true';

            spApi.storageData(brandStorageName, brandStorage);

            return true;
        } else if (brandStorage[brand] === 'true') {
            delete brandStorage[brand];

            spApi.storageData(brandStorageName, brandStorage);

            return false;
        }

    }
};
/* OPT-16158 End */

/* OPT-16157 start */
(function (self) {
    var categoriesToBeTracked = {
        adidas: 1,
        nike: 1,
        hummel: 1,
        skechers: 1,
        reebok: 1,
        puma: 1
    };

    self.construct = function () {
        if (!spApi.isOnAfterPaymentPage()) {
            self.trackAddedCategories();
        } else {
            self.saveProductCategoriesBoughtFrom();
            self.saveNotBoughtCategories();
        }
    };

    self.trackAddedCategories = function () {
        var categoriesTracked = self.getCategoriesOfProducts(true);

        spApi.storageData('ins-product-categories-added-to-cart', categoriesTracked);
    };

    self.saveProductCategoriesBoughtFrom = function () {
        spApi.storageData('ins-product-categories-bought-to-cart', self.getCategoriesOfProducts(false));
    };

    self.getCategoriesOfProducts = function (isCart) {
        var products = JSON.parse(spApi.storageData('ins-cart-product-list') || '{}').productList || [];
        var temporaryArray = [];
        var mainCategory;

        if (isCart) {
            temporaryArray = JSON.parse(spApi.storageData('ins-product-categories-added-to-cart') || '[]');
        }

        products.forEach(function (product) {
            mainCategory = product.brand;

            if (categoriesToBeTracked[mainCategory] === 1 && temporaryArray.indexOf(mainCategory) === -1) {
                temporaryArray.push(mainCategory);
            }
        });

        return temporaryArray;
    };

    self.saveNotBoughtCategories = function () {
        var addedProductCategories = JSON.parse(spApi.storageData('ins-product-categories-added-to-cart') || '[]');
        var boughtProductCategories = JSON.parse(spApi.storageData('ins-product-categories-bought-to-cart') || '[]');
        var notBoughtCategories = [];

        addedProductCategories.forEach(function (addedCategory) {
            if (boughtProductCategories.indexOf(addedCategory) !== -1) {
                notBoughtCategories.push(addedCategory);
            }
        });

        spApi.storageData('ins-product-added-but-not-bought-categories', notBoughtCategories);
    };

    self.construct();
})({});

spApi.isProductBoughtFromCategories = function (category) {
    var addedProductCategories = JSON.parse(spApi.storageData('ins-product-categories-added-to-cart') || '[]');
    var boughtProductCategories = JSON.parse(spApi.storageData('ins-product-categories-bought-to-cart') || '[]');

    return addedProductCategories.indexOf(category) !== -1 && boughtProductCategories.indexOf(category) === -1;
};
/* OPT-16157 end */

/* OPT-22206 START */
spApi.listenAjaxRequest = function (callback) {
    var originalOpenFunction = XMLHttpRequest.prototype.open;

    XMLHttpRequest.prototype.open = function (method, url) {
        originalOpenFunction.apply(this, arguments);

        this.addEventListener('readystatechange', function () {
            if (this.readyState === 4 && this.status === 200 && typeof callback === 'function') {
                try {
                    callback(url, this.responseText, method);
                } catch (error) {
                    spApi.conLog('Something is crashed, Event:' + error);
                }
            }
        });
    };
};
/* OPT-22206 END */

/* OPT-29474 START */
Insider.__external.GetHoursSinceTheLastPurchase = function () {
    var currentDate = new Date().getTime();
    var lastPurchaseDate = Insider.storage.get('ins-last-purchase-date');

    if (Insider.systemRules.call('isOnAfterPaymentPage')) {
        Insider.storage.set({
            name: 'ins-last-purchase-date',
            value: currentDate
        });
    }

    if (lastPurchaseDate !== null) {
        return Math.round((currentDate - lastPurchaseDate) / (1000 * 3600));
    }

    return null;
};
/* OPT-29474 END */

/* OPT-39947 Start */
Insider.__external.checkPurchasedCategory = function (categoryName, expireDate) {
    var storageName = 'ins-is-' + categoryName + '-visited-not-purchased';
    var categories = Insider.systemRules.call('isOnProductPage') ? Insider.systemRules.call('getProductCategories') :
        Insider.systemRules.call('getCategories');
    var matchedCategories = Insider.storageAccessor.productCategoriesWithName().filter(function (product) {
        return product.cat.indexOf(categoryName) > -1 &&
            Insider.fns.find(Insider.storageAccessor.paidProducts(), 'id', product.id).length > 0;
    });

    if (Insider.storage.get(storageName) !== false && (categories.indexOf(categoryName) > -1 ||
            categoryName === 'Çocuk' && Insider.fns.parseURL().pathname.indexOf('/cocuk/') > -1)) {
        Insider.storage.set({
            name: storageName,
            value: true,
            expires: expireDate
        });
    } else if (Insider.systemRules.call('isOnAfterPaymentPage') && matchedCategories.length > 0) {
        Insider.storage.set({
            name: storageName,
            value: false,
            expires: expireDate
        });
    }

    return Insider.storage.get(storageName) || false;
};
/* OPT-39947 End */

/* OPT-40826 Start */
Insider.__external.doesNotPurchasedLast15Days = function (gender) {
    var categoryId = [];
    var productIdCategory = 'ins-cart-id-category-' + gender;
    var productCategories = Insider.storage.localStorage.get('prodCats') || {};
    var productCategoriesLength = productCategories.length;
    var userpaids = Insider.storage.localStorage.get('userpaids') || [];
    var addedButNotPurchased = 'ins-15d-not-purchase' + gender;
    var oldStorage = Insider.fns.parse(localStorage.getItem(productIdCategory));
    var oldStorageLength;
    var productCategoriesLastItem = productCategories[productCategoriesLength - 1];

    function setLocalStorage(name, value, expireDateDay) {
        return Insider.storage.localStorage.set({
            name: name,
            value: value,
            expires: Insider.fns.parse(localStorage.getItem(name) || '{}')._expires ||
                Insider.dateHelper.addDay(expireDateDay)
        });
    }

    if (productCategoriesLength > 0) {

        if (oldStorage === null) {
            oldStorageLength = 0;
        } else {
            oldStorage['data'].forEach(function (element) {
                categoryId.push({
                    id: element.id,
                    category: element.category
                });
            });

            oldStorageLength = oldStorage['data'].length;
        }

        if (productCategoriesLastItem.cat.indexOf(gender) > -1 &&
            (productCategoriesLastItem.cat.indexOf('Spor Ayakkabılar') > -1 ||
                productCategoriesLastItem.cat.indexOf('Sneaker') > -1)) {

            if (categoryId.length < 1 && productCategoriesLastItem.id !== '') {
                categoryId.push({
                    id: productCategoriesLastItem.id,
                    category: gender + '-spor-ayakkabi'
                });
            } else {
                categoryId.forEach(function (element) {

                    if (productCategoriesLastItem.id !== element.id &&
                        productCategoriesLastItem.id !== '') {

                        categoryId.push({
                            id: productCategoriesLastItem.id,
                            category: gender + '-spor-ayakkabi'
                        });
                    }
                });
            }
        }

        setLocalStorage(productIdCategory, categoryId, 15);

        oldStorage = Insider.fns.parse(localStorage.getItem(productIdCategory));
        oldStorage['data'].forEach(function (element) {
            categoryId.push({
                id: element.id,
                category: element.category
            });
        });

        oldStorageLength = oldStorage['data'].length;

    }

    if (oldStorageLength > 0) {
        setLocalStorage(addedButNotPurchased, true, 15);

        userpaids.forEach(function (element) {
            for (var i = 0; i < oldStorage['data'].length; i++) {

                if (element.id === oldStorage['data'][i].id) {
                    setLocalStorage(addedButNotPurchased, false, 15);
                }
            }
        });
    }

    return Insider.storage.localStorage.get(addedButNotPurchased) || false;
};

Insider.__external.doesViewedIn30DaysButNotPurchased = function (viewedUrl, productName, secondProductName, gender) {
    var currentPageUrl = window.location.href;
    var storageName = 'ins-visit-count-date-' + productName + gender;
    var pageVisitCounter = 0;
    var categoryId = [];
    var productIdCategory = 'ins-cart-id-category-30d-' + productName + gender;
    var productCategories = Insider.storage.localStorage.get('prodCats') || {};
    var productCategoriesLength = productCategories.length;
    var userpaids = Insider.storage.localStorage.get('userpaids') || [];
    var addedButNotPurchased = 'ins-30d-not-purchase-' + productName + gender;
    var oldStorage = Insider.fns.parse(localStorage.getItem(productIdCategory));
    var oldStorageLength;
    var productCategoriesLastItem = productCategories[productCategoriesLength - 1];
    var oldVisitDateCount = Insider.fns.parse(localStorage.getItem(storageName));

    function setLocalStorage(name, value, expireDateDay) {
        return Insider.storage.localStorage.set({
            name: name,
            value: value,
            expires: Insider.fns.parse(localStorage.getItem(name) || '{}')._expires ||
                Insider.dateHelper.addDay(expireDateDay)
        });
    }

    if (oldVisitDateCount === null) {
        setLocalStorage(storageName, pageVisitCounter, 30);
    } else {
        pageVisitCounter = oldVisitDateCount['data'];
    }

    if (currentPageUrl.indexOf(viewedUrl) > -1 &&
        Insider.storage.get('ins-userDateV').length > pageVisitCounter) {

        pageVisitCounter += 1;
        setLocalStorage(storageName, pageVisitCounter, 30);
    }

    if (productCategoriesLength > 0) {

        if (oldStorage === null) {
            oldStorageLength = 0;
        } else {
            oldStorage['data'].forEach(function (element) {
                categoryId.push({
                    id: element.id,
                    category: element.category
                });
            });

            oldStorageLength = oldStorage['data'].length;
        }

        if ((productCategoriesLastItem.cat.indexOf(productName) > -1 ||
                productCategoriesLastItem.cat.indexOf(secondProductName) > -1) &&
            productCategoriesLastItem.cat.indexOf(gender) > -1) {

            if (categoryId.length < 1 && productCategoriesLastItem.id !== '') {
                categoryId.push({
                    id: productCategoriesLastItem.id,
                    category: viewedUrl
                });
            } else {
                categoryId.forEach(function (element) {

                    if (productCategoriesLastItem.id !== element.id &&
                        productCategoriesLastItem.id !== '') {

                        categoryId.push({
                            id: productCategoriesLastItem.id,
                            category: viewedUrl
                        });
                    }
                });
            }
        }

        setLocalStorage(productIdCategory, categoryId, 30);

        oldStorage = Insider.fns.parse(localStorage.getItem(productIdCategory));

        oldStorage['data'].forEach(function (element) {
            categoryId.push({
                id: element.id,
                category: element.category
            });
        });

        oldStorageLength = oldStorage['data'].length;
    }

    if (pageVisitCounter > 1 && oldStorageLength > 0) {
        setLocalStorage(addedButNotPurchased, true, 30);

        userpaids.forEach(function (element) {
            for (var i = 0; i < oldStorage['data'].length; i++) {

                if (element.id === oldStorage['data'][i].id) {
                    setLocalStorage(addedButNotPurchased, false, 30);
                }
            }
        });
    }

    return Insider.storage.localStorage.get(addedButNotPurchased) || false;
};

Insider.__external.doesVisitedSpecificUrlLast15Days = function (viewedUrl) {
    var daysSinceLastVisit = (24 * 60 * 60 * 1000) * 15;
    var todaysDate = Insider.dateHelper.now();
    var lastVisitedDateCount = (Insider.storage.get('ins-userDateV') || []).length;

    if (lastVisitedDateCount > 1) {
        lastVisitedDateCount -= 2;

        return (todaysDate - (Insider.storage.get('ins-userDateV') || [])[lastVisitedDateCount] < daysSinceLastVisit &&
            window.location.href.indexOf(viewedUrl) > -1);
    }

    return false;
};
/* OPT-40826 End */
/* OPT-59572 START */
Insider.__external.sendCustomGoal = function (builderId, goalId, checkGoalExistence) {
    var goalOfCamp = Insider.goalBuilder.getGoalBuildersByBuilderId(builderId)[goalId];
    var variationId = Insider.campaign.userSegment.get()[builderId];
    var storageNameOfGoal = 'sp-goal-' + variationId + '-' + goalId;

    if (typeof goalOfCamp === 'undefined' ||
        (checkGoalExistence && Insider.storage.get(storageNameOfGoal, 'localStorage', true) !== null)) {
        return false;
    }

    goalOfCamp.goalList[0]['selectorString'] = 'true';

    Insider.goalBuilder.addGoalTracking();
};

/* OPT-59572 END */
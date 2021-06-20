/* OPT-58408 START */
var storageName = 'ins-cart-abandonment-information-58408';
var flag = false;

if (Insider.systemRules.call('getCartCount') > 0) {
    flag = true;
}

Insider.storage.localStorage.set({
    name: storageName,
    value: flag
});

Insider.storage.localStorage.get(storageName) || false;
/* OPT-58408 END */


/* OPT-58408 START */
var storageName = 'ins-session-information';
var storageData = Insider.storage.session.get(storageName) || {
    isAddedToCart: false,
};

if (Insider.systemRules.call('getCartCount') > 0) {
    storageData.isAddedToCart = true;
}

Insider.storage.session.set({
    name: storageName,
    value: storageData
});

if (Insider.systemRules.call('isOnAfterPaymentPage')) {
    Insider.storage.session.remove(storageName);
}

storageData.isAddedToCart || false;
/* OPT-58408 END */
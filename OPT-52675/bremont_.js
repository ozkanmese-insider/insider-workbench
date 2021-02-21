var cartCount = Insider.systemRules.call('getCartCount');
var storageName = 'ins-cart-clear-52675';
var config = Insider.storage.localStorage.get(storageName) || {
    actualValue: false,
    flag: false
};
var updateStorage = function () {
    Insider.storage.localStorage.set({
        name: storageName,
        value: config,
        expires: 1
    });
};

if (cartCount) {
    config.flag = true;
    updateStorage();
}

if (config.flag === true && !cartCount) {
    config.actualValue = true;
    updateStorage();
}
((Insider.storage.localStorage.get(storageName) || {}).actualValue || false);
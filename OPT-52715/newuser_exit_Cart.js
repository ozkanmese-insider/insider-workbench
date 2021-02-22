var value = false;
var storageName = 'ins-new-user-left-cart-page-52715';

if (Insider.storage.get('ins-userDateV').length === 1) {
    Insider.eventManager.once('beforeunload.ins:page:refresh:OPT123', window, function () {
        if (Insider.systemRules.call('isOnCartPage')) {
            value = true;
        }
    });

}

Insider.storage.localStorage.set({
    name: storageName,
    value: value
});

Insider.storage.localStorage.get('ins-new-user-left-cart-page-52715') || false;
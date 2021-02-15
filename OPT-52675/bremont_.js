/* OPT-52675 START*/
var storageName = 'ins-cart-clear';
var flag = false;

if (Insider.systemRules.call('isOnCartPage')) {
    if (Insider.systemRules.call('getCartCount') === 0 ) {
        flag = true;
    }
}

Insider.storage.set({
    name: storageName,
    value: flag
});

Insider.storage.get(storageName) || '';
/* OPT-52675 END*/

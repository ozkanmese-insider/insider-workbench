/* OPT-57485 START */
var storageName = 'ins-purchase-count';
var purchaseCount = Insider.storage.get(storageName) || 0;

if (Insider.systemRules.call('isOnAfterPaymentPage')) {
    Insider.storage.localStorage.set({
        name: storageName,
        value: purchaseCount + 1
    });
}

Insider.storage.localStorage.get(storageName) === 1;
/* OPT-57485 END */
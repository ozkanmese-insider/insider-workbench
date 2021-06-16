Insider.systemRules.call('getCartCount') > 0 && !Insider.systemRules.call('isOnAfterPaymentPage'); /* OPT-59838 */
/* OPT-59838 START */
/* var currentDate = new Date().getTime();
var lastPurchaseDate = Math.round(currentDate - Insider.storage.localStorage.get('insLastPurchasedDate')) / (1000 * 3600);

lastPurchaseDate > 24 ? true : false; */
/* OPT-59838 END */

/* OPT-59838 START */

//var lastPurchaseDate = Math.round(currentDate - Insider.storage.get(storageName)) / (1000 * 3600);

if (Insider.storage.get(storageName) !== null && lastPurchaseDate < 24) {

}

/* OPT-59838 END */
Insider.__external.hoursSinceTheLastPurchase = function () {
    var storageName = 'ins-last-purchase-date-59838';
    var currentDate = Insider.dateHelper.getTime();

    if (Insider.systemRules.call('isOnAfterPaymentPage')) {
        Insider.storage.set({
            name: storageName,
            value: currentDate,
            expires: 30
        });
    }

    if (Insider.storage.get(storageName) !== null) {
        var timeDifference =  Insider.dateHelper.hoursPastUntilNow(Insider.storage.get(storageName));

        return timeDifference;
    }

    return null;
};
/* OPT-59838 END */

/* OPT-59838 START */
var hoursSinceTheLastPurchase = Insider.__external.lastPurchaseDate();

hoursSinceTheLastPurchase !== null ? hoursSinceTheLastPurchase > 24 : true;
/* OPT-59838 END */
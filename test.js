/*OPT-52715 start*/
/*OPT-52715 start*/
(function (self) {
    var storageData = Insider.storage.session.get('ins-session-information') || {};
    var sessionInformation = {
        visitTime: storageData.visitTime || Insider.dateHelper.getTime(),
        lastSessionPurchase: storageData.lastSessionPurchase || false,
        isAddedToCart: storageData.isAddedToCart || false,
        isCheckOutPage: storageData.isCheckOutPage || false,
        isFirstPageProduct: storageData.isFirstPageProduct,
        timeSpendOnSession: (Insider.dateHelper.getTime() - Number(storageData.visitTime || 
            Insider.dateHelper.getTime())) / Insider.dateHelper.ONE_SECOND_AS_MILLISECOND
    };

    self.init = function () {
        self.setSessionStorage();
        self.checkConditions();
    };

    self.setSessionStorage = function () {
        Insider.storage.session.set({
            name: 'ins-session-information',
            value: sessionInformation
        });
    };

    self.checkConditions = function () {
        if (Insider.systemRules.call('isOnAfterPaymentPage')) {
            sessionInformation.lastSessionPurchase = true;

            self.setSessionStorage();
        }

        if (Insider.systemRules.call('getCartCount') > 0) {
            sessionInformation.isAddedToCart = true;

            self.setSessionStorage();
        }

        if (Insider.fns.hasParameter('/checkout/onepage/')) {
            sessionInformation.isCheckOutPage = true;

            self.setSessionStorage();
        }

        if (sessionInformation.isFirstPageProduct === 'undefined') {
            sessionInformation.isFirstPageProduct = Insider.systemRules.call('isOnProductPage');
        }
    };

    self.init();
})({});
/* OPT-52715 END*/
//1.
!!((Insider.storage.session.get('ins-session-information') || {}).timeSpendOnSession < 10);
//2.
!!((Insider.storage.session.get('ins-session-information') || {}).timeSpendOnSession < 20) &&
!(Insider.storage.session.get('ins-session-information') || {}).lastSessionPurchase;
//3.
!!(Insider.storage.session.get('ins-session-information') || {}).isAddedToCart && 
    !(Insider.storage.session.get('ins-session-information') || {}).lastSessionPurchase;
//4.
!!(Insider.storage.session.get('ins-session-information') || {}).isCheckOutPage &&
    !(Insider.storage.session.get('ins-session-information') || {}).lastSessionPurchase;
//5. 
!!(Insider.storage.session.get('ins-session-information') || {}).isFirstPageProduct;
//6.
!!((Insider.storage.session.get('ins-session-information') || {}).timeSpendOnSession >
     Insider.dateHelper.ONE_MINUTE_AS_SECONDS * 5) &&
!(Insider.storage.session.get('ins-session-information') || {}).lastSessionPurchase;
//7.
(Insider.storage.get('ins-userDateV').length === 1 && Insider.systemRules.call('isOnCartPage')) || false;
//8.
(Insider.fns.hasParameter('/checkout/onepage/') || Insider.fns.hasParameter('/checkout/review/')) || false;

if (!(Insider.storage.session.get('ins-session-information') || {}).isFirstPageProduct && 
    Insider.systemRules.call('isOnProductPage')) {
    Insider.systemRules.call('isOnProductPage');
}

!!((Insider.storage.session.get('ins-session-information') || {}).isFirstPageProduct);/*OPT-52715*/
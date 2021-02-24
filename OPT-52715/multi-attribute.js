

(function (self) {
    var storageData = Insider.storage.session.get('ins-session-information') || {};
    var sessionInformation = {
        visitTime: storageData.visitTime || Insider.dateHelper.getTime(),
        isBought: storageData.isBought || false,
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
        } else if (Insider.systemRules.call('getCartCount') > 0) {
            sessionInformation.isAddedToCart = true;

            self.setSessionStorage();
        } else if (Insider.fns.hasParameter('/checkout/onepage/')) {
            sessionInformation.isCheckOutPage = true;
            
            self.setSessionStorage();
        } 

        if (sessionInformation.isFirstPageProduct === 'undefined') {
            sessionInformation.isFirstPageProduct = Insider.systemRules.call('isOnProductPage');
        }
    };
    self.init();
})({});



/*OPT-52715 start*/
(function (self) {
    var storageData = Insider.storage.session.get('ins-session-information') || {};
    var sessionInformation = {
        visitTime: storageData.visitTime || Insider.dateHelper.getTime(),
        isBought: storageData.isBought || false,
        isAddedToCart: storageData.isAddedToCart || false,
        isCheckOutPage: storageData.isCheckOutPage || false,
        isFirstPageProduct: storageData.isFirstPageProduct
    };

    self.init = function () {
        self.setSessionStorage();
        self.checkConditions();
        self.addEvent();
    };
    self.setSessionStorage = function () {
        Insider.storage.session.set({
            name: 'ins-session-information',
            value: sessionInformation
        });
    };
    self.checkConditions = function () {
        if (Insider.systemRules.call('isOnAfterPaymentPage')) {
            sessionInformation.isBought = true;
            self.setSessionStorage();
        }

        else if (Insider.systemRules.call('getCartCount') > 0) {
            sessionInformation.isAddedToCart = true;
            self.setSessionStorage();
        }

        else if (Insider.fns.hasParameter('/checkout/onepage/')) {
            sessionInformation.isCheckOutPage = true;
            self.setSessionStorage();
        } 

       if (sessionInformation.isFirstPageProduct === 'undefined') {
            sessionInformation.isFirstPageProduct = Insider.systemRules.call('isOnProductPage');
        }
    };
    self.addEvent = function () {
        Insider.eventManager.once('beforeunload.ins:page:refresh:OPT123', window, function () {
            var enteranceTime = Number(storageData.visitTime);
            var currentTime = Insider.dateHelper.getTime();

            sessionInformation.lastSessionDuration = (currentTime - (enteranceTime || 0)) /
                Insider.dateHelper.ONE_SECOND_AS_MILLISECOND;
            Insider.storage.localStorage.set({
                name: 'ins-last-session-information',
                value: sessionInformation
            });
        });
    };
    self.init();
})({});
//1.
!!(Insider.storage.localStorage.get('ins-last-session-information') || {}).lastSessionDuration < 10;
//2.
!!(Insider.storage.localStorage.get('ins-last-session-information') || {}).lastSessionDuration < 20 &&
    !(Insider.storage.localStorage.get('ins-last-session-information') || {}).lastSessionPurchase;
//3.
!!(Insider.storage.localStorage.get('ins-last-session-information') || {}).isAddedToCart &&
!(Insider.storage.localStorage.get('ins-last-session-information') || {}).lastSessionPurchase;
//4.
!!(Insider.storage.localStorage.get('ins-last-session-information') || {}).isCheckOutPage &&
    !(Insider.storage.localStorage.get('ins-last-session-information') || {}).lastSessionPurchase;
//5. 
!!(Insider.storage.localStorage.get('ins-last-session-information') || {}).isFirstPageProduct;
//6.
!!(Insider.storage.localStorage.get('ins-last-session-information') || {}).lastSessionDuration >
    (Insider.dateHelper.ONE_MINUTE_AS_SECONDS * 5) &&
    !(Insider.storage.localStorage.get('ins-last-session-information') || {}).lastSessionPurchase;
/*OPT-52715*/    
//7.
Insider.storage.get('ins-userDateV').length === 1 && Insider.systemRules.call('isOnCartPage');
//8.
Insider.fns.hasParameter('/checkout/onepage/') || Insider.fns.hasParameter('/checkout/review/');

!!(Insider.storage.session.get('ins-session-information') || {}).isAddedToCart;

if (Insider.systemRules.call('isOnAfter'))
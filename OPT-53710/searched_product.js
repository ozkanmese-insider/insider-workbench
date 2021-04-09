/* OPT-53710 START */
(function (self) {
    var storageName = 'ins-last-searched-product-opt53710';
    var storageData = Insider.storage.get(storageName) || {
        currentProduct: {},
        lastClickedUrl: ''
    };

    self.init = function () {
        self.setEvents();
        self.checkConditions();
        self.setStorage();
    };

    self.setEvents = function () {
        Insider.eventManager.once('click.add:to:search:opt53710', '.suggestions_panel__products > a', function () {
            storageData.lastClickedUrl = Insider.dom(this).attr('href');

            self.setStorage();
        });
    };

    self.checkConditions = function () {
        if (Insider.systemRules.call('isOnProductPage')) {
            var currentProductInformations = Insider.systemRules.call('getCurrentProduct');

            if (Insider.fns.getReferrer().indexOf('/search?text=') > -1 ||
                currentProductInformations.url.indexOf(storageData.lastClickedUrl) > -1) {
                storageData.currentProduct = currentProductInformations;
            }
        }
    };

    self.setStorage = function () {
        Insider.storage.set({
            name: storageName,
            value: storageData,
            expires: 90
        });
    };

    self.init();
})({});
/* OPT-53710 END */

(((Insider.storage.get('ins-last-searched-product-opt53710') || {}).currentProduct || {}).img || '');/* OPT-53710 */
(((Insider.storage.get('ins-last-searched-product-opt53710') || {}).currentProduct || {}).url || '');/* OPT-53710 */

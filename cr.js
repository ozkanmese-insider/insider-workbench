/*OPT-53710*/
var storageName = 'ins-last-searched-product-opt53710';

if (Insider.systemRules.call('isOnProductPage')) {
    var isSearchedProduct = Insider.fns.getReferrer();

    if (isSearchedProduct.indexOf('/search?text=') > -1) {
        var searchedProductInformations = {
            url: Insider.systemRules.call('getCurrentProduct').url,
            imgUrl: Insider.systemRules.call('getCurrentProduct').img
        };

        Insider.storage.set({
            name: storageName,
            value: JSON.stringify(searchedProductInformations)
        });
    }
}

Insider.storage.localStorage.get(storageName);
/*OPT-53710*/
/* OPT-52363 START */
var storageName = 'ins-last-searched-item-opt-52363';

if (Insider.fns.hasParameter('search?text=')) {
    Insider.eventManager.once('click.add:to:search:opt52363', '.product_tile__link', function () {
        var searchedFromPageName = Insider.dom(this).find('.product_tile__title').text();

        Insider.storage.localStorage.set({
            name: storageName,
            value: searchedFromPageName,
            expires: 30
        });
    });
}

Insider.eventManager.once('click.add:to:search:opt52363', '.suggestions_panel__products > a', function () {
    var searchedFromBarProduct = Insider.dom(this).find('.suggestion_product__title').text();

    Insider.storage.localStorage.set({
        name: storageName,
        value: searchedFromBarProduct,
        expires: 30
    });
});

Insider.storage.localStorage.get(storageName) || '';
/* OPT-52363 END */

/* OPT-56491 START */
(function (self) {
    var builderId = '61';
    var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId).toString();
    var isCampaignIsActive = Date.now() < (((Insider.campaign.get(variationId) || {}).activeDateEnd || 0) * 1000);
    var storageName = 'ins-trigger-whatsapp-hook-opt56491';
    var storageData = Insider.storage.get(storageName) || {};
    var whatsAppSettings = Insider.storage.localStorage.get('ins-wa') || {};
    var storageNameWhatsAppSettings = 'ins-wa-' + variationId;

    self.init = function () {
        setTimeout(function () {
            self.setWhatsAppHook();
            self.setEvents();
        }, 1000);
    };

    self.setWhatsAppHook = function () {
        if (Insider.systemRules.call('isOnProductPage')) {
            storageData.currentProduct = Insider.systemRules.call('getCurrentProduct') || {};
        }

        if (whatsAppSettings.isOptedIn && isCampaignIsActive && Insider.storageAccessor.totalCartAmount() === 0 &&
            storageData.lastSetProductId !== (storageData.currentProduct || {}).id) {
            Insider.request.post({
                url: 'https://mercury.api.useinsider.com/v1/message/hook/cart-abandonment/set',
                data: self.getPayload('set'),
                success: function () {
                    Insider.storage.localStorage.set({
                        name: storageNameWhatsAppSettings,
                        value: {
                            message: {
                                status: true
                            },
                            productList: [storageData.currentProduct]
                        }
                    });

                    storageData.lastSetProductId = storageData.currentProduct.id;

                    self.setStorageData();
                },
            });
        }
    };

    self.getPayload = function (type) {
        var payload = {
            partnerName: Insider.partner.name,
            userId: whatsAppSettings.userId,
            campaignId: variationId,
            phoneNumber: whatsAppSettings.phoneNumber
        };

        return type === 'reset' ? payload : Insider.fns.assign(payload, {
            language: whatsAppSettings.language,
            productList: '[' + Insider.fns.stringify(storageData.currentProduct) + ']',
            userAttributes: Insider.fns.stringify(
                Insider.storage.localStorage.get('ins-default-attributes') || {})
        });
    };

    self.setStorageData = function () {
        Insider.storage.localStorage.set({
            name: storageName,
            value: storageData,
            expires: 999
        });
    };

    self.setEvents = function () {
        Insider.eventManager.off('cart:amount:update.' + variationId)
            .on('cart:amount:update.' + variationId, function () {
                if (Insider.storageAccessor.totalCartAmount() > 0 &&
                    ((Insider.storage.localStorage.get(storageNameWhatsAppSettings) || {}).message || {}).status) {
                    self.sendResetWhatsAppHookRequest();
                }
            });
    };

    self.sendResetWhatsAppHookRequest = function () {
        Insider.request.post({
            url: 'https://mercury.api.useinsider.com/v1/message/hook/cart-abandonment/reset',
            data: self.getPayload('reset'),
            success: function () {
                Insider.storage.localStorage.set({
                    name: storageNameWhatsAppSettings,
                    value: {
                        message: {
                            status: false
                        },
                        productList: []
                    },
                });

                Insider.storage.localStorage.remove(storageName);
            },
        });
    };

    self.init();
})({});

false;
/* OPT-56491 END */
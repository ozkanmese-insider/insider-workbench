/* OPT-59406 START */
var builderId = Insider.browser.isMobile() ? 26 : 23;
var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);
var storageName = 'ins-cart-count-at-the-beginning-of-session';
var cartCountArray = Insider.storage.session.get(storageName) || [];

cartCountArray.push(Insider.systemRules.call('getCartCount'));

Insider.storage.session.set({
    name: storageName,
    value: cartCountArray
});

if (!Insider.campaign.isControlGroup(variationId)) {
    if (Insider.systemRules.call('getCartCount') > 0 && Insider.storage.get('ins-userDateV').length > 1 &&
        Insider.systemRules.call('getCartCount') - Insider.storage.session.get(storageName)[0] === 0) {
        Insider.campaign.info.show(variationId);
    }
}

false;
/* OPT-59406 END */
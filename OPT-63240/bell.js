var builderId = 6565565665;
var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);
var classes = {
    wrapper: 'ins-cart-reminder-wrapper-' + variationId,
    arrow: 'ins-cart-reminder-arrow-' + variationId,
    header: 'ins-cart-reminder-header-container-' + variationId,
    body: 'ins-cart-reminder-body-' + variationId,
    notificationBell: 'ins-cart-reminder-notificationBell-' + variationId,
    notification: 'ins-cart-reminder-notification-' + variationId,
    notificationInfoWrapper: 'ins-cart-reminder-item-wrapper-' + variationId,
    notificationUrl: 'ins-cart-reminder-item-url-' + variationId,
    notificationImage: 'ins-cart-reminder-item-image-' + variationId,
    notificationNameWrapper: 'ins-cart-reminder-name-wrapper-' + variationId,
    notificationName: 'ins-cart-reminder-item-name-' + variationId,
    customStyle: 'ins-style-' + variationId,
    defaultGoal: 'sp-custom-' + variationId + '-1',
};

Insider.dom('#search_mini_form > div.field.search').after('<div class="' + classes.notificationBell + '">' +
    '<img src="https://image.useinsider.com/4f/defaultImageLibrary/icon_bell5-1616151742.png"></div>');
Insider.dom('.' + classes.notificationBell).attr('style', 'margin-top:-48px !important;margin-left: -70%;width:45px !important;height:45px !important;');
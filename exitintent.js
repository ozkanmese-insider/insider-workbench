/* OPT-53056 START */
var builderId = 50;
var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);
var maxWidth = window.innerWidth;
var side = maxWidth / 2;
var userAgent = navigator.userAgent;
Insider.eventManager.once('mousemove.listen:' + variationId, 'header', function (event) {
    if (event.target === Insider.dom('.row').nodes[0] || event.target === Insider.dom('.sc-fzoCUK').nodes[0]) {
        if ((userAgent.indexOf('Linux') > -1 || userAgent.indexOf('Win') > -1) && event.clientX > side) {
            Insider.__external.isExitIntent = true;
        } else if (userAgent.indexOf('Mac') > -1 && event.clientX < side) {
            Insider.__external.isExitIntent = true;
        }
    }
});
Insider.eventManager.once('mouseleave.list:' + variationId, function () {
    if (Insider.__external.isExitIntent) {
        Insider.campaign.info.show(variationId);
    }
});
false;
/* OPT-53056 END */
/* OPT-53056 START */
Insider.__external.ajaxListener(function (url, response, method) {
    if (method === 'GET' && (url.indexOf('/?widgets=search_page') > -1 || url.indexOf('=search&widgets=') > -1)) {
        Insider.storage.set({
            name: 'ins-web-questionare-OPT53056',
            value: true
        }, 'localStorage', true);
    }
});
Insider.storage.get('ins-web-questionare-OPT53056', 'localStorage', true) || false;
/* OPT-53056 END */
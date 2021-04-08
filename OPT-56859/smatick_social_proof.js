/* OPT-56859 START */
var parameter = Insider.fns.hasParameter('parent/home.html#!/home');

if (parameter) {
    var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(44);
    
    Insider.campaign.webInfo.clearVisibleCampaignsByType('ON-PAGE');
    Insider.campaign.info.clearVisibleCampaignsByType('ON-PAGE');
    Insider.campaign.info.show(variationId);
}

setTimeout(function () {
    if (parameter) {
        var stringValue = (Math.floor((Math.random() * 20) + 40)).toString();

        Insider.dom('.ins-dynamic-element-tag.ins-dynamic-attribute').text(stringValue);
        Insider.dom('.ins-preview-wrapper').attr('style', 'left:35%');
    }
}, 100);

true;
/* OPT-56859 END */
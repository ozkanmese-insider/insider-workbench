/* OPT-56859 START */
setTimeout(function () {
    if (Insider.fns.hasParameter('parent/home.html#!/home')) {
        var newNumber = Math.floor((Math.random() * 70) + 30);
        var stringValue = newNumber.toString();
        var socialProofSelector = '.ins-dynamic-element-tag.ins-dynamic-attribute';

        Insider.dom(socialProofSelector).text(stringValue);
    }
}, 300);
/* OPT-56859 END */

Insider.campaign.webInfo.clearVisibleCampaignsByType('ON-PAGE');
Insider.campaign.info.clearVisibleCampaignsByType('ON-PAGE');
Insider.campaign.info.show(variationId);

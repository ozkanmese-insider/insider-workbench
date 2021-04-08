/* OPT-56712 START */
var builderId = 40;
var variationId = Insider.campaign.userSegment.segments[builderId];
var campaignLanguage = Insider.campaign.get(variationId).lang[0];

Insider.utils.onExitIntended(true, function () {
    if (campaignLanguage === Insider.systemRules.call('getLang') || campaignLanguage === 'es_ES') {
        Insider.campaign.custom.show(variationId);
    }
});

false;
/* OPT-56712 END */
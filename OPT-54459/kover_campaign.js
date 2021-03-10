/* var excludeCampaignVariationIds = ['c33', 'c35'];

var exludeCampaignIsActive = excludeCampaignVariationIds.some(function (variationId) {
    return eval(Insider.rules[((Insider.campaign.custom.get(variationId).showIn || {}).trigger || [])[0] || {}]
        .test || false);
});

if (exludeCampaignIsActive) {
    Insider.campaign.all.forEach(function (campaign) {
        if (excludeCampaignVariationIds.indexOf(campaign.id) === -1) {
            if (!campaign.showIn.segment) {
                campaign.showIn.segment = [1];
            }

            var rulesString = Insider.rules[campaign.showIn.segment[0]].test;
            var editedTrigger = rulesString.substr(0, rulesString.length) + '&& true===false';

            Insider.rules[campaign.showIn.segment[0]].test = editedTrigger;

            console.log(campaign.id + ' :' + eval(Insider.rules[campaign.showIn.segment[0]].test));
        }
    });
} */

/* OPT-54459 START */
(function (self) {
    var excludeCampaignVariationIds = ['c33', 'c35'];
    var exludeCampaignIsActive;

    self.init = function () {
        self.campaignIsActive();
        self.shownCampaignsSettings();
    };
    self.campaignIsActive = function () {
        exludeCampaignIsActive = excludeCampaignVariationIds.some(function (variationId) {
            return eval(Insider.rules[((Insider.campaign.custom.get(variationId).showIn || {}).trigger || [])[0] || {}]
                .test || false);
        });
    };
    self.shownCampaignsSettings = function () {
        if (exludeCampaignIsActive) {
            Insider.campaign.all.forEach(function (campaign) {
                if (excludeCampaignVariationIds.indexOf(campaign.id) === -1) {
                    if (!campaign.showIn.segment) {
                        campaign.showIn.segment = [1];
                    }

                    var rulesString = Insider.rules[campaign.showIn.segment[0]].test;
                    var editedTrigger = rulesString.substr(0, rulesString.length) + '&& true===false';

                    Insider.rules[campaign.showIn.segment[0]].test = editedTrigger;
                }
            });
        }
    };

    self.init();
})({});
/* OPT-54459 END */
/* OPT-54459 START */
(function (self) {
    var excludeCampaignVariationIds = ['c33', 'c35'];
    var exludeCampaignIsActive = false;

    self.init = function () {
        self.preventiveCampaignsAreActive();
        self.preventCampaignsToShow();
    };

    self.preventiveCampaignsAreActive = function () {
        exludeCampaignIsActive = excludeCampaignVariationIds.some(function (variationId) {
            return eval(Insider.rules[((Insider.campaign.custom.get(variationId).showIn || {}).trigger || [])[0] || {}]
                .test || false);
        });
    };

    self.preventCampaignsToShow = function () {
        if (exludeCampaignIsActive) {
            Insider.campaign.all.forEach(function (campaign) {
                if (excludeCampaignVariationIds.indexOf(campaign.id) === -1) {
                    if (!campaign.showIn.segment) {
                        campaign.showIn.segment = [1];
                    }

                    if (!campaign.showIn.trigger) {
                        campaign.showIn.trigger = [1];
                    }

                    var rulesString = Insider.rules[campaign.showIn.segment[0]].test;
                    var editedSegment = rulesString.substr(rulesString.length) + '&& true===false';
                    var rulesTrigger = Insider.rules[campaign.showIn.trigger[0]].test;
                    var editedTrigger = 'true===false &&' +  rulesTrigger.substr(rulesTrigger.length);

                    Insider.rules[campaign.showIn.segment[0]].test = editedSegment;
                    Insider.rules[campaign.showIn.trigger[0]].test = editedTrigger;
                }
            });

            Insider.__external.preventiveCampaingIsActive = true;
        }
    };

    self.init();
})({});
/* OPT-54459 END */




/* OPT-54459 START */
(function (self) {
    var excludeCampaignVariationIds = ['c33', 'c35'];
    var exludeCampaignIsActive = false;

    self.init = function () {
        self.preventiveCampaignsAreActive();
        self.preventCampaignsToShow();
    };

    self.preventiveCampaignsAreActive = function () {
        exludeCampaignIsActive = excludeCampaignVariationIds.some(function (variationId) {
            return eval(Insider.rules[((Insider.campaign.custom.get(variationId).showIn || {}).trigger || [])[0] || {}]
                .test || false);
        });
    };

    self.preventCampaignsToShow = function () {
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

            Insider.__external.preventiveCampaingIsActive = true;
        }
    };

    self.init();
})({});
/* OPT-54459 END */
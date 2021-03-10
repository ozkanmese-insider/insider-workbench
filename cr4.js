/* OPT-53961 START */
(function (self) {
    var campaignsInformation = {
        campaignDetails: {
            yogurt: {
                builderId: 3594,
                searchKey: 'Yoğurt',
                gif: 'https://image.useinsider.com/dominos/c761/118dL3aX1xJS1vy5p4Ll1556201216.gif'
            },
            sufle: {
                builderId: 3630,
                searchKey: 'Sufle',
                gif: 'https://image.useinsider.com/dominos/c823/Cjk70spybzlkDCDqVssA1571911074.gif'
            },
            cocaCola: {
                builderId: 3629,
                searchKey: 'Coca-Cola Pet 1 lt',
                gif: 'https://image.useinsider.com/dominos/c819/Untj3P3dWuLdWJvob8Xq1571910664.gif '
            },
            citirTavuk: {
                builderId: 3631,
                searchKey: 'Çıtır Tavuk Topları',
                gif: 'https://image.useinsider.com/dominos/c821/FbUKzZLKch9pHhw0A7wX1571910893.gif'
            }
        }
    };

    var detectedCampaignInformation = {
        goalId: 452,
        builderId: '',
        variationId: '',
        searchKey: '',
        searchOnLastPurchaseCount: 3
    };

    self.init = function () {
        self.changeCampaignBuilderId();
        self.setDetectedCampaign();
        self.showCampaign();
        self.setGoal();

        return false;
    };

    self.changeCampaignBuilderId = function () {
        if (Insider.browser.isMobile()) {
            campaignsInformation.campaignDetails.yogurt.builderId = 3628;
            campaignsInformation.campaignDetails.sufle.builderId = 3634;
            campaignsInformation.campaignDetails.cocaCola.builderId = 3633;
            campaignsInformation.campaignDetails.citirTavuk.builderId = 3635;
        }
    };

    self.setDetectedCampaign = function () {
        var foundCampaignInformation = false;

        Object.keys(campaignsInformation.campaignDetails).some(function (key) {
            if (typeof Insider.__external.checkLastPurchasedProductOPT51641 === 'function' &&
                Insider.__external.checkLastPurchasedProductOPT51641(
                    campaignsInformation.campaignDetails[key].searchKey,
                    detectedCampaignInformation.searchOnLastPurchaseCount)) {
                foundCampaignInformation = key;

                return true;
            }
        });

        if (foundCampaignInformation) {
            detectedCampaignInformation.builderId =
                campaignsInformation.campaignDetails[foundCampaignInformation].builderId;
            detectedCampaignInformation.variationId =
                Insider.campaign.userSegment.getActiveVariationByBuilderId(detectedCampaignInformation.builderId);
            detectedCampaignInformation.searchKey =
                campaignsInformation.campaignDetails[foundCampaignInformation].searchKey;
            detectedCampaignInformation.gif =
                campaignsInformation.campaignDetails[foundCampaignInformation].gif;
        }
    };

    self.showCampaign = function () {
        if (Insider.systemRules.call('isOnCartPage')) {
            Insider.campaign.custom.show(detectedCampaignInformation.variationId);
            self.writeLogger('CAMPAIGN IS SHOWN', '');

            if (!Insider.campaign.isControlGroup(detectedCampaignInformation.variationId)) {
                self.setCampaignChanges();

                self.writeLogger('SLIDER CHANGED', '');
            }
        }
    };

    self.writeLogger = function (prefix, suffix) {
        Insider.logger.log('********************OPT-53961****************\n' +
            prefix + '\n searchKey : ' + detectedCampaignInformation.searchKey +
            '\n bid:' + detectedCampaignInformation.builderId +
            '\n vid:' + detectedCampaignInformation.variationId +
            '\n ' + suffix);
    };

    self.setCampaignChanges = function () {
        if (typeof Insider.__external.changePartnerRecommendationOPT51641 === 'function') {
            Insider.__external.changePartnerRecommendationOPT51641({
                productText: detectedCampaignInformation.searchKey,
                variationId: detectedCampaignInformation.variationId,
                gif: detectedCampaignInformation.gif
            });
        }
    };

    self.setGoal = function () {
        if (Insider.systemRules.call('isOnAfterPaymentPage') &&
            JSON.stringify(Insider.storageAccessor.paidProducts()).indexOf(detectedCampaignInformation.searchKey)) {
            Insider.goalBuilder.manage({
                builderId: detectedCampaignInformation.builderId,
                variationId: detectedCampaignInformation.variationId,
                goalId: detectedCampaignInformation.goalId,
                subId: Insider.dateHelper.now(),
                logType: 'join',
                goalType: 'rules',
                selectorString: 'true',
                expectedMatching: 'true'
            });

            self.writeLogger('CUSTOM SALES GOAL WORKED ', detectedCampaignInformation.goalId +
                ' -->Goal is Sended');
        }
    };

    return self.init();
})({});
/* OPT-53961 END */
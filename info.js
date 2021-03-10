// eslint-disable-next-line no-undef
Insider.fns.onElementLoaded(closeButton, function () {
    setTimeout(function () {
        // eslint-disable-next-line no-undef
        Insider.eventManager.once('click.ins:button:close:' + variationId, closeButton, function () {
            // eslint-disable-next-line no-undef
            Insider.dom(headerSelector).removeClass('ins-edit-height-' + variationId);
        });
    }, 300);
}).listen();
/* local storage*/
var pathArray = window.location.pathname.split('/');
var setLocation = pathArray[3];

if (pathArray[3] !== 'undefined' && pathArray[3] !== null) {

    Insider.storage.set({
        name: 'lastStep',
        value: setLocation
    });
} else {
    setLocation = 'home';
    Insider.storage.set({
        name: 'lastStep',
        value: setLocation
    });
}
//tersten bakma ve sayfa icinden bulma yapilacak
Insider.fns.parseURL();

new Date(Insider.generateTime * 1000);

/* OPT-50902 STARTS */
Insider.__external.productClassCalculation50902 = function (config) {
    var self = {};
    var priceRanges = [];
    var productClass = ' ';

    self.init = function () {
        self.calculateRange();
        self.calculateClass();

        return productClass;
    };
    self.calculateRange = function () {
        if (config.category === 'Yataklar' || config.category === 'Baza & Başlik') {
            priceRanges = [1000, 2000, 5000];
        } else if (config.category === 'Yastik & Yorgan') {
            priceRanges = [200, 400, 600];
        } else if (config.category === 'Ev Teksti̇li̇') {
            priceRanges = [300, 600, 900];
        } else {
            Insider.logger.log('Could not find any related categories for product class');
        }
    };
    self.calculateClass = function () {
        if (config.price <= priceRanges[0]) {
            productClass = '4.sınıf';
        } else if (config.price > priceRanges[0] && config.price <= priceRanges[1]) {
            productClass = '3.sınıf';
        } else if (config.price > priceRanges[1] && config.price <= priceRanges[2]) {
            productClass = '2.sınıf';
        } else if (config.price > priceRanges[2]) {
            productClass = '1.sınıf';
        }
    };

    return self.init();
};
/* OPT-50902 ENDS */
Insider.campaign.get(754).pageSettings.locationConfig.selectedElement;

var button = Insider.dom('div > div > div > div.form__row.no-gutter--bottom.align--center > button');

Insider.fns.onElementLoaded(button, function () {
    Insider.eventManager.once('click.ins:user:clicked:opt-52178', button,
        function () {

        });
}).listen();

(function (self) {
    var variationId = $ {
        1 | c1, 1
    };
    self.init = function () {
        self.reset();
        self.buildHtml();
    };
    self.reset = function () {
        /* some code */
    };
    self.buildHtml = function () {
        /* some code */
    };
    self.init();
})({});

Insider.campaign.shownCampaigns;
Insider.campaign.decryptCampaignName('|-x-|RXZlbnQlMjBpbml0aWFsaXphdGlvbiUyMHRvJTIwbmV4dC5qcw==');
var builderId = 2057;
var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);
Insider.campaign.decryptCampaignName();
if (Insider.fns.hasParameter('uatns.komfort.pl/')) {
    Insider.campaign.showAllCampaigns = function () {};
}
Insider.campaign.all.forEach(function (element) {
    element.show = function () {};
});

var excludeCampaignVariationIds = ['c33', 'c35'];

var exludeCampaignIsActive = excludeCampaignVariationIds.some(function (variationId) {
    return eval(Insider.rules[((Insider.campaign.custom.get(variationId).showIn || {}).trigger || [])[0] || {}]
        .test || false);
});

if (exludeCampaignIsActive) {
    Insider.campaign.all.forEach(function (campaign) {
        if (excludeCampaignVariationIds.indexOf(campaign.id) === -1) {
            if (!campaign.showIn.trigger) {
                campaign.showIn.trigger = [1];
            }

            var rulesString = Insider.rules[campaign.showIn.trigger[0]].test;
            var editedTrigger = rulesString.substr(0, rulesString.length) + '&& true===false';


            Insider.rules[campaign.showIn.trigger[0]].test = editedTrigger;

            console.log(campaign.id + ' :' + eval(Insider.rules[campaign.showIn.trigger[0]].test));
        }
    });
}


var excludeCampaignVariationIds = ['c33', 'c35'];

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
}
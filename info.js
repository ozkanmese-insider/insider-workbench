// eslint-disable-next-line no-undef
var popup = Insider.dom('.baggage-rates-price-text :first');

Insider.fns.onElementLoaded(popup, function () {
    setTimeout(function () {
        Insider.dom('.baggage-rates-price-text :first').attr('style', 'color:#39454B; padding-left: 18%');
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

var array = [{
    foo: 1
}, {
    bar: 1
}, {
    foo: 1
}];
Insider.fns.find(array, 'foo', 1);
Insider.fns.clone({
    a: 1,
    b: 2
});
Insider.fns.stringify({
    a: 1
});
Insider.fns.onElementLoaded().listen().reset();
Insider.fns.has(["ko_KR", 'all_ALL'], "all_ALL")
Insider.fns.hasParameter();
Insider.fns.getParameterFromUrl('https://www.larocheposay.co.kr/main.do?a=1&b=2', 'b');
Insider.fns.isEmptyString('');
Insider.fns.isObject({
    a: 1
});
Insider.fns.objectValues({
    a: 1,
    b: 2
});
Insider.fns.isObjectInstance({
    a: 1
});
Insider.fns.stringify({
    a: 1
});
Insider.fns.parse('{a:1}');
Insider.fns.encode(e);
Insider.fns.decode(e);
Insider.fns.random(2);
Insider.fns.validateEmail('mehmet@eraslan.coms.s') //--> her zaman saglıklı değil.
Insider.fns.debounce(function () {}, 500);
Insider.fns.throttle(function () {}, 500)
Insider.fns.hash('asdasd');
Insider.fns.assign({
    a: 1
}, {
    b: 2
});
Insider.fns.hasOwn({
    a: 1
}, 'b');
Insider.fns.pm({
    target: this.nodes[0].contentWindow,
    type: "provider",
    message: {
        data: JSON.stringify(i),
        callback: encodeURI(e)
    },
    success: t || function () {}
});
Insider.fns.hasKey({
    a: 1
});
Insider.fns.isFunction(function () {});
(null || Insider.fns.noop)();
Insider.fns.isNumber(123);
Insider.fns.clone({
    a: 1
});


var totalCartAmount = Insider.systemRules.call('getTotalCartAmount');
var getPaidProducts = Insider.systemRules.call('getPaidProducts');

Insider.eventManager.once('cart:amount:update.ins:custom:show:camp:53277', function () {
    Insider.dom('.ins-cart-reminder-wrapper-c7 > div.ins-cart-reminder-footer-c7')
});

Insider.__external.sendCustomGoal = function (builderId, goalId, checkGoalExistence) {
    var goalOfCamp = Insider.goalBuilder.getGoalBuildersByBuilderId(builderId)[goalId];
    var variationId = Insider.campaign.userSegment.get()[builderId];
    var storageNameOfGoal = 'sp-goal-' + variationId + '-' + goalId;

    if (typeof goalOfCamp === 'undefined' ||
        (checkGoalExistence && Insider.storage.get(storageNameOfGoal, 'localStorage', true) !== null)) {
        return false;
    }

    goalOfCamp.goalList[0]['selectorString'] = 'true';

    Insider.goalBuilder.addGoalTracking();
};

//Example Usage
Insider.__external.sendCustomGoal(123, 45, true);

Insider.dom('.selector').remove(); /* resetleme fonksiyonu */
Insider.campaign.all // tüm kampanyaları çekiyor.
Insider.campaign.userSegment.getActiveVariationByBuilderId('builderId'); // builder id ile variation id bulma.
Insider.fns.hasParameter('urlparamaeter') // url içindeki parametreyi bulma.

/* GOALLER
    PAGEVİEW: goal ekliyorsun sonra verdiğin url httpsiz oluyor.
    custom click: click alacağın eventin içine sendCustomGoal kodunu çağırıyorsun. Sonra freejs e custom goal kodunu yapıştırıyrsun.
    ÜRÜNLER: customsa girip amele gibi custom rule yazıyorsun. shoecamp varsa kural false dönüyor.
    segmentler: için custom rule yazıyorsan bunu kullanmak için segmente sadece custom rule ekliyorsun bu kadar.
    social proof: manipule etmek için domdan elementi seçiyorsun sonra tostring yapıp text i ekliyorsun.
*/

Insider.dom('selector').addClass('eklenecek class');

var classes = {
    body: 'ins-falanfilan' + variationId /// falan filan diye iniyor aşağıya doğru.
}
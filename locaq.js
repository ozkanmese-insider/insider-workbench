Insider.__external.priceFormatter = function (str) {
    var decimalDelimiter = (str || '').replace(/[^0-9.,]/g, '').slice(-3, -2);

    if (decimalDelimiter === ',') {
        return parseFloat((str || '').replace(/[^0-9,]/g, '').replace(/,/g, '.')) || 0;
    }

    return parseFloat((str || '').replace(/[^0-9.]/g, '')) || 0;
};

Insider.__external.changeLocationConfig = function (options) {
    var activeVariationId = Insider.campaign.userSegment.segments[options.builderId];

    if (!activeVariationId) {
        return false;
    }

    function changeLocation(variationId) {
        var locationConfig = ((Insider.campaign.get(variationId) || {}).pageSettings || {}).locationConfig || {};

        if (options.selectedElement) {
            locationConfig.selectedElement = options.selectedElement;
        }

        if (options.insertAction) {
            locationConfig.insertAction = options.insertAction;
        }
    }

    Insider.campaign.isControlGroup(activeVariationId)
        ? changeLocation(Insider.campaign.getFirstVariationByBuilderId(options.builderId).variationId)
        : changeLocation(activeVariationId);

    return true;
};

/* OPT-38471 Start */
(function (self) {
    var storageName = 'visit-counts-OPT38471';
    var navigationType = window.performance.navigation.type;
    var storageData = Insider.storage.get(storageName) || {};
    var isVisitingProductPage = Insider.systemRules.call('isOnProductPage') &&
        Insider.fns.hasParameter('/buy/house') && navigationType !== 1;
    var isVisitingThemeCategory = Insider.systemRules.call('isOnCategoryPage') &&
        Insider.fns.hasParameter('/buy/theme');
    var isVisitingRegularCategory = Insider.systemRules.call('isOnCategoryPage') &&
        Insider.fns.hasParameter('/buy/list');

    self.init = function () {
        self.updateVisitCounts();
    };

    self.updateVisitCounts = function () {
        var categoryName;
        var locationName;

        if (isVisitingRegularCategory) {
            var $locationButton = Insider.dom('.buy-filter-area-btn span');

            locationName = $locationButton.eq(1).text() + $locationButton.last().text().split('、')[0];

            self.updateStorage(locationName, 'location');
        } else if (isVisitingThemeCategory) {
            categoryName = Insider.systemRules.call('getCategories').pop() || '';

            categoryName = categoryName === '給孩子有更多空間' ? '讓孩子有更多空間' : categoryName;

            self.updateStorage(categoryName, 'category');
        }

        if (isVisitingProductPage) {
            var isOnThemeProductPage = Insider.fns.hasParameter('breadcrumb=theme');
            var productCategories = Insider.systemRules.call('getProductCategories');

            if (isOnThemeProductPage) {
                categoryName = productCategories.pop() || '';

                self.updateStorage(categoryName, 'category');
            } else {
                locationName = (productCategories[1] || '') + (productCategories[2] || '');

                self.updateStorage(locationName, 'location');
            }
        }
    };

    self.updateStorage = function (value, mode) {
        var isLocationVisitedBefore = Object.prototype.hasOwnProperty.call(storageData[mode] || {}, value);

        if (isLocationVisitedBefore) {
            var oldCount = storageData[mode][value];

            delete storageData[mode][value];

            storageData[mode][value] = ++oldCount;
        } else {
            if (!storageData[mode]) {
                storageData[mode] = {};
            }

            storageData[mode][value] = 1;
        }

        Insider.storage.set({
            name: storageName,
            value: storageData
        });
    };

    self.init();
})({});

Insider.__external.isMostVisited38471 = function (itemName, mode) {
    var storageName = 'visit-counts-OPT38471';
    var storageData = Insider.storage.get(storageName) || {};
    var visitCounts = Object.values(storageData[mode] || {});
    var maximumVisitCount = Math.max.apply(Math, visitCounts);

    var mostVisitedItems = Object.keys(storageData[mode] || {}).filter(function (mostVisitedCategory) {
        return storageData[mode][mostVisitedCategory] === maximumVisitCount;
    });

    return mostVisitedItems.pop() === itemName;
};
/* OPT-38471 End */

/* OPT-47500 START */
(function (self) {
    var storageNameLastVisitedPage = 'last-visited-page-47500';

    self.init = function () {
        self.setStorage();
    };

    self.setStorage = function () {
        if (Insider.systemRules.isOnCategoryPage()) {
            var storageNameVisitedCategory = 'ins-visited-category-47500';
            var storageDataVisitedCategory = Insider.storage.localStorage.get(storageNameVisitedCategory) || {};
            var category = Insider.systemRules.getCategories().pop();

            if (window.location.href !== Insider.storage.localStorage.get(storageNameLastVisitedPage)) {
                category !== '主題找屋' && (storageDataVisitedCategory[category] =
                    storageDataVisitedCategory[category] + 1 || 1);

                Insider.storage.localStorage.set({
                    name: storageNameVisitedCategory,
                    value: storageDataVisitedCategory,
                    expires: 90
                });
            }
        }

        Insider.storage.localStorage.set({
            name: storageNameLastVisitedPage,
            value: window.location.href,
            expires: 90
        });
    };

    self.init();
})({});
/* OPT-47500 END */
/* OPT-47589 START */
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
/* OPT-47589 END */
/* OPT-55014 START */
(function (self) {
    var storageData = Insider.storage.get('ins-location-segment-55014') || {};
    var urlParse = window.location.href.split('/');
    var locationCounts = {
        taipeiCount: storageData.taipeiCount || 0,
        taoyuanCount: storageData.taoyuanCount || 0,
        hsinchuCount: storageData.hsinchuCount || 0,
        changhuaCount: storageData.changhuaCount || 0,
        taichungCount: storageData.taichungCount || 0,
        tainanCount: storageData.tainanCount || 0,
        kaohsiungCount: storageData.kaohsiungCount || 0,
    };

    self.init = function () {
        self.setStorage();
        self.updateLocationCount();
    };

    self.setStorage = function () {
        Insider.storage.set({
            name: 'ins-location-segment-55014',
            value: locationCounts
        });
    };

    self.updateLocationCount = function () {
        switch (urlParse[5]) {
            case 'Taipei-city':
                locationCounts.taipeiCount = locationCounts.taipeiCount + 1;
                break;
            case 'Taoyuan-city':
                locationCounts.taoyuanCount = locationCounts.taoyuanCount + 1;
                break;
            case 'Hsinchu-city':
                locationCounts.hsinchuCount = locationCounts.hsinchuCount + 1;
                break;
            case 'Changhua-county':
                locationCounts.changhuaCount = locationCounts.changhuaCount + 1;
                break;
            case 'Taichung-city':
                locationCounts.taichungCount = locationCounts.taichungCount + 1;
                break;
            case 'Tainan-city':
                locationCounts.tainanCount = locationCounts.tainanCount + 1;
                break;
            case 'Kaohsiung-city':
                locationCounts.kaohsiungCount = locationCounts.kaohsiungCount + 1;
                break;
        }

        self.setStorage();
    };

    self.init();
})({});
/* OPT-55014 END*/

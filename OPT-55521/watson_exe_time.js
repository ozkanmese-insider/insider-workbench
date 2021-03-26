spApi.getValueOfTastingBrand = function (category) {
    var tasteValue;

    sQuery('.rwj .cell').each(function () {
        if (sQuery('p', this).text() === category) {
            tasteValue = sQuery('span', this).text();
        }
    });

    return tasteValue;
};
/* OPT-13798-END */
/* OPT-14554 START */
spApi.getLastPaidProduct = function () {
    if (spApi.isOnAfterPaymentPage()) {
        return (Insider.storage.localStorage.get('userpaids') || [])[0] || {}; /* OPT-40466 */
    }

    return {};
};
/* OPT-14554 END */

/* OPT-16086 Start */
spApi.sendCustomGoal = function (builderId, goalId) {
    var goalOfCamp = spApi.personalizationCamps[builderId]['goalBuilderList'][goalId];

    if (typeof goalOfCamp === 'undefined') {
        return false;
    }

    if (goalOfCamp.type === 'rules') {
        goalOfCamp.goalList[0]['selectorString'] = 'true';

        spApi.addGoalTracking(true);
    }
};
/* OPT-16086 End */

/* OPT-17624 Start */
spApi.getProductDetails = function () {
    var details = document.getElementsByClassName('dePD_column');
    var detailArray = sQuery.makeArray(details);

    var getNullObjectData = function (index) {
        var result = (detailArray &&
            detailArray[index] &&
            detailArray[index].textContent);

        return result === '' ? undefined : result;
    };

    var foodMatch = (getNullObjectData(6) || '').replace(' and ', ', ').split(', '); /* OPT-24094 START-END */
    var productDetails = {
        region: getNullObjectData(0),
        grape: getNullObjectData(1),
        bottlesize: getNullObjectData(2),
        colour: getNullObjectData(3),
        sweetness: getNullObjectData(4),
        body: getNullObjectData(5),
        foodmatch1: foodMatch[0] || undefined,
        foodmatch2: foodMatch[1] || undefined,
        foodmatch3: foodMatch[2] || undefined
    };

    return productDetails;
};
/* OPT-17624 End */

/* OPT-26065 START */
/* OPT-26557 START */
var priceWrapperSelector = spApi.isMobileBrowser() ?
    '.ins-product-attributes' : '.ins-product-attributes-container';
var priceSelector = '.ins-product-price';
var discountPriceSelector = '.ins-product-discount';
/* OPT-26557 END */

sQuery(priceWrapperSelector).elementLoadComplete(function () {
    var detectRecommender = setInterval(function () {
        sQuery(priceWrapperSelector).each(function () {
            if (sQuery(priceSelector, this).text().indexOf('HKD') > -1) {
                var price = sQuery(priceSelector, this).text().replace(' HKD', '').replace('HKD', '');
                var discountPrice = sQuery(discountPriceSelector, this).text()
                    .replace(' HKD', '').replace('HKD', '');

                sQuery(priceSelector, this).text('HK$' + price);
                sQuery(discountPriceSelector, this).text('HK$' + discountPrice);
            }
        });
    }, 350);

    setTimeout(function () {
        clearInterval(detectRecommender);
    }, 2000);
});
/* OPT-26065 END */

/* OPT-27487 Start */
spApi.getProductDetailList = function (productSelector) {
    var productDetail = sQuery.trim(sQuery(productSelector).text().split(':')[1] || '');

    return (productDetail === '' || productDetail === '-') ? undefined : productDetail;
};

spApi.getProductFoodMatch = function (config) {
    var foodMatchValue = sQuery.trim((sQuery('.product-information-table tr:eq(2) td:eq(1)').text()
        .split(':')[1] || '').split(',')[config]);

    return (foodMatchValue === '' || foodMatchValue === '-') ? undefined : foodMatchValue;
};
/* OPT-27487 End */

/* OPT-36856 START */
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
/* OPT-36856 END */
if (typeof spApi !== 'object' && typeof Insider !== 'object') {
    alert('Insider API bulunamadı');
} else {
    var builderIds = prompt('Lütfen control grubuna geçirmek istediğiniz kampanya builder id değerini girin. Birden fazla girmek için builder id değerleri arasına "," işareti koyunuz.');
    var storageName = typeof Insider === 'object' ? 'ins-user-segments' : 'user-segments';
    var userSegmentsFromStorage = JSON.parse(spApi.storageData(storageName) || '{}');
    var controlGroupId = 0;
    var successBuilderIds = [];

    builderIds = builderIds.replace(/[^0-9,]/).split(',');
    builderIds.forEach(function (builderId) {
        var isSegment = spApi.userSegments[builderId];

        if (isSegment !== undefined) {
            if (typeof Insider === 'object') {
                controlGroupId = Insider.campaign.getVariationsByBuilderId(builderId).filter(function (variation) {
                    return variation.type === 'cg';
                }).map(function (controlGroup) {
                    return controlGroup.variationId;
                });
            } else {
                controlGroupId = spApi.getVariationsByBuilderId(builderId).filter(function (variation) {
                    return variation.type === 'cg';
                }).map(function (controlGroup) {
                    return controlGroup.varId;
                });
            }

            if (userSegmentsFromStorage[builderId] !== undefined) {
                userSegmentsFromStorage[builderId] = controlGroupId[0];
                successBuilderIds.push(builderId);
            }
        }
    });
    spApi.storageData(storageName, userSegmentsFromStorage, {
        expires: (1 / 24) / 2
    });
    var message = successBuilderIds.length > 0 ? 'Değişikliklerin geçerli olması için sayfayı yenile bro :D' : 'OOOPS Dostum doğru girdiğine emin ol!';

    alert('Control grubuna başarılı geçen builder id\'ler: ' + successBuilderIds.toString() + '\n' + message);
}





spApi.sendCustomGoal = function (builderId, goalId) {
    var goalOfCamp = spApi.personalizationCampsalizationCamps[builderId]['goalBuilderList'][goalId];

    if (typeof goalOfCamp === 'undefined') {
        return false;
    }

    if (goalOfCamp.type === 'rules') {
        goalOfCamp.goalList[0]['selectorString'] = 'true';

        spApi.addGoalTracking(true);
    }
};

/* OPT-22308 START */
spApi.isLeadCollectionSubmitted = function (deviceType, storageName) {
    if (spApi.deviceDetect(deviceType)) {
        var clickEvent = (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream ?
            'touchstart' : 'click') + '.insLeadSubmit';
        var insWrapperSelector = '.ins-preview-wrapper';
        var submitButtonSelector = insWrapperSelector + ' [data-element-name="Button"], ' +
            insWrapperSelector + ' .ins-element-button';
        var emailInputSelector = insWrapperSelector + ' input[type="email"]';
        var emailOptinSelector = insWrapperSelector + ' [data-input-type="email-opt-in"]:checked';

        sQuery(document).off(clickEvent, submitButtonSelector)
            .on(clickEvent, submitButtonSelector, function () {
                if (sQuery(emailOptinSelector).exists() &&
                    spApi.validateEmail(sQuery(emailInputSelector).val())) {
                    spApi.storageData(storageName, true);
                }
            });
    }

    return spApi.storageData(storageName) === true;
};
/* OPT-22308 END */

/* OPT-22311 START */
(function wishListWatch(self) {
    var wishListStorageName = 'ins-wish-list';
    var clickPattern = 'click.insOPT22311';

    spApi.wishList = JSON.parse(spApi.storageData(wishListStorageName)) || [];

    self.init = function () {
        setTimeout(self.reset, 5000);

        if (spApi.isOnProductPage()) {
            var likeButtonElement = sQuery('.product-main-content__info-like');
            var productPageProduct = spApi.getCurrentProduct();

            productPageProduct.name = decodeURIComponent(productPageProduct.name);

            likeButtonElement.off(clickPattern).on(clickPattern, function () {
                likeButtonElement.hasClass('_active') ?
                    self.removeItem(productPageProduct) :
                    self.addItemOrUpdateItem(productPageProduct);
            });
        } else if (spApi.isOnCategoryPage() && !spApi.isMobileBrowser()) {
            sQuery(document).off(clickPattern).on(clickPattern, '.product-item__advanced-like', function () {
                var mainElement = sQuery(this).closest('.product-list__item');
                var productName = '';
                var price = Number(mainElement.find('.product-item__info-price-value b').text().replace(/[^0-9]/g, ''));

                if (sQuery('.product-item__info-liberty-name').exists()) {
                    productName = mainElement.find('.product-item__info-row .product-item__info-liberty-name').text();
                } else {
                    mainElement.find('.product-item__info-row div').each(function () {
                        productName += sQuery.trim(sQuery(this).text()) + ' ';
                    });
                }

                var catalogPageProduct = {
                    id: (mainElement.find('a.product-item__advanced-inner').attr('href') || '')
                        .replace(/(\/([^/]*)\/)|(\/)/g, ''),
                    url: location.origin + (mainElement.find('.product-item__advanced-inner').attr('href') || ''),
                    originalPrice: Number(mainElement.find('.product-item__price-old:first').text()
                        .replace(/[^0-9]/g, '')) || price,
                    price: price,
                    name: sQuery.trim(productName),
                    img: mainElement.find('.product-item__img-wrapper img').attr('src') || ''
                };

                sQuery(this).hasClass('_active') ?
                    self.removeItem(catalogPageProduct) :
                    self.addItemOrUpdateItem(catalogPageProduct);
            });
        }
    };

    self.reset = function () {
        if (Number(sQuery('a[href="/favorites/"]').clone().children().remove().end().text()) === 0) {
            spApi.storageData(wishListStorageName, []);

            spApi.wishList = [];
        }
    };

    self.removeItem = function (item) {
        spApi.wishList = spApi.wishList.filter(function (listItem) {
            return listItem.id !== item.id;
        });

        self.saveStorageItem(spApi.wishList);
    };

    self.saveStorageItem = function (payload) {
        spApi.storageData(wishListStorageName, payload, {
            expires: 100
        });
    };

    self.addItemOrUpdateItem = function (item) {
        var hasItem = spApi.wishList.some(function (listItem) {
            return listItem.id === item.id;
        });

        if (hasItem) {
            spApi.wishList = spApi.wishList.filter(function (listItem) {
                return listItem.id !== item.id;
            });
        }

        spApi.wishList.push(item);

        self.saveStorageItem(spApi.wishList);
    };

    self.init();
})({});

spApi.isOnAfterPaymentPage() && spApi.storageData('ins-entered-after-payment', true, {
    expires: 33
});

!spApi.storageData('ins-first-entered-date') &&
    spApi.storageData('ins-first-entered-date', new Date().getTime(), {
        expires: 33
    });

spApi.getTotalDays = function (firstDateMillisecond, lastDateMillisecond) {
    return Math.round(Math.abs((firstDateMillisecond - lastDateMillisecond) / (1000 * 60 * 60 * 24)));
};
/* OPT-22311 END */

/* OPT-30395 START */
Insider.__external.sendCustomGoal = function (builderId, goalId) {
    var goalOfCamp = Insider.goalBuilder.getGoalBuildersByBuilderId(builderId)[goalId];

    if (typeof goalOfCamp === 'undefined') {
        return false;
    }

    goalOfCamp.goalList[0]['selectorString'] = 'true;';
    Insider.goalBuilder.addGoalTracking();
};
/* OPT-30395 END */

Insider.__external.setCampaignLocation = function (builderId, selectedElement, insertAction) {
    'use strict';

    var variationId = Insider.campaign.userSegment.segments[builderId];

    if (!variationId) {
        return false;
    }

    var campaign = Insider.campaign.get(variationId);

    if (selectedElement) {
        campaign.pageSettings.locationConfig.selectedElement = selectedElement;
    }

    if (insertAction) {
        campaign.pageSettings.locationConfig.insertAction = insertAction;
    }

    return true;
};

/* OPT-33105 START */
(function allRecommenderPurchaseGAEvent(self) {
    'use strict';

    var taskId = 'OPT-33105';
    var clickPattern = 'click.ins' + taskId;
    var storageName = 'ins-recommender-clicked-products-' + taskId;
    var defaultMainSelector = Insider.browser.isMobile() ? '.ins-mobile-web-smart-recommender-body-wrapper' :
        '.ins-web-smart-recommender-body-wrapper';
    var defaultRecommenderBoxItemSelector = Insider.browser.isMobile() ? '.ins-mobile-web-smart-recommender-box-item' :
        '.ins-web-smart-recommender-box-item';
    var defaultClickSelector = defaultMainSelector + ' a.ins-product-box.ins-element-link,' + defaultMainSelector +
        ' ._buy';
    var sessionStorageName = 'ins-is-user-visited-33111';
    var lastClickedStorageName = 'ins-last-clicked-recommender-33111';

    self.init = function () {
        self.createLastClickedRecommenderStorage();
        self.setDefaultRecommenderClickEvent();
        self.sendGAEventForSuccessPage();
        self.sendGAEventForProductPage();
    };

    /* OPT-33111 Start */
    self.createLastClickedRecommenderStorage = function () {
        if (Insider.storage.session.get(sessionStorageName) === null &&
            Insider.storage.localStorage.get(lastClickedStorageName) !== null) {
            var lastClickedRecommenderBuilderId = Insider.storage.localStorage.get(lastClickedStorageName);

            Insider.storage.localStorage.remove(lastClickedStorageName);

            self.sendGALastClickedRecommender(lastClickedRecommenderBuilderId);

            var lastCustomGoals = {
                75: 20,
                44: 21,
                43: 22,
                39: 23,
                33: 24,
                210: 25,
                172: 26,
                86: 27,
                74: 28,
                73: 29,
                70: 30,
                69: 31
            };

            Insider.__external.sendCustomGoal(lastClickedRecommenderBuilderId,
                lastCustomGoals[lastClickedRecommenderBuilderId]);
        }

        setTimeout(function () {
            if (Insider.storage.session.get(sessionStorageName) === null) {
                Insider.storage.session.set({
                    name: sessionStorageName,
                    value: true,
                    expires: 7
                });
            }
        }, 2000);
    };
    /* OPT-33111 End */

    self.setDefaultRecommenderClickEvent = function () {
        Insider.eventManager.off(clickPattern, defaultClickSelector).on(clickPattern, defaultClickSelector,
            function () {
                var currentProduct = Insider.dom(this);
                var recommenderMainWrapper = currentProduct.closest('[class*=ins-preview-wrapper-]');
                var productId = currentProduct.closest(defaultRecommenderBoxItemSelector).find('[ins-product-id]')
                    .attr('ins-product-id') || '';
                var variationId = '';

                (recommenderMainWrapper.prop('classList') || []).forEach(function (className) {
                    if (className.indexOf('ins-preview-wrapper-') > -1) {
                        variationId = className.replace(/.*-/g, '');

                        return true;
                    }
                });

                var builderId = Insider.campaign.getBuilderIdByVariationId(variationId);

                if (builderId && productId) {
                    self.saveStorage(productId, builderId);

                    /* OPT-33111 Start */
                    if (Insider.storage.session.get(sessionStorageName) === true) {
                        var lastBuilderId = (((Insider.storage.localStorage.get(storageName) || []).slice(-1)[0] || {})
                            .builderId || '');

                        Insider.storage.localStorage.set({
                            name: lastClickedStorageName,
                            value: lastBuilderId,
                            expires: 7
                        });
                    }
                    /* OPT-33111 End */

                    /* OPT-33107 Start */
                    if (!Insider.storage.localStorage.get('ins-is-custom-goal-send-33107')) {
                        self.sendFirstClickedRecommender();

                        var firstCustomGoals = {
                            209: 6,
                            171: 7,
                            75: 8,
                            44: 9,
                            43: 10,
                            39: 11,
                            33: 12,
                            210: 13,
                            172: 14,
                            86: 15,
                            74: 16,
                            73: 17,
                            70: 18,
                            69: 19
                        };

                        Insider.__external.sendCustomGoal(builderId, firstCustomGoals[builderId]);
                    }
                    /* OPT-33107 End */
                }
            });
    };

    self.saveStorage = function (productId, builderId) {
        var smartRecommenderProductInfo = Insider.storage.get(storageName) || [];

        smartRecommenderProductInfo.push({
            productId: productId,
            builderId: builderId
        });

        Insider.storage.set({
            name: storageName,
            value: smartRecommenderProductInfo,
            expires: 7
        });
    };

    /* OPT-33107 Start */
    self.sendFirstClickedRecommender = function () {
        var firstClickedBuilderId = (((Insider.storage.localStorage.get(storageName) || [])[0] || {}).builderId || '');

        Insider.storage.localStorage.set({
            name: 'ins-is-custom-goal-send-33107',
            value: true,
            expires: 7
        });

        var sendRecommenderDataToGA = {
            smartRecommenderBuilderId: firstClickedBuilderId,
            productEventName: ' - First-Clicked-Reco',
            smartRecommenderProductId: '',
            orderEventName: '',
            smartRecommenderOrderId: '',
        };

        self.setGaEvent(sendRecommenderDataToGA);
    };
    /* OPT-33107 End */

    self.setGaEvent = function (smartRecommenderData) {
        if (typeof ga !== 'function') {
            return false;
        }

        var trackerName = ga.getAll()[0].get('name');
        var eventAction =
            Insider.campaign.decryptCampaignName(Insider.campaign.get(Insider.campaign.userSegment
                .getActiveVariationByBuilderId(smartRecommenderData.smartRecommenderBuilderId)).campName) +
            smartRecommenderData.productEventName + smartRecommenderData.smartRecommenderProductId +
            smartRecommenderData.orderEventName + smartRecommenderData.smartRecommenderOrderId; /* OPT-42825 End */

        ga(trackerName + '.send', {
            hitType: 'event',
            eventCategory: 'INSIDER',
            eventAction: eventAction,
            eventLabel: '(builder ID: ' + smartRecommenderData.smartRecommenderBuilderId + ')',
            nonInteraction: !!spApi.gaNonInteraction
        });

        return true;
    };

    /* OPT-33111 Start */
    self.sendGALastClickedRecommender = function (lastBuilderId) {
        /* OPT-42825 Start */
        var sendRecommenderDataToGA = {
            smartRecommenderBuilderId: lastBuilderId,
            productEventName: ' - Last-Clicked-Recommender',
            smartRecommenderProductId: '',
            orderEventName: '',
            smartRecommenderOrderId: '',
        };

        self.setGaEvent(sendRecommenderDataToGA);
        /* OPT-42825 End */
    };
    /* OPT-33111 End */

    self.sendGAEventForSuccessPage = function () {
        if (Insider.systemRules.call('isOnAfterPaymentPage')) {
            setTimeout(function () {
                /* OPT-44819 Start */
                var paidProducts = Insider.storage.localStorage.get('paid-products') || [];
                var smartRecommenderProductInfo = Insider.storage.localStorage.get(storageName) || [];
                /* OPT-44819 End */
                var orderID = ((Insider.utils.getDataFromDataLayer('ecommerce').purchase || {})
                    .actionField || {}).id || ''; /* OPT-42825 */

                paidProducts.map(function (product) {
                    smartRecommenderProductInfo.some(function (smartProduct) {
                        if (product.id === smartProduct.productId) {
                            /* OPT-42825 Start */
                            var sendRecommenderDataToGA = {
                                smartRecommenderBuilderId: smartProduct.builderId,
                                productEventName: ' - RecoEngineSales - Product - ',
                                smartRecommenderProductId: smartProduct.productId,
                                orderEventName: ' - OrderID - ',
                                smartRecommenderOrderId: orderID
                            };

                            self.setGaEvent(sendRecommenderDataToGA);
                            /* OPT-42825 End */
                        }
                    });
                });

                Insider.storage.set({
                    name: storageName,
                    value: []
                });
            }, 2000);
        }
    };

    /* OPT-33113 Start */
    self.sendGAEventForProductPage = function () {
        if (Insider.systemRules.call('isOnProductPage')) {
            Insider.eventManager.off('click.add:to:cart:click', '.product-main-content__info-button-buy')
                .on('click.add:to:cart:click', '.product-main-content__info-button-buy', function () {
                    setTimeout(function () {
                        var recommenderInfo = Insider.storage.localStorage.get(storageName) || '[]';
                        var cartProductList = (Insider.storage.localStorage.get('ins-cart-product-list') || {})
                            .productList;

                        recommenderInfo.some(function (recommenderData) {
                            if (Insider.systemRules.call('getCurrentProduct').id === recommenderData.productId) {
                                var matchedBuilderId = recommenderData.builderId;
                                var clickedProductCustomGoals = {
                                    209: 32,
                                    171: 33,
                                    75: 34,
                                    44: 35,
                                    43: 36,
                                    39: 37,
                                    33: 38,
                                    210: 39,
                                    172: 40,
                                    86: 41,
                                    74: 42,
                                    73: 43,
                                    70: 44,
                                    69: 45
                                };

                                cartProductList.some(function (cartListProduct) {
                                    if (Insider.systemRules.call('getCurrentProduct').id === cartListProduct.id &&
                                        !window.sessionStorage.getItem('ins-send-custom-goal-' + recommenderData.productId)) {
                                        /* OPT-42825 Start */
                                        var sendRecommenderDataToGA = {
                                            smartRecommenderBuilderId: recommenderData.builderId,
                                            productEventName: ' - RecommenderProductAddedCart - Product - ',
                                            smartRecommenderProductId: recommenderData.productId,
                                            orderEventName: '',
                                            smartRecommenderOrderId: '',
                                        };

                                        self.setGaEvent(sendRecommenderDataToGA);
                                        /* OPT-42825 End */

                                        Insider.__external.sendCustomGoal(matchedBuilderId,
                                            clickedProductCustomGoals[matchedBuilderId]);

                                        window.sessionStorage.setItem('ins-send-custom-goal-' +
                                            recommenderData.productId, true);
                                    }
                                });
                            }
                        });
                    }, 2000);
                });
        }
    };
    /* OPT-33113 End */

    self.init();
})({});
/* OPT-33105 End */

/* OPT-54409 Start */
Insider.__external.sendCustomGoalv2 = function (builderId, goalId, checkGoalExistence) {
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
/* OPT-54409 End */
/* OPT-54459 START */
(function (self) {
    var excludeCampaignVariationIds = ['c33', 'c35'];
    var exludeCampaignIsActive = false;
    var dekstopVariationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(727);
    var mobileVariationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(728);

    self.init = function () {
        self.preventiveCampaignsAreActive();
        self.preventCampaignsToShow();
        self.showExcludeCampaign();
    };

    self.preventiveCampaignsAreActive = function () {
        if (dekstopVariationId === 'c33' || mobileVariationId === 'c35') {
            exludeCampaignIsActive = excludeCampaignVariationIds.some(function (variationId) {
                return eval(Insider.rules[((Insider.campaign.custom.get(variationId).showIn || {})
                    .trigger || [])[0] || {}].test || false);
            });
        }
    };

    self.preventCampaignsToShow = function () {
        if (exludeCampaignIsActive) {
            Insider.__external.preventedCampaignVariationIds = [];

            Insider.campaign.all.forEach(function (campaign) {
                if (excludeCampaignVariationIds.indexOf(campaign.id) === -1) {
                    if (!campaign.showIn.segment) {
                        campaign.showIn.segment = [1];
                    }

                    if (!campaign.showIn.trigger) {
                        campaign.showIn.trigger = [1];
                    }

                    var rulesString = Insider.rules[campaign.showIn.segment[0]].test;
                    var editedSegment = rulesString.substr(0, rulesString.length) + '&& true===false';
                    var rulesTrigger = Insider.rules[campaign.showIn.trigger[0]].test;
                    var editedTrigger = 'true===false ' + rulesTrigger.substr(rulesTrigger.length);

                    Insider.rules[campaign.showIn.segment[0]].test = editedSegment;
                    Insider.rules[campaign.showIn.trigger[0]].test = editedTrigger;

                    Insider.__external.preventedCampaignVariationIds.push(campaign.id);
                }
            });

            Insider.__external.preventiveCampaingIsActive = true;
        }
    };

    self.showExcludeCampaign = function () {
        if (exludeCampaignIsActive) {
            Insider.campaign.custom.show((Insider.browser.isMobile() ? mobileVariationId : dekstopVariationId));
        }
    };

    self.init();
})({});
/* OPT-54459 END */

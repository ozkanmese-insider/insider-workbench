/* OPT-29740 START */
(function (self) {
    self.init = function () {
        var tabNames = ['telefonlar', 'tabletler', 'aksesuarlar', 'akilli ev urunleri', 'vodagraf'];

        Insider.__external.productDetails = [];
        Insider.__external.reInitThreshold29740 = 0;

        tabNames.forEach(function (tabName, tabId) {
            var storageName = 'ins-product-list-' + tabId;

            if (Insider.storage.get(storageName) === null &&
                Insider.storage.get('ins-product-list-request-retry') === null) {
                self.getDeviceList(tabId, storageName);
            }

            Insider.__external.productDetails = Insider.fns.assign(Insider.__external.productDetails,
                Insider.storage.get(storageName) || []);
        });

        if (Insider.fns.hasParameter('/telefonlar/p') && Insider.dom('.products__stage').exists()) {
            self.setCurrentProductDetails();
        }
    };

    self.getDeviceList = function (tabId, storageName) {
        var data = {
            AUTHENTICATION_CODE: null,
            CONTENT: {
                searchText: '',
                sortParameter: ''
            },
            VERSION: '1.0.3',
            LANG: 0,
            OPERATION_TYPE: 1
        };

        data.CONTENT.TAB_ID = tabId;

        var settings = {
            url: 'https://eshpjetfire.vodafone.com.tr/restapi/api/GetAllDevices',
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (response) {
                var deviceList = ((Insider.fns.parse(response.body) || {}).getDeviceListResult || {})
                    .deviceList || [];

                Insider.storage.set({
                    name: storageName,
                    value: deviceList
                });

                Insider.__external.reInitThreshold29740++;

                self.checkInitCondition();
            },
            error: function () {
                Insider.storage.set({
                    name: 'ins-product-list-request-retry',
                    value: true,
                    expires: 1 / 6
                });
            }
        };

        Insider.request.post(settings);
    };

    self.checkInitCondition = function () {
        if (Insider.fns.hasParameter('/telefonlar') && Insider.__external.reInitThreshold29740 === 5) {
            Insider.__external.reInitThreshold29740 === undefined;

            setTimeout(function () {
                Insider.logger.log('API Init triggered for product details data');

                Insider.eventManager.dispatch('init-manager:re-initialize');
            }, 200);
        }
    };

    self.setCurrentProductDetails = function () {
        var productName = Insider.dom('span.breadcrumbs__crumb').text(); /* OPT-43343 START-END */

        Insider.__external.currentProduct = Insider.__external.productDetails.filter(function (device) {
            return (device.brand + ' ' + device.name).toLowerCase() === productName.toLowerCase(); /* OPT-36651 START-END */
        })[0] || {};
    };

    self.init();
})({});

/* OPT-29740 END */

/* OPT-27231 START */
(function (self) {
    self.storageName = 'ins-custom-hit-status';
    self.tariffPages = [
        '/numara-tasima-yeni-hat/tarifeler',
        '/Tarifeler/tarifeler.php',
        '/Red/anasayfa.php',
        '/freezone',
        '/Red/red-dijital-ayricaliklari.php',
        '/Tarifeler/uyumlu-tarifeler.php'
    ];

    self.init = function () {
        self.tariffPages.forEach(function (pageName) {
            if (Insider.fns.hasParameter(pageName)) {
                self.isOnCustomHitPages = true;
            }
        });

        if (self.isOnCustomHitPages) {
            self.setEvents();
        }

        if (Insider.storage.get(self.storageName) === true) {
            setTimeout(function () {
                Insider.storage.set({
                    name: self.storageName,
                    value: false
                });

                self.sendHitRequest();
            }, 1500);
        }
    };

    self.setEvents = function () {
        var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        var eventName = (iOS ? 'touchstart' : 'click') + '.insCustomHitRequest';
        var submitSelector = '.tariff-card-action, .bundle__select, .bundle__select--first';

        Insider.eventManager.once(eventName, submitSelector, function () {
            Insider.storage.set({
                name: self.storageName,
                value: true
            });
        });
    };

    self.sendHitRequest = function () {
        var hitPayload = JSON.stringify(self.populatePayload());

        Insider.request.post({
            url: 'https://hit.api.useinsider.com/hit',
            data: Insider.fns.encode(hitPayload)
        });

        Insider.logger.log('Tariff HIT Details: ' + hitPayload, 2);
    };

    self.populatePayload = function () {
        var selectedTariff = Insider.storage.session.get('selectedTariff') || {};
        var userLocation = Insider.storage.get('userLocation', undefined, true);
        var currency = Insider.systemRules.call('getCurrency');
        var payload = {
            version: '1.0',
            partner_name: Insider.partner.name,
            user_id: Insider.getUserId(),
            event: 'pageView',
            init_session: false,
            session_id: Insider.getUserSession(),
            date: Insider.dateHelper.now(),
            referrer: document.referrer,
            source: Insider.session.getSessionSource() || window.location.host,
            current_url: window.location.href,
            cart_amount: 0,
            page_type: 'productDetail',
            language: Insider.systemRules.call('getLang'),
            locale: 'tr_TR',
            request_hash: self.generateRequestHash(),
            city: userLocation.city,
            country: userLocation.country
        };

        payload.product = {
            id: encodeURIComponent(selectedTariff.id || ''),
            imgUrl: 'https://image.useinsider.com/vodafone/c46/vpSLn531pNQEzLtL0kPx1560363683.jpg',
            name: selectedTariff.name || '',
            price: {
                value: selectedTariff.priceWithContract || 0,
                currency: currency,
                originalValue: selectedTariff.priceWithContract || 0
            },
            displayedPrice: {
                value: selectedTariff.priceWithNoContract || 0,
                currency: currency,
                originalValue: selectedTariff.priceWithNoContract || 0
            },
            quantity: 1,
            category: [(selectedTariff.tariffType || 'Faturali') + ' Tarife'],
            url: 'https://www.vodafone.com.tr/Tarifeler/tarife-al.php',
            productAttributes: self.generateProductAttributes(selectedTariff),
            custom_score: selectedTariff.offlineScore || 0.00
        };

        return payload;
    };

    self.generateRequestHash = function () {
        return Insider.dateHelper.now().toString() + (Insider.fns.random(2) + Insider.fns.random(2)).substr(0, 10);
    };

    self.generateProductAttributes = function (selectedTariff) {
        var selected = {
            price: selectedTariff.priceWithContract || 0,
            gb: selectedTariff.internet || 0,
            minute: selectedTariff.minute || 0
        };
        var range = {
            price: {
                0: '29-49 TL',
                49: '49-69 TL',
                69: '69-125 TL'
            },
            gb: {
                0: '1-5 GB',
                5: '5-10 GB',
                10: '10-20 GB',
                20: '20+ GB'
            },
            minute: {
                0: '0-500 DK',
                500: '500-1000 DK',
                1000: '1000DK+'
            }
        };
        var productAttributes = self.roundVariables(selected, range);

        return {
            tarife_tl: productAttributes.price,
            tarife_gb: productAttributes.gb,
            tarife_dk: productAttributes.minute,
            tarife_type: selectedTariff.tariffType || ''
        };
    };

    self.roundVariables = function (selected, range) {
        var roundedVariables = {};

        Object.keys(selected).forEach(function (selectedAttribute) {
            Object.keys(range[selectedAttribute]).forEach(function (rangeItem) {
                if (selected[selectedAttribute] > rangeItem) {
                    roundedVariables[selectedAttribute] = range[selectedAttribute][rangeItem];
                }
            });
        });

        return roundedVariables;
    };

    self.init();
})({});
/* OPT-27231 END */

spApi.listenAjaxRequest = function (callback) {
    var originalOpenFunction = XMLHttpRequest.prototype.open;

    XMLHttpRequest.prototype.open = function (method, url) {
        originalOpenFunction.apply(this, arguments);

        this.addEventListener('readystatechange', function () {
            if (this.readyState === 4 && this.status === 200 &&
                typeof callback === 'function') {
                try {
                    callback(url, this.response, method);
                } catch (error) {
                    spApi.conLog('Something is crashed, Event:' + error);
                }
            }
        });
    };
};

/* OPT-14816 - START */
spApi.sendGoalOnPhoneTransferOrHouseInternet = function (phoneTransferBID, phoneTransferHalfGoalID,
    phoneTransferFullGoalID, houseInternetBID, houseInternetHalfGoalId, houseInternetFullGoalId) {
    'use strict';

    var self = this;

    self.initGoalOnRegistrationPage = function () {
        self.setEventsOnRegistrationPage();
    };

    self.setEventsOnRegistrationPage = function () {
        spApi.listenAjaxRequest(function (url, _, method) {
            if (url.indexOf('/clicktodoor-api/api/v1/controlOtpSms') > -1 && method === 'POST' &&
                typeof phoneTransferHalfGoalID !== 'undefined' && phoneTransferHalfGoalID !== null) {
                spApi.sendCustomGoal(phoneTransferBID, phoneTransferHalfGoalID);
            } else if (url.indexOf('/api/v1/candidate/completed/') > -1 &&
                typeof phoneTransferFullGoalID !== 'undefined' && phoneTransferFullGoalID !== null) {
                spApi.sendCustomGoal(phoneTransferBID, phoneTransferFullGoalID);
            }

            if (url.indexOf('evdeinternet.vodafone.com.tr/fixedonlineapi/api/v1/getAddonList') > -1 &&
                method === 'GET' && typeof houseInternetHalfGoalId !== 'undefined' && houseInternetHalfGoalId !== null) {
                spApi.sendCustomGoal(houseInternetBID, houseInternetHalfGoalId);
            } else if (url.indexOf('evdeinternet.vodafone.com.tr/fixedonlineapi/api/v1/updatePersonalInfo/') > -1 &&
                method === 'POST' && typeof houseInternetFullGoalId !== 'undefined' && houseInternetFullGoalId !== null) {
                spApi.sendCustomGoal(houseInternetBID, houseInternetFullGoalId);
            }
        });
    };

    self.initGoalOnRegistrationPage();
};
/* OPT-14816 - END */

/* OPT-31172 START */
Insider.__external.sendClickCustomGoal = function (builderId, goalId) {
    var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);
    var goalClass = Insider.goalBuilder.createLogClass({
        builderId: builderId,
        variationId: variationId,
        goalId: goalId,
        subId: Insider.dateHelper.getTime()
    });

    Insider.dom('body').append(Insider.dom('<button>').addClass(goalClass).css('display', 'none'));

    Insider.dom('.' + goalClass).trigger('click').remove();
};

spApi.newSendCustomGoal = function (builderId, goalId) {
    return Insider.__external.sendClickCustomGoal(builderId, goalId);
};
/* OPT-31172 END */

/* QH START */
spApi.triggerActionConversionPush = function (pushId, action) {
    sQuery('#spWorker').pm(function (data) {
        var insdrSubsId = sQuery.cookie('insdrSubsId');

        if (insdrSubsId !== null) {
            /* OPT-22035 Start-End */
            sQuery(window).pm(function (conversionConfig) {
                var userData = {
                    insdrSubsId: conversionConfig.insdrSubsId,
                    spUID: spApi.storageData('spUID')
                };

                spApi.activeConversionPushes.reset = [];
                spApi.activeConversionPushes.set = [];
                spApi.activeConversionPushes.update = [];

                if (conversionConfig.action === 'set') {
                    spApi.activeConversionPushes.set.push(spApi.webPushes[conversionConfig.pushId]);
                } else if (conversionConfig.action === 'reset') {
                    spApi.activeConversionPushes.reset.push(spApi.webPushes[conversionConfig.pushId]);
                }

                spApi.setConversionPushes(userData);
            }, undefined, {
                insdrSubsId: insdrSubsId,
                pushId: data.pushId,
                action: data.action
            });
        }
    }, undefined, {
        pushId: pushId,
        action: action
    });
};
/* QH END */

/* OPT-27622 Start */
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

spApi.sendCustomGoal = function (builderId, goalId) {
    return Insider.__external.sendCustomGoal(builderId, goalId);
};
/* OPT-27622 End */

/* OPT-30500 START */
Insider.eventManager.once('log:sent.ins:adobe:log:tracker', function (event) {
    if (typeof window.s === 'object' && typeof window.s.t === 'function' &&
        typeof s.clearVars === 'function' && /* OPT-35717 */
        typeof event === 'object' && typeof event.detail === 'object' && event.detail.campId &&
        (event.detail.type === 'impression' || event.detail.type === 'join' || event.detail.type === 'close')) {
        var eventVariationId = event.detail.campId;
        var builderId = Insider.campaign.getBuilderIdByVariationId(eventVariationId);
        var variationRatio = ((Insider.campaign.getVariationsByBuilderId(builderId) || []).filter(function (camp) {
            return camp.variationId === eventVariationId;
        })[0] || {}).ratio || '';
        var eventAction = Insider.campaign.decryptCampaignName(Insider.campaign.get(eventVariationId).campName) +
            '-' + event.detail.type + '-' + Insider.campaign.get(eventVariationId).productAlias;
        var eventLabel = '(builder ID: ' + builderId + ' - Variation Ratio: ' + variationRatio + '%';

        s.clearVars();
        s.events = 'event60:INSIDER';
        s.eVar60 = 'INSIDER';
        s.eVar61 = eventAction;
        s.eVar62 = eventLabel;
        s.eVar63 = 10;
        /* OPT-32773 START */
        s.linkTrackVars = 'eVar60,eVar61,eVar62,eVar63';
        s.linkTrackEvents = 'event60';
        s.tl(this, 'o', 'Insider Actions');
        /* OPT-32773 END */
      	/* OPT-51068 s.t() removed. approve edicek kişi bu satırı silebilirse memnun olurum */
    }
});

/* OPT-36510 Start */
Insider.__external.ajaxComplete = function (callback) {
    'use strict';

    var originalOpenFunction = XMLHttpRequest.prototype.open;

    XMLHttpRequest.prototype.open = function (method, url) {
        originalOpenFunction.apply(this, arguments);

        this.addEventListener('readystatechange', function () {
            if (this.responseType !== 'blob' && this.responseType !== 'arraybuffer' && Number(this.readyState) === 4 &&
                Number(this.status) === 200 && typeof callback === 'function') {
                callback(url, method, this.responseText);
            }
        });
    };
};
/* OPT-36510 End */

/* OPT-51807 STARTS */
Insider.__external.userAttributeModification51807 = function (config) {
    var self = {};
    var vodafoneIsCompletedStorage = 'ins-isCompleted-attribute-OPT-51807';
    var currentTime = new Date().getTime();
    var vodafoneIsCompleted = Insider.storage.get(vodafoneIsCompletedStorage) || {
        mgmIncomplete: false,
        redIncomplete: false,
        youthIncomplete: false,
        mgmTimestamp: 0,
        redTimestamp: 0,
        youthTimestamp: 0
    };

    self.init = function () {
        self.checkCompleted();

        return vodafoneIsCompleted[config.attributeName];
    };

    self.checkCompleted = function () {
        if (Insider.fns.parseURL().pathname.indexOf(config.isVisitedURLPathname) > -1 &&
                (vodafoneIsCompleted[config.timestamp] === 0 ||
                    Insider.dateHelper.daysPastUntilNow(vodafoneIsCompleted[config.timestamp]) >= 360)) {
            vodafoneIsCompleted[config.attributeName] = true;
            vodafoneIsCompleted[config.timestamp] = currentTime;

            self.updateStorage(vodafoneIsCompletedStorage, vodafoneIsCompleted);
        }

        if (Insider.fns.parseURL().pathname.indexOf(config.isCompletedURLPathname) > -1) {
            vodafoneIsCompleted[config.attributeName] = false;

            self.updateStorage(vodafoneIsCompletedStorage, vodafoneIsCompleted);
        }
    };

    self.updateStorage = function (storageName, data) {
        Insider.storage.update({
            name: storageName,
            value: data
        });
    };

    return self.init();
};

(function (self) {
    var vodafoneVisitorStorage = 'ins-visitors-url-attribute-OPT-51807';
    var isVisitedArray = [
        'evde-internet',
        'fiber-internet',
        'adsl-internet',
        'vodafone-evde-redbox-kampanyasi',
        'evde-internet-adsl-fiber-basvuru',
        'sabit-hizmetler',
        'dsl-fiber-paketleri'
    ];
    var vodafoneVisitorData = Insider.storage.get(vodafoneVisitorStorage) || {
        visitedArray: []
    };
    var visitedURLPathname = Insider.fns.parseURL().pathname || '';
    var vodafoneVisitedURLName = visitedURLPathname.split('/');

    vodafoneVisitedURLName = (vodafoneVisitedURLName[vodafoneVisitedURLName.length - 1] || '') ||
        (vodafoneVisitedURLName[vodafoneVisitedURLName.length - 2] || '') || '';

    self.init = function () {
        self.checkParameter();
    };

    self.checkParameter = function () {
        isVisitedArray.forEach(function (visitedURL) {
            if (visitedURLPathname.indexOf(visitedURL) > -1 && visitedURLPathname.indexOf('home') > -1) {
                visitedURLPathname = visitedURLPathname.split('/');
                visitedURLPathname.indexOf('php') > -1 ? visitedURLPathname = visitedURLPathname.split('.')[0] :
                    visitedURLPathname;
                vodafoneVisitedURLName = (visitedURLPathname[visitedURLPathname.length - 2] || '') + '-' +
                    (visitedURLPathname[visitedURLPathname.length - 1] || '');

                self.checkValidity();
            } else if (visitedURLPathname.indexOf(visitedURL) > -1 && visitedURLPathname.indexOf('php') > -1) {
                vodafoneVisitedURLName = vodafoneVisitedURLName.split('.')[0];

                self.checkValidity();
            } else if (visitedURLPathname.indexOf(visitedURL) > -1 && visitedURLPathname.indexOf('php') === -1) {
                self.checkValidity();
            }
        });
    };

    self.checkValidity = function () {
        if (vodafoneVisitedURLName && !self.vodafoneIsDuplicated(vodafoneVisitedURLName)) {
            self.vodafoneSetStorage(vodafoneVisitorStorage, JSON.stringify(vodafoneVisitorData));
        }
    };

    self.vodafoneIsDuplicated = function (data) {
        if (vodafoneVisitorData.visitedArray.indexOf(data) > -1) {
            return true;
        }

        vodafoneVisitorData.visitedArray.push(data);

        return false;
    };

    self.vodafoneSetStorage = function (name, value) {
        Insider.storage.set({
            name: name,
            value: value
        });
    };

    self.init();
})({});
/* OPT-51807 ENDS */
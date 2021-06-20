/*OPT-27911 START*/
Insider.__external.triggerActionConversionPush = function (pushId, action) {
    Insider.worker.pm({
        type: 'getPushStorageData',
        success: function (data) {
            var conversionPush = new Insider.webPush.ConversionPush();

            conversionPush.action = function () {
                return action;
            };
            conversionPush.push = conversionPush.getPushById(pushId);
            conversionPush.pushStorageData = data;
            conversionPush.send();
        }
    });
};
/* OPT-27911 END */

/* SRTR-3960 START */
(function () {
    clearInterval(window.insIntervalSRTR5025);
    clearTimeout(window.insTimeoutSRTR5025);

    window.insTimeoutSRTR5025 = null;
    window.insIntervalSRTR5025 = null;
    var clickPattern = 'click.insSRTR3960';

    function customReInit() {
        clearTimeout(window.insTimeoutSRTR5025);

        window.insTimeoutSRTR5025 = setTimeout(function () {
            Insider.boot();
        }, 1500);
    }

    function checkAndDo(count) {
        clearInterval(window.insIntervalSRTR5025);

        window.insIntervalSRTR5025 = setInterval(function () {
            if (!Insider.dom('#popCheckout:visible').exists() || Insider.dom('#popDone:visible').exists()) {
                customReInit();

                clearInterval(window.insIntervalSRTR5025);
            }

            count-- || clearInterval(window.insIntervalSRTR5025);
        }, 1000);
    }

    setTimeout(function () {
        Insider.eventManager
            .off(clickPattern, '#popCheckout .n_pay_bu')
            .on(clickPattern, '#popCheckout .n_pay_bu', function () {
                checkAndDo(10);
            });

        Insider.eventManager
            .off(clickPattern, '#popBasket .footer_button button, aside .menu_button')
            .on(clickPattern, '#popBasket .footer_button button, aside .menu_button', function () {
                setTimeout(function () {
                    if (Insider.systemRules.call('isOnCartPage')) {
                        customReInit();
                    }
                }, 500);
            });

        Insider.eventManager
            .off(clickPattern, '#recommend_open .btn_close.pop_close , #popCheckout ' +
                '.btn_close.pop_close:first, #popCheckout ' + 'footer_button button')
            .on(clickPattern, '#recommend_open .btn_close.pop_close , #popCheckout ' +
                '.btn_close.pop_close:first, #popCheckout ' + 'footer_button button',
            function () {
                customReInit();
            });
    }, 2000);

    var clickSelector1 = '#recommend_open .btn_order_cart,' + ' .nav-tabs li:not(:has(ul)), #poplogin .n_order_bu, ' +
        'li:has(.nav-link)';

    Insider.eventManager.off(clickPattern, clickSelector1).on(clickPattern, clickSelector1, customReInit);

    var clickSelector2 = '#popRecomm .footer_button button, #popBasket article .footer_button button';

    Insider.eventManager.off(clickPattern, clickSelector2).on(clickPattern, clickSelector2, function () {
        if (Insider.dom('#popMinimumPriceByRecomm:visible').exists() || Insider.dom('#m_popMinimumPrice:visible').exists()) {
            Insider.eventManager
                .off(clickPattern, '#popMinimumPriceByRecomm .n_order_bu, #m_popMinimumPrice .n_order_bu')
                .on(clickPattern, '#popMinimumPriceByRecomm .n_order_bu, #m_popMinimumPrice .n_order_bu', customReInit);
        } else if (!Insider.browser.isMobile()) {
            customReInit();
        }
    });
})();
/* SRTR-3960 END */
Insider.__external.ajaxComplete = function (callback) {
    var originalOpenFunction = XMLHttpRequest.prototype.open;

    XMLHttpRequest.prototype.open = function (method, url) {
        originalOpenFunction.apply(this, arguments);

        this.addEventListener('readystatechange', function () {
            if (Number(this.readyState) === 4 && (Number(this.status) === 201 || Number(this.status) === 200) &&
                typeof callback === 'function') {
                callback(url, method, this.responseText);
            }
        });
    };
};
spApi.sendCustomGoal = function (builderId, goalId) {
    var variationId = spApi.userSegments[builderId];
    var goalClass = spApi.generateGoalClass({
        builderId: builderId,
        variationId: variationId,
        goalId: goalId,
        subId: new Date().getTime()
    });

    sQuery('body').append(sQuery('<button>', {
        class: goalClass,
        style: 'display:none'
    }));

    /* OPT-27940 Start */
    var dummyElement = sQuery('.' + goalClass);

    dummyElement.trigger('click');
    dummyElement.remove();
    /* OPT-27940 End */
};

/* OPT-31530 Start */
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
/* OPT-31530 End */
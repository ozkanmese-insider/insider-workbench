/* OPT-62478 START */
(function (self) {
    var builderId = Insider.browser.isMobile() ? 117 : 116;
    var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);
    var className = 'ins-icon-resize-' + variationId;
    var partnerClassName = '.productBtn';

    self.init = function () {

        if (!Insider.campaign.isControlGroup(variationId) && Insider.systemRules.call('isOnCategoryPage')) {
            self.reset();
            self.addClass();
        }

        self.setEvents();
    };

    self.reset = function () {
        Insider.dom(partnerClassName).removeClass(className);
    };

    self.addClass = function () {
        Insider.dom(partnerClassName).addClass(className);

        Insider.__external.ajaxListener(function (url, method, response) {
            if (url.indexOf('/loader?hazir-yemek') > -1) {
                Insider.dom(partnerClassName).addClass(className);
            }
        });
    };

    self.setEvents = function () {
        Insider.eventManager.once('click.basket:button:' + variationId, '.basketBtn', function () {
            Insider.__external.sendCustomGoal(builderId, 68, false);
        });
        Insider.eventManager.once('click.favourite:button:' + variationId, '.favouriteBtn', function () {
            Insider.__external.sendCustomGoal(builderId, 67, false);
        });
    };

    self.init();
})({});
true;
/* OPT-62478  END */








/* OPT-62549 START */
var notificationCenterSelector = '.ins-preview-wrapper.ins-preview-wrapper-notification-center';

Insider.fns.onElementLoaded(notificationCenterSelector, function () {
    setTimeout(function () {
        if (Insider.systemRules.call('isUserLoggedIn')) {
            Insider.dom(notificationCenterSelector).insertAfter('.customer-welcome');
            Insider.dom('.ins-notification-content.ins-notification-content-notification-center').attr('style',
                'background-color: rgba(0, 0, 0, 0) !important; background-image: none !important;' +
                'border-width: 0px !important;border-style: none !important; display: block !important;' +
                'border-color: rgb(50, 50, 50) !important;border-radius: 0px !important;margin-left:4rem !important');
        }

    }, 900);
}).listen();
/* OPT-62549 END */





var initNotificationCenter = function () {
    var mainContainer = sQuery('.ins-notification-center-wrapper');
    var contentContainer = mainContainer.find('.ins-notification-center-content');
    var previewContainer = mainContainer.closest('.ins-preview-wrapper');
    var badgeElement = mainContainer.find('.ins-notification-center-button-count');

    sQuery('body').off('click.notificationCenter', '.ins-notification-center-button-img-wrapper')
        .on('click.notificationCenter', '.ins-notification-center-button-img-wrapper', function () {
            contentContainer.toggleClass('ins-notification-center-closed');
            badgeElement.hide();
        });

    if (camp.id !== 0) {
        if (!contentContainer.hasClass('ins-notification-center-closed')) {
            contentContainer.addClass('ins-notification-center-closed');
        }

        if (mainContainer.hasClass('ins-notification-center-content-rtl')) {
            mainContainer.removeClass('ins-notification-center-content-rtl');
        }
    }

    var rightToLeftLangList = [
        'ar_AE',
        'ar_AR',
        'ar_EG',
        'ar_ME',
        'ar_SA',
        'fa_FA',
        'ur_UR'
    ];

    if (rightToLeftLangList.indexOf(spApi.getLang()) > -1) {
        mainContainer.addClass('ins-notification-center-content-rtl');
        sQuery('.ins-notification-center-wrapper').attr('dir', 'ltr');
    }

    var positionToSelectedElement = function () {
        if (typeof camp.locationConfig.relativePosition.element !== 'undefined') {
            var selectedElement = sQuery(camp.locationConfig.relativePosition.element);

            if (!selectedElement.exists()) {
                return false;
            }

            previewContainer.css({
                position: 'absolute',
                left: selectedElement.offset().left + 'px',
                top: selectedElement.offset().top + 'px'
            });
        }
    };

    positionToSelectedElement();

    sQuery(window).off('resize.insFrameless').on('resize.insFrameless', function () {
        positionToSelectedElement();
    });
};

/* OPT-57749 START */
setTimeout (function () {
    initNotificationCenter();
}, 1250);

/*sQuery(document).on('framelessInited-notification-center', initNotificationCenter);*/
/* OPT-57749 END */

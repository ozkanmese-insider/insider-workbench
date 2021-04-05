<<<<<<< HEAD
/* OPT-56149 START */
var isMobile = Insider.browser.isMobile();
var builderId = isMobile ? 1564 : 1563;
var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);
var classes = {
    changeText: 'ins-change-text-' + variationId,
    changePadding: 'ins-change-padding-' + variationId,
    hide: 'ins-hide-' + variationId,
};
var partnerSelectors = isMobile ?
    {
        seeFaresButton: '.fare-and-services-flight-mobile-select-button:not(.disabled, .selected)',
        rateButton: '.fare-and-services-mobile-extra-item .bagagge-rate-container:visible',
        modal: '.left-section .modal-baggage-content'
    } :
    {
        seeFaresButton: '.fare-and-services-flight-select-button-wrapper .button:not(:disabled, .selected)',
        rateButton: '.fare-and-services-item a[ng-click*="showBaggageRates"]:visible',
        modal: '.bundle-fare-row .modal-baggage-content'
    };
var eventName = isMobile ? 'touchstart' : 'mousedown';
var isControlGroup = Insider.campaign.isControlGroup(variationId);
var goalId = isMobile ? 433 : 432;

var newRateButtonText = 'New Text';
var newPopupTitle = 'New Baggage Rates Destination';
var newPopupTexts = [
    {
        firstText: 'TEXT 1',
        secondText: 'TEXT 2'
    },
    {
        firstText: 'TEXT 3',
        secondText: 'TEXT 4'
    },
    {
        firstText: 'TEXT 5',
        secondText: 'TEXT 6'
    },
    {
        firstText: 'TEXT 7',
        secondText: 'TEXT 8'
    },
    {
        firstText: 'TEXT 9',
        secondText: 'TEXT 10'
    },
    {
        firstText: 'TEXT 11',
        secondText: 'TEXT 12'
    },
    {
        firstText: 'TEXT 13',
        secondText: 'TEXT 14'
    },
    {
        firstText: 'TEXT 15',
        secondText: 'TEXT 16'
    }
];

Insider.eventManager.once(eventName + '.show:campaign:' + variationId, partnerSelectors.seeFaresButton,
    function () {
        if (!isControlGroup) {
            var buttonCheckCount = 0;

            var buttonInterval = setInterval(function () {
                if (Insider.dom(partnerSelectors.rateButton).exists()) {
                    var targetElementSelector =  Insider.dom(partnerSelectors.rateButton + ' small').exists() ?
                        partnerSelectors.rateButton + ' small' : partnerSelectors.rateButton;

                    Insider.dom(targetElementSelector).text(newRateButtonText).addClass(classes.changeText);

                    clearInterval(buttonInterval);
                }

                buttonCheckCount++;

                if (buttonCheckCount > 10) {
                    clearInterval(buttonInterval);
                }
            }, 500);
        }

        Insider.campaign.custom.show(variationId);
    });

Insider.eventManager.once(eventName + '.change:text:' + variationId, partnerSelectors.rateButton,
    function () {
        if (!isControlGroup) {
            var $modal = Insider.dom(partnerSelectors.modal);
            var checkCount = 0;

            $modal.find('.modal-header > p').text(newPopupTitle).addClass(classes.changeText);

            var tableInterval = setInterval(function () {
                if ($modal.find('.modal-body table').exists()) {
                    var $row = $modal.find('.modal-body table tr:first').clone();
                         
                    $row.find('.baggage-rates-price-desc').text('new fisrt text')
                        .addClass(classes.changeText);
                    $row.find('.currency-text').text('nes second text')
                        .addClass(classes.changeText);
                    $row.find('.baggage-rates-price-text').addClass(classes.changePadding);
                    $row.find('.currency-value').addClass(classes.hide);

                    Insider.dom('.modal-body table tr:first').before($row);

                    clearInterval(tableInterval);
                }

                checkCount++;

                if (checkCount > 10) {
                    clearInterval(tableInterval);
                }
            }, 500);
        }

        Insider.__external.sendCustomGoal(builderId, goalId, true);
    });

false;
/* OPT-56149 END */
=======
/*OPT-55666 START*/
(function (self) {
    var isTradeInfoStorageName = 'ins-tradeInfo-55666';

    self.init = function () {
        self.setEvents();
    };

    self.setEvents = function () {
        var pageCaseSelector = '';

        if (Insider.systemRules.call('isOnCategoryPage')) {
            pageCaseSelector = '#area-and-community-menu-bottom > div:nth-child(7)';
        } else if (Insider.systemRules.call('isOnProductPage')) {
            pageCaseSelector = '#buyContentTrade div span:last';
        }

        Insider.eventManager.once('click.ins:searched:before:opt55666', '.pagination > li , ' + pageCaseSelector,
            function () {
                self.setStorage();
            });
    };

    self.setStorage = function () {
        Insider.storage.set({
            name: isTradeInfoStorageName,
            value: true,
            expires: 365
        });
    };

    self.init();
})({});
/*OPT-55666 END*/
>>>>>>> a6c0739c44599ef8d1e1bf4d13b61a7eab026a1a

/* OPT-59683 START */
(function (self) {
    var isMobile = Insider.browser.isMobile();
    var builderId = isMobile ? 3 : 2;
    var variationId = Insider.campaign.userSegment.segments[builderId];
    var isControlGroup = Insider.campaign.isControlGroup(variationId);
    var classes = {
        reviewWrapper: 'ins-review-wrapper-' + variationId,
        innerReviewWrapper: 'ins-inner-review-wrapper-' + variationId,
        faStar: 'fa fa-star ins-fa-star' + variationId,
        reviewTitle: 'ins-review-title-' + variationId,
        reviewContent: 'ins-review-content-' + variationId,
        reviewAuthorDate: 'ins-review-author-date-' + variationId,
        customRating: 'ins-custom-rating-' + variationId,
        style: 'ins-custom-style-' + variationId,
        defaultGoal: 'sp-custom-' + variationId
    };

    self.init = function () {
        setTimeout(function () {
            self.reset();
            self.checkFiveStarReviews();
        }, 250);
    };

    self.reset = function () {
        Insider.dom('.' + classes.reviewWrapper + ' ,.' + classes.style).remove();
    };

    self.checkFiveStarReviews = function () {
        Insider.dom('.review').nodes.some(function (review) {
            if (Number(Insider.dom('[itemprop="ratingValue"]', review).attr('content')) === 5) {
                if (!isControlGroup) {
                    var dateAndAuthor = Insider.dom('.review-author', review).text().trim().split(',');

                    var reviewData = {
                        reviewTitle: Insider.dom('.review-title', review).text(),
                        reviewContent: Insider.dom('.review-body > p', review).text(),
                        reviewAuthor: dateAndAuthor[0] || '',
                        reviewDate: dateAndAuthor[1] || ''
                    };

                    self.buildHTML(reviewData);
                    self.setCSS();
                }

                self.showCampaign();
                self.setEvents();

                return true;
            }
        });
    };

    self.buildHTML = function (reviewData) {
        var html = '<div class="' + classes.reviewWrapper + ' ' + classes.defaultGoal + '">' +
            '<div class="' + classes.innerReviewWrapper + '"></div>' +
            '<div class="rating ' + classes.customRating + '">' +
            '   <i class="' + classes.faStar + '"></i>' +
            '   <i class="' + classes.faStar + '"></i>' +
            '   <i class="' + classes.faStar + '"></i>' +
            '   <i class="' + classes.faStar + '"></i>' +
            '   <i class="' + classes.faStar + '"></i>' +
            '<div class="' + classes.reviewTitle + '">' + reviewData.reviewTitle + '</div>' +
            '</div>' +
            '<div class="' + classes.reviewContent + '">' + reviewData.reviewContent + '</div>' +
            '<div class="' + classes.reviewAuthorDate + '">' + reviewData.reviewDate + ', ' + reviewData.reviewAuthor + '</div>' +
            '</div>';

        Insider.dom('.product-shipment').before(html);
    };

    self.setCSS = function () {
        var css = '.' + classes.reviewWrapper + '{position: sticky;padding: 13px 29px 13px 29px;background: lightgray;margin-bottom: 13px;margin-top: 13px;}' +
            '.' + classes.innerReviewWrapper + '{position: absolute;top: 1px;left: 1px;right: 1px;bottom: 1px;background: white;}' +
            '.' + classes.customRating + '{position: relative;}' +
            '.' + classes.faStar + '{background: white !important;color: orange !important;font-size: 13px !important;padding: 0 !important;margin-right: 0 !important;}' +
            '.' + classes.reviewTitle + '{position: relative;color:#154879 ;font-weight: 600;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;' +
            '-webkit-line-clamp: 2;-webkit-box-orient: vertical;display: inline;margin-left: 7px;}' +
            '.' + classes.reviewContent + '{position: relative;margin-top: 13px;margin-bottom: 13px;}' +
            '.' + classes.reviewAuthorDate + '{position: relative;font-size: 13px;}';

        Insider.dom('head').append('<style class="' + classes.style + '">' + css + '</style>');
    };

    self.showCampaign = function () {
        Insider.campaign.custom.show(variationId);
    };

    self.setEvents = function () {
        Insider.eventManager.once('mousedown.add:to:cart:' + variationId, '.product-button:first', function (event) {
            if (event.buttons === 1) {
                event.preventDefault();

                Insider.__external.sendCustomGoal(builderId, 4);

                setTimeout(function () {
                    location.replace(Insider.dom(event.target).attr('href'));
                }, 250);
            }
        });
    };

    Insider.systemRules.call('isOnProductPage') && self.init();
})({});

false;
/* OPT-59683 END */

/* OPT-62749 Start */
Insider.__external.ajaxListener(function (url, response, method) {
    var $formElement = Insider.dom('.form');
    var storageName = 'is-user-viewed-form-but-not-fill-62749';
    var getStorageValue = Insider.storage.localStorage.get(storageName);

    var userAction = {
        viewedAnyForm: false,
        filledAnyForm: Insider.fns.isNull(getStorageValue ) ? false : !getStorageValue,
    };

    if ((url.indexOf('google-analytics') > -1 && url.indexOf('Insider') > -1 && url.indexOf('form-impressions') > -1) ||
        ($formElement.exists() && $formElement.css('display') !== 'none')) {
        userAction.viewedAnyForm = true;
    }

    if (url.indexOf('/contact') > -1) {
        userAction.filledAnyForm = true;
    }

    if (userAction.viewedAnyForm) {
        Insider.storage.localStorage.set({
            name: 'is-user-viewed-form-but-not-fill-62749',
            value: userAction.filledAnyForm ? false : true
        });
    }
});

Insider.storage.localStorage.get('is-user-viewed-form-but-not-fill-62749');
/* OPT-62749 End */
/* OPT-62749 Start */
Insider.__external.ajaxListener = function (callback) {
    'use strict';
    var oldOpen = XMLHttpRequest.prototype.open;

    XMLHttpRequest.prototype.open = function (method, url) {
        this.addEventListener('readystatechange', function () {
            if (this.responseType !== 'arraybuffer' && this.responseType !== 'blob' &&
                this.readyState === 4 && this.status === 200 && typeof callback === 'function') {
                var data = {
                    requestData: this.requestData,
                    requestHeaders: this.requestHeaders,
                };

                callback(url, this.response, data);
            }
        });

        oldOpen.apply(this, arguments);
    };
};
/* OPT-62749 End */

/* OPT-62837 START */
var builderId = Insider.browser.isDesktop() ? 2427 : 2429;
var variationId = Number(Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId));

Insider.eventManager.once('click.ins:send:info:' + variationId, '.account__form-group__button', function () {
    if (!Insider.dom('.js-gender input:checked').exists() &&
        Insider.dom('.account__form--input-grup input[name=date_of_birth_shop]').val() === '') {
        setTimeout(function () {
            Insider.campaign.info.clearVisibleCampaignsByType('ON-PAGE');

            Insider.campaign.webInfo.show(variationId);
            Insider.campaign.info.show(variationId);
        }, 500);
    }
});

false;
/* OPT-62837 END */

/* OPT-62837 START */
var showCampaign = false;

if (!Insider.dom('.js-gender input:checked').exists() &&
    Insider.dom('.account__form--input-grup input[name=date_of_birth_shop]').val() === '') {
    showCampaign = true;
}

showCampaign;
/* OPT-62837 END */

/* OPT-44015 Start */
Insider.__external.showFareUpSellPopUp = function (flightDirection, fareDifference) {
    var self = {};
    var isArabic = Insider.systemRules.call('getLang') === 'ar_AR';
    var builderId;
    var goalIds = [];

    if (Insider.browser.isMobile()) {
        builderId = isArabic ? 169 : 168;
        goalIds = isArabic ? [103, 104] : [100, 101];
    } else {
        builderId = isArabic ? 167 : 166;
        goalIds = isArabic ? [97, 98] : [94, 95];
    }

    var variationId = Insider.campaign.userSegment.segments[builderId];
    var texts = {};

    /* OPT-47526 Start */

    if (isArabic) {
        texts = {
            title: 'سافر مع كل ما تحتاجه فقط  بـ' + fareDifference + ' ريال',
            description: 'حدث رحلتك مقابل ' + fareDifference + ' ريال',
            first: '1× حقيبة مقصورة واحدة لاتتجاوز 7 كغ',
            second: '1× حقيبة شحن لاتتجاوز 25كغ',
            third: '1× مقعد قياسي',
            fourth: 'امكانية التغيير برسوم', 
            fifth: 'غير قابلة للاسترداد',
            closeButton: 'لا, شكراً',
            upgradeButton: 'نعم, ارغب بالترقية إلى سافر+'
        };
    } else {
        texts = {
            title: 'Fly with everything you need for just SAR ' + fareDifference,
            description: 'Upgrade to fly+ fare for just SAR ' + fareDifference,
            first: '1X7kg cabin bag',
            second: '1X 25kg hold bag',
            third: '1X standard seat',
            fourth: 'Change for fee', 
            fifth: 'Non-refundable',
            closeButton: 'I don&#8217t need it',
            upgradeButton: 'upgrade me to fly+ fare'
        };
    }

    var icons = {
        first: 'https://image.useinsider.com/flyadeal/c159/ZtjnbyIuplLyau2ZDHKC1558543397.png',
        second: 'https://image.useinsider.com/flyadeal/c159/MNbCV3m841HkHEeLICYu1558543411.png',
        third: 'https://image.useinsider.com/flyadeal/c159/hPkyEPWhDnLTZnjf1hwZ1558543443.png',
        fourth: 'https://image.useinsider.com/flyadeal/c159/iYSQSwUgrk3GThsrIHox1558543629.png',
        fifth: 'https://image.useinsider.com/flyadeal/c159/yXWYJQQXkQwwygDOWdXy1558543559.png'
    };

    /* OPT-47526 End */

    var classes = {
        mainContainer: 'ins-container-wrapper-' + variationId,
        fareTexT: 'ins-fare-text-' + variationId,
        image: 'ins-image-wrapper-' + variationId,
        subText: 'ins-subtext-class-' + variationId,
        closeButton: 'ins-close-button-' + variationId,
        chooseButton: 'ins-choose-button-' + variationId,
        overlay: 'ins-overlay-' + variationId
    };

    var selectors = {
        mainContainer: '.' + classes.mainContainer,
        overlay: '.' + classes.overlay,
        closeButton: '.' + classes.closeButton,
        chooseButton: '.' + classes.chooseButton
    };

    self.init = function () {
        self.remove();
        self.buildHtml();
        self.setEvents();
    };

    self.remove = function () {
        Insider.dom(selectors.overlay + ', ' + selectors.mainContainer).remove();
    };

    self.buildHtml = function () {
        var css = '<style class="insider-custom-css-' + variationId + '">' + 
        '.ins-overlay-' + variationId + ' {' +
        '    position: fixed;' +
        '    top: 0;' +
        '    width: 100%;' +
        '    height: 100%;' +
        '    background-color: white;' +
        '    display: block;' +
        '    opacity: 0.7;' +
        '    z-index: 99;' +
        '}' +
        '.ins-container-wrapper-' + variationId + ' {' +
        '    position: fixed;' +
        '    top: 50%;' +
        '    left: 50%;' +
        '    transform: translate(-50%, -50%);' +
        '    width: 420px;' +
        '    height: 370px;' +
        '    display: block;' +
        '    background-color: white;' +
        '    z-index: 100;' +
        '    box-shadow: 0px 0px 10px 5px #967cea;' +
        '    box-sizing: border-box;' +
        '    border-top: 7px solid #d97878;' +
        '    text-align: center;' +
        '    padding: 10px;' +
        '}' +
        '.ins-text-container-' + variationId + ' {' +
        '   padding: 0px 50px;' +
        '   display: block;' +
        '   height: 80%;' +
        '}' +
        '.ins-text-container-' + variationId + ' h1 {' +
        '    font-size: 25px;' +
        '    font-weight: bold;' +
        '}' + /* OPT-47526 Start */
        '.ins-fare-text-' + variationId + ' {' +
        '    display: block;' +
        '    text-align: center;' +
        '    float: left;' +
        '    width: 100%;' +
        '}' +/* OPT-47526 End */
        '.ins-image-wrapper-' + variationId + ' {' +
        '    width: 30px;' +
        '    float: left;' +
        '}' + /* OPT-47526 Start */
        '.ins-subtext-class-' + variationId + ' {' +
        '    display: inline-block;' +
        '    margin: auto;' +
        '    top: 50%;' +
        '    transform: translate(20px, 8px);' +
        '    font-weight: 600;' +
        '    white-space: pre;' +
        '    float: left;' + 
        '}' +/* OPT-47526 End */
        '.ins-description-text-' + variationId + ' {' +
        '   margin: 10px 0; ' +
        '   font-weight: 600;' +
        '}' +
        '.ins-close-button-' + variationId + ' {' +
        '   padding: 5px 10px;' +
        '    height: 42px;' +
        '    font-weight: bold;' +
        '}' +
        '.ins-choose-button-' + variationId + ' {' +
        '   padding: 6px 5px;' +
        '    height: 42px;' +
        '    font-weight: bold;' +
        '}' +
        '.ins-button-section-' + variationId + ' {' +
        '   display: block;' +
        '    padding: 2px 10px;' +
        '    margin: auto;' +
        '    height: auto;' +
        '    color: white;' +
        '}' +
        '.ins-close-button-wrapper-' + variationId + ' {' +
        '   display: inline-block;' +
        '    background: #888f93;' +
        '}' +
        '.ins-choose-button-wrapper-' + variationId + ' {' +
        '   display: inline-block;' +
        '    background: #9d3e83;' +
        '    margin: 0 10px;' +
        '}</style>';

        var html = '<div class="' + classes.mainContainer + '">' +
        '<div class="ins-text-container-' + variationId + '">' +
        '<h1>' + texts.title + '</h1>' +
        '<div class="ins-description-text-' + variationId + '">' + texts.description + '</div>' +
        '<div class="' + classes.fareTexT + '">' +
        '<img src="' + icons.first + '" class="' + classes.image + '">' + 
        '<div class="' + classes.subText + '">' + texts.first + '</div></div>' +
        '<div class="' + classes.fareTexT + '">' +
        '<img src="' + icons.second + '" class="' + classes.image + '">' + 
        '<div class="' + classes.subText + '">' + texts.second + '</div></div>' +
        '<div class="' + classes.fareTexT + '">' +
        '<img src="' + icons.third + '" class="' + classes.image + '">' + 
        '<div class="' + classes.subText + '">' + texts.third + '</div></div>' +
        /* OPT-47526 Start */
        '<div class="' + classes.fareTexT + '">' +
        '<img src="' + icons.fourth + '" class="' + classes.image + '">' + 
        '<div class="' + classes.subText + '">' + texts.fourth + '</div></div>' +
        '<div class="' + classes.fareTexT + '">' +
        '<img src="' + icons.fifth + '" class="' + classes.image + '">' + 
        '<div class="' + classes.subText + '">' + texts.fifth + '</div></div>' +
        /* OPT-47526 End */
        '</div>' +
        '<div class="ins-button-section-' + variationId + '">' + 
        '<div class="ins-close-button-wrapper-' + variationId + '"><button class="' + classes.closeButton + '">' +
         texts.closeButton + '</button></div>' + 
        '<div class="ins-choose-button-wrapper-' + variationId + '"><button class="' + classes.chooseButton + '">' +
        texts.upgradeButton + '</button></div></div></div>' +
        '<div class="' + classes.overlay + '"></div>';

        Insider.dom('body').append(css);
        Insider.dom('body').append(html);
    };

    self.setEvents = function () {
        Insider.eventManager.once('click.close:popup:' + variationId, selectors.closeButton, function () {
            self.remove();

            Insider.__external.sendCustomGoal(builderId, goalIds[1]);
        });
        
        Insider.eventManager.off('click.select:upgrade:' + variationId, selectors.chooseButton)
            .on('click.select:upgrade:' + variationId, selectors.chooseButton, function () {
                self.remove();
            
                var flightNumber = Insider.dom('.journey-selected .journey-schedule_flight_number:eq(' +
                flightDirection + ')').text().trim();

                Insider.dom('.journey-select_modifier-edit_button:eq(' + flightDirection + ')').click();
                Insider.dom('.journey_inner:contains("' + flightNumber + '") .journey_price_button').click();
                Insider.dom('.journey_fares .fare-control.fare2').click();

                Insider.__external.sendCustomGoal(builderId, goalIds[0]);
            });

        if (Insider.browser.isMobile()) {
            Insider.eventManager.once('orientationchange', window, function (event) {
                event.target.screen.orientation.angle !== 0 ? 
                    Insider.dom(selectors.mainContainer + ', ' + selectors.overlay).hide() : 
                    Insider.dom(selectors.mainContainer + ', ' + selectors.overlay).show(); 
            });
        }
    };

    self.init();
};

true;
/* OPT-44015 End */

/* OPT-44015 Start */
var isArabic = Insider.systemRules.call('getLang') === 'ar_AR';
var builderId;
var goalIds = [];
var returnFlightSelector = '.journey-selector-inbound';
var departureFlightSelector = '.journey-selector-outbound';

if (Insider.browser.isMobile()) {
    builderId = isArabic ? 169 : 168;
    goalIds = isArabic ? [103, 105] : [100, 102];
} else {
    builderId = isArabic ? 167 : 166;
    goalIds = isArabic ? [97, 99] : [94, 96];
}

var variationId = Insider.campaign.userSegment.segments[builderId];
var fareDifference;

if (Insider.systemRules.call('isOnCategoryPage')) {
    Insider.eventManager.once('click.open:journey:' + variationId, '.journey_price_button ', function() {
        if(Insider.dom('.journey_fares_wrap').exists()) {
            fareDifference = Number(Insider.dom('.journey_fares_list_item:last .price').text()) -
            Number(Insider.dom('.journey_fares_list_item:first .price').text());
        }
    });

    Insider.fns.onElementLoaded(departureFlightSelector + '.has-fare1', function () {
        Insider.campaign.custom.show(variationId);

        if (Insider.campaign.isControlGroup(variationId)) {
            Insider.fns.onElementLoaded(departureFlightSelector + '.has-fare2', function () {
                Insider.__external.sendCustomGoal(builderId, goalIds[0]);
            }).listen();
        } else if(fareDifference) {
            Insider.__external.showFareUpSellPopUp(0, fareDifference);
        }
    }).listen();

    Insider.fns.onElementLoaded(returnFlightSelector + '.has-fare1', function () {
        Insider.campaign.custom.show(variationId);

        if (Insider.campaign.isControlGroup(variationId)) {
            Insider.fns.onElementLoaded(returnFlightSelector + '.has-fare2', function () {
                Insider.__external.sendCustomGoal(builderId, goalIds[0]);
            }).listen();
        } else if(fareDifference) {
            Insider.__external.showFareUpSellPopUp(1, fareDifference);
        }
    }).listen();   
}

if (Insider.systemRules.call('isOnAfterPaymentPage') && 
(Insider.storage.localStorage.get('sp-goal-' + variationId + '-' + goalIds[0]) || {}).goalType === 'join') {
    Insider.__external.sendCustomGoal(builderId, goalIds[1]);
}

false;
/* OPT-44015 End */
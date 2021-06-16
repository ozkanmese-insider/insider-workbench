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
/* OPT-50342 Start */
Insider.__external.ajaxListener = function (callback) {
    'use strict';
    var originalOpenFunction = XMLHttpRequest.prototype.open;

    XMLHttpRequest.prototype.open = function (method, url) {
        this.addEventListener('readystatechange', function () {
            if (this.responseType !== 'arraybuffer' && this.responseType !== 'blob' &&
                this.readyState === 4 && this.status === 200 && typeof callback === 'function') {
                if (typeof callback === 'function') {
                    try {
                        /* when we use with this.responseText it is effecting partner(on ProductPage) */
                        callback(url, this, method);
                    } catch (error) {
                        Insider.logger.log('Something is crashed, Event:' + error);
                    }
                }
            }
        });
        originalOpenFunction.apply(this, arguments);
    };
};

Insider.__external.ajaxListener(function (url, response, method) {
    var socialProofVariations = ['339', '300', '281'];
    var campId = JSON.parse((response || {}).responseText || '{}').campId || '';

    if (url.indexOf('useinsider') > -1 && url.indexOf('social-proof') > -1 && socialProofVariations.includes(campId)) {
        Insider.__external['isSocialProofExist'] = true;
    }
});

Insider.__external.badgeCreator = function (builderId, skuList, text) {
    var self = {};
    var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId) || 0;
    var isControlGroup = Insider.campaign.isControlGroup(variationId);
    var classes = {
        wrapper: 'ins-wrapper-' + variationId,
        style: 'ins-style-' + variationId,
    };
    var selectors = {
        wrapper: '.' + classes.wrapper,
        style: '.' + classes.style,
    };

    self.init = function () {
        self.checkSocialProofExist();
    };

    self.checkSocialProofExist = function () {
        setTimeout(function () {
            if (self.checkSKUId()) {
                if (!Insider.__external['isSocialProofExist']) {
                    Insider.campaign.custom.show(variationId);

                    self.buildBadge();
                }
            }
        }, 8000);
    };

    self.checkSKUId = function () {
        var currentSKU = Insider.systemRules.getCurrentProduct().id || '';

        return skuList.some(function (skuId) {
            return currentSKU === skuId;
        });
    };

    self.buildBadge = function () {
        if (!isControlGroup) {
            self.reset();
            self.buildHTML();
            self.buildCSS();
        }
    };

    self.reset = function () {
        Insider.dom(selectors.wrapper).remove();
    };

    self.buildHTML = function () {
        var buildHTML = '<div class="' + classes.wrapper + ' sp-custom-' + variationId + '">' +
            text + '</div>';

        Insider.dom('.productView-options').prepend(buildHTML);
    };

    self.buildCSS = function () {
        var style =
            selectors.wrapper + '{' +
            '   background-color: #0e1d46;' +
            '   padding: 10px;' +
            '   display: inline-block;' +
            '	color: #ffffff;' +
            '} }';

        Insider.dom('<style>').addClass(classes.style).html(style).appendTo('head');
    };

    self.init();
};
/* OPT-50342 End */
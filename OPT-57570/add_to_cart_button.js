/* OPT-57570  START */
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

/* OPT-57570  END */
/* OPT-57570  START */
if (Insider.systemRules.call('isOnProductPage')) {
    (function (self) {
        var builderId = 50;
        var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);
        var classes = {
            customStyle: 'ins-style' + variationId,
            wrapper: 'ins-sticky-wrapper-' + variationId,
            productInfosName: 'ins-product-information-name-' + variationId,
            productInfosPrice: 'ins-product-information-price-' + variationId,
            productInfosColor: 'ins-product-information-color-' + variationId,
            addtocart: 'ins-add-to-cart-' + variationId
        };
        var product = {
            name: Insider.dom('#sticky-wrapper > h1').text(),
            price: Insider.systemRules.getCurrentProduct().price || 0,
            color: Insider.dom('label.title > span:last-child').nodes[0].outerText || '',
            size: Insider.dom('div > label.radio.selected > span.radio-label').text() || '',
        };

        self.init = function () {
            if (!Insider.campaign.isControlGroup(variationId) && Insider.systemRules.call('isOnProductPage')) {
                self.reset();
                self.setAddToCartButton();
                self.setCSS();
                self.setEvents();
            }
        };

        self.reset = function () {
            Insider.dom('.' + classes.wrapper).remove();
        };

        self.setAddToCartButton = function () {
            Insider.dom('body').append('<div class="' + classes.wrapper + '">' +
                '<div style="font-weight:bold;" class="' + classes.productInfosName + '" itemprop="name">' + product.name + '</div>' +
                '<div class="' + classes.productInfosPrice + '" itemprop="name">£' + product.price + '</div>' +
                '<div class="' + classes.productInfosColor + '" itemprop="name">Colour: ' + product.color + '</div>' +
                '<div class="' + classes.addtocart + '" style="text-decoration:none;">ADD TO BAG</div>' +
                '</div>');
        };

        self.setCSS = function () {
            Insider.dom('head').append('<style class="' + classes.customStyle + '">' +
                '.' + classes.wrapper + ' {width:100%;left:0% !important;position:fixed;bottom: 0%;background:white;padding: 6px 16px 0px 16px;display:flex;left:30%;z-index:11111111;} ' +
                '.' + classes.productInfosName + '{color:#676768;padding:16px;font-size:16px;margin-left:25%;}' +
                '.' + classes.productInfosPrice + '{color:#676768;padding:16px;font-size:16px;margin-left:4%;}' +
                '.' + classes.productInfosColor + '{color:#676768;padding:16px;font-size:16px;margin-left:4%;}' +
                '.' + classes.addtocart + '{font-size:16px;background-color: #638c42;color: #fff;padding: 9px 25px;font-weight: 500;margin:7px;margin-left:8%;width:380px;text-align:center;text-decoration:none;}' +
                '</style>');
        };

        self.setEvents = function () {
            Insider.eventManager.once('click.add:cart:opt57570', '.ins-sticky-wrapper-' + variationId + ' > div',
                function () {
                    Insider.__external.ajaxListener(function (url, method, response) {
                        if (url.indexOf('/cart') > -1) {
                            self.sendCustomGoal();
                        }
                    });

                    Insider.systemRules.call('spAddToCart').addToBasket(Insider.systemRules.call('getCurrentProduct').id,
                        Insider.fns.noop(), {
                            product: Insider.systemRules.call('getCurrentProduct')
                        });
                });
        };

        self.sendCustomGoal = function () {
            Insider.__external.sendCustomGoal(builderId, 6, false);
        };

        self.init();
    })({});
}

true;
/* OPT-57570  END */

(function (self) {
    var builderId = 57;
    var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);
    var classes = {
        customStyle: 'ins-style' + variationId,
        wrapper: 'ins-sticky-wrapper-' + variationId,
        productInfosName: 'ins-product-information-name-' + variationId,
        productInfosPrice: 'ins-product-information-price-' + variationId,
        productInfosColor: 'ins-product-information-color-' + variationId,
        addtocart: 'ins-add-to-cart-' + variationId
    };
    var product = {
        name: Insider.dom('#sticky-wrapper > h1').text(),
        price: Insider.systemRules.getCurrentProduct().price,
        color: Insider.dom('label.title > span:last-child').nodes[0].outerText,
    };

    self.init = function () {
        if (!Insider.campaign.isControlGroup(variationId) && Insider.systemRules.call('isOnProductPage')) {
            self.reset();
            self.setAddToCartButton();
            self.setCSS();
            self.setEvents();
        }
    };

    self.reset = function () {
        Insider.dom('.' + classes.wrapper).remove();
    };

    self.setAddToCartButton = function () {
        Insider.dom('body').append('<div class="' + classes.wrapper + '">' +
            '<div style="font-weight:bold;" class="' + classes.productInfosName + '" itemprop="name">' + product.name + '</div>' +
            '<div class="' + classes.productInfosPrice + '" itemprop="name">£' + product.price + '</div>' +
            '<div class="' + classes.productInfosColor + '" itemprop="name">Colour: ' + product.color + '</div>' +
            '<div class="' + classes.addtocart + '" style="text-decoration:none;">ADD TO BAG</div>' +
            '</div>');
    };

    self.setCSS = function () {
        Insider.dom('head').append('<style class="' + classes.customStyle + '">' +
            '.' + classes.wrapper + ' {width:100%;left:0% !important;position:fixed;bottom: 0%;background:white;padding: 6px 16px 0px 16px;display:flex;left:30%;z-index:11111111;} ' +
            '.' + classes.productInfosName + '{color:#676768;padding:16px;font-size:16px;margin-left:25%;}' +
            '.' + classes.productInfosPrice + '{color:#676768;padding:16px;font-size:16px;margin-left:4%;}' +
            '.' + classes.productInfosColor + '{color:#676768;padding:16px;font-size:16px;margin-left:4%;}' +
            '.' + classes.addtocart + '{font-size:16px;background-color: #638c42;color: #fff;padding: 9px 25px;font-weight: 500;margin:7px;margin-left:8%;width:380px;text-align:center;text-decoration:none;}' +
            '</style>');
    };

    self.setEvents = function () {
        Insider.eventManager.once('click.add:cart:opt57570', '.ins-sticky-wrapper-' + variationId + ' > div',
            function () {
                Insider.__external.ajaxListener(function (url, method, response) {
                    if (url.indexOf('/cart') > -1) {
                        self.sendCustomGoal();
                    }
                });

                Insider.systemRules.call('spAddToCart').addToBasket(Insider.systemRules.call('getCurrentProduct').id,
                    Insider.fns.noop(), {
                        product: Insider.systemRules.call('getCurrentProduct')
                    });
            });
    };

    self.sendCustomGoal = function () {
        Insider.__external.sendCustomGoal(builderId, 6, false);
    };

    self.init();
})({});

true;
/*OPT-52715 start*/
/*OPT-52715 start*/
(function (self) {
    var storageData = Insider.storage.session.get('ins-session-information') || {};
    var sessionInformation = {
        visitTime: storageData.visitTime || Insider.dateHelper.getTime(),
        lastSessionPurchase: storageData.lastSessionPurchase || false,
        isAddedToCart: storageData.isAddedToCart || false,
        isCheckOutPage: storageData.isCheckOutPage || false,
        isFirstPageProduct: storageData.isFirstPageProduct,
        timeSpendOnSession: (Insider.dateHelper.getTime() - Number(storageData.visitTime || 
            Insider.dateHelper.getTime())) / Insider.dateHelper.ONE_SECOND_AS_MILLISECOND
    };

    self.init = function () {
        self.setSessionStorage();
        self.checkConditions();
    };

    self.setSessionStorage = function () {
        Insider.storage.session.set({
            name: 'ins-session-information',
            value: sessionInformation
        });
    };

    self.checkConditions = function () {
        if (Insider.systemRules.call('isOnAfterPaymentPage')) {
            sessionInformation.lastSessionPurchase = true;

            self.setSessionStorage();
        }

        if (Insider.systemRules.call('getCartCount') > 0) {
            sessionInformation.isAddedToCart = true;

            self.setSessionStorage();
        }

        if (Insider.fns.hasParameter('/checkout/onepage/')) {
            sessionInformation.isCheckOutPage = true;

            self.setSessionStorage();
        }

        if (sessionInformation.isFirstPageProduct === 'undefined') {
            sessionInformation.isFirstPageProduct = Insider.systemRules.call('isOnProductPage');
        }
    };

    self.init();
})({});
/* OPT-52715 END*/
//1.
!!((Insider.storage.session.get('ins-session-information') || {}).timeSpendOnSession < 10);
//2.
!!((Insider.storage.session.get('ins-session-information') || {}).timeSpendOnSession < 20) &&
!(Insider.storage.session.get('ins-session-information') || {}).lastSessionPurchase;
//3.
!!(Insider.storage.session.get('ins-session-information') || {}).isAddedToCart && 
    !(Insider.storage.session.get('ins-session-information') || {}).lastSessionPurchase;
//4.
!!(Insider.storage.session.get('ins-session-information') || {}).isCheckOutPage &&
    !(Insider.storage.session.get('ins-session-information') || {}).lastSessionPurchase;
//5. 
!!(Insider.storage.session.get('ins-session-information') || {}).isFirstPageProduct;
//6.
!!((Insider.storage.session.get('ins-session-information') || {}).timeSpendOnSession >
     Insider.dateHelper.ONE_MINUTE_AS_SECONDS * 5) &&
!(Insider.storage.session.get('ins-session-information') || {}).lastSessionPurchase;
//7.
(Insider.storage.get('ins-userDateV').length === 1 && Insider.systemRules.call('isOnCartPage')) || false;
//8.
(Insider.fns.hasParameter('/checkout/onepage/') || Insider.fns.hasParameter('/checkout/review/')) || false;

if (!(Insider.storage.session.get('ins-session-information') || {}).isFirstPageProduct && 
    Insider.systemRules.call('isOnProductPage')) {
    Insider.systemRules.call('isOnProductPage');
}

!!((Insider.storage.session.get('ins-session-information') || {}).isFirstPageProduct);/*OPT-52715*/






/* OPT-57570  START */
(function (self) {
    var builderId = 57;
    var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);
    var productInformation = [];
    var productName = Insider.dom('#sticky-wrapper > h1').text();
    var productPrice = Insider.systemRules.getCurrentProduct().price;
    var isBannerExists = Insider.dom('.text-banner').exists();
    var isControlGroup = Insider.campaign.isControlGroup(variationId);
    var classes = {
        container: 'ins-sticky-cart-container',
        wrapper: 'ins-sticky-wrapper',
        productName: 'ins-product-name',
        productPrice: 'ins-product-price',
        productColour: 'ins-product-colour',
        productSize: 'ins-product-size',
        productFit: 'ins-product-fit',
        addtocart: 'ins-add-to-cart-button'
    };
    var singleDropBar = '#single-drop-option-group-length_chzn';

    self.init = function () {
        if (!isControlGroup) {
            self.removePartnersButton();
            self.reset();
            Insider.dom('#products-option').prepend(self.generalHTML());
            self.checkProductNameLength();
            self.addHTML(self.getProductInformation());
            self.listenProductChange();
            self.setPositionEvent();
            self.addToCartEvent();
        }
    };

    self.removePartnersButton = function () {
        Insider.dom('#sticky-button').remove();
        Insider.dom('.global-promotion').remove();
    };

    self.reset = function () {
        Insider.dom('.' + classes.container).remove();
    };

    self.generalHTML = function () {
        if (!isBannerExists) {
            if (!Insider.dom('.addtocart-button.disabled').exists()) {
                return (
                    '<div class="' + classes.container + '">' +
                    '   <div class="' + classes.wrapper + '-bottom">' +
                    '        <div class="' + classes.addtocart + '">' +
                    '            <button>ADD TO BAG</button>' +
                    '        </div>' +
                    '        <div class="' + classes.productPrice + '">£' + productPrice + '</div> ' +
                    '        <div class="' + classes.productName + '">' + productName + '</div> ' +
                    '    </div>' +
                    '</div>'
                );
            }

            return (
                '<div class="' + classes.container + '">' +
                '   <div class="' + classes.wrapper + '-bottom">' +
                '        <div class="' + classes.addtocart + '">' +
                '            <button>ADD TO BAG</button>' +
                '        </div>' +
                '        <div class="' + classes.productPrice + '">£' + productPrice + '</div> ' +
                '        <div class="' + classes.productName + '">' + productName + '</div> ' +
                '    </div>' +
                '</div>'
            );

        }

        if (!Insider.dom('.addtocart-button.disabled').exists()) {
            return (
                '<div class="' + classes.container + '">' +
                '   <div class="' + classes.wrapper + '-bottom">' +
                '        <div class="' + classes.addtocart + '">' +
                '            <button>ADD TO BAG</button>' +
                '        </div>' +
                '        <div class="' + classes.productPrice + '">£' + productPrice + '</div> ' +
                '        <div class="' + classes.productName + '">' + productName + '</div> ' +
                '    </div>' +
                '</div>'
            );
        }

        return (
            '<div class="' + classes.container + '">' +
            '   <div class="' + classes.wrapper + '-bottom">' +
            '        <div class="' + classes.addtocart + '">' +
            '            <button>ADD TO BAG</button>' +
            '        </div>' +
            '        <div class="' + classes.productPrice + '">£' + productPrice + '</div> ' +
            '        <div class="' + classes.productName + '">' + productName + '</div> ' +
            '    </div>' +
            '</div>'
        );

    };

    self.checkProductNameLength = function () {
        if (Insider.dom('.' + classes.productName).text().length > 35) {
            Insider.dom('.' + classes.productName).text(
                Insider.dom('.' + classes.productName).text().substr(0, 35) + '...');
        }
    };

    self.addHTML = function (config) {
        if (!config[2]) {
            config.push(' ');
        }

        Insider.dom('.' + classes.addtocart).after(
            '<div class="' + classes.productFit + '">' + config[2] + '</div>' +
            '<div class="' + classes.productSize + '">Size: ' + config[1] + '</div>' +
            '<div class="' + classes.productColour + '">' + config[0] + '</div> '
        );
    };

    self.getProductInformation = function () {
        var productInfo = [];

        Insider.dom('.selected-option').nodes.forEach(function (element, index) {
            productInfo.push(element.innerText);
        });
        Insider.eventManager.once('click.12', '.chzn-results li', function () {
            setTimeout(function () {
                productInfo.push(Insider.dom('.active-result.result-selected').text().trim());
            }, 300);
        });

        if (Insider.dom(singleDropBar + ' > a span').text() !== 'Please select your fit' &&
            Insider.dom(singleDropBar).exists()) {
            productInfo.push('Fit: ' + Insider.dom(singleDropBar + ' > a span').text());
        }

        return productInfo;
    };

    self.listenProductChange = function () {
        Insider.eventManager.once('mousedown.product:click' + variationId, '.product-options', function () {
            setTimeout(function () {
                productInformation = self.getProductInformation();

                if (productInformation[1] !== '' && productInformation[0] !== '') {
                    Insider.dom('.' + classes.addtocart + ' > button').text('ADD TO BAG');
                    Insider.dom('.' + classes.addtocart ).attr('style', 'background: #5D863C;');
                }
                Insider.dom('.' + classes.productColour).remove();
                Insider.dom('.' + classes.productSize).remove();
                Insider.dom('.' + classes.productFit).remove();
                self.addHTML(productInformation);
            }, 600);
        });
        Insider.__external.ajaxListener(function (url, response, method) {
            if (url.indexOf('/products/getRelatedProductsTemplate') > -1) {
                setTimeout(function () {
                    productInformation = self.getProductInformation();

                    if (productInformation[1] !== '' && productInformation[0] !== '') {
                        Insider.dom('.' + classes.addtocart + ' > button').text('ADD TO BAG');
                        Insider.dom('.' + classes.addtocart).attr('style', 'background: #5D863C;');
                    }
                    Insider.dom('.' + classes.productColour).remove();
                    Insider.dom('.' + classes.productSize).remove();
                    Insider.dom('.' + classes.productFit).remove();
                    self.addHTML(productInformation);
                }, 600);
            }
        });

        Insider.observer.observe(document, function () {
            self.getProductInformation();
        });
    };

    self.setPositionEvent = function () {
        Insider.eventManager.once('scroll.' + variationId, function () {
            Insider.eventManager.once('scroll.1' + variationId, function () {
                if (Insider.dom('#static-hover').attr('class') === 'hovering') {
                    Insider.dom('.' + classes.wrapper).attr('style', 'position: fixed;margin-top:5.8%');
                } else {
                    Insider.dom('.' + classes.wrapper).attr('style', 'position: static;');
                }
            });
        });
    };

    self.addToCartEvent = function () {
        Insider.eventManager.once('click.add:cart:' + variationId, '.' + classes.addtocart,
            function () {
                Insider.__external.ajaxListener(function (url, response, method) {
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
/* OPT-57570  END */






/* OPT-57570  START */
(function (self) {
    var builderId = 57;
    var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);
    var productInformation = [];
    var productName = Insider.dom('#sticky-wrapper > h1').text();
    var productPrice = Insider.systemRules.getCurrentProduct().price;
    var isBannerExists = Insider.dom('.text-banner').exists();
    var isControlGroup = Insider.campaign.isControlGroup(variationId);
    var classes = {
        container: 'ins-sticky-cart-container',
        wrapper: 'ins-sticky-wrapper',
        productName: 'ins-product-name',
        productPrice: 'ins-product-price',
        productColour: 'ins-product-colour',
        productSize: 'ins-product-size',
        productFit: 'ins-product-fit',
        addtocart: 'ins-add-to-cart-button'
    };
    var singleDropBar = '#single-drop-option-group-length_chzn';

    self.init = function () {
        if (!isControlGroup) {
            self.removePartnersButton();
            self.reset();
            Insider.dom('#products-option').prepend(self.generalHTML());
            self.checkProductNameLength();
            self.addHTML(self.getProductInformation());
            self.listenProductChange();
            self.setPositionEvent();
            self.addToCartEvent();
        }
    };

    self.removePartnersButton = function () {
        Insider.dom('#sticky-button').remove();
        Insider.dom('.global-promotion').remove();
    };

    self.reset = function () {
        Insider.dom('.' + classes.container).remove();
    };

    self.generalHTML = function () {
        if (!isBannerExists) {
            if (!Insider.dom('.addtocart-button.disabled').exists()) {
                return (
                    '<div class="' + classes.container + '">' +
                    '   <div class="' + classes.wrapper + '">' +
                    '        <div class="' + classes.productName + '">' + productName + '</div> ' +
                    '        <div class="' + classes.productPrice + '">£' + productPrice + '</div> ' +
                    '        <div class="' + classes.addtocart + '">' +
                    '            <button>BACK TO DETAILS</button>' +
                    '        </div>' +
                    '    </div>' +
                    '</div>'
                );
            }

            return (
                '<div class="' + classes.container + '">' +
                '   <div class="' + classes.wrapper + '">' +
                '        <div class="' + classes.productName + '">' + productName + '</div> ' +
                '        <div class="' + classes.productPrice + '">£' + productPrice + '</div> ' +
                '        <div class="' + classes.addtocart + '">' +
                '            <button>BACK TO DETAILS</button>' +
                '        </div>' +
                '    </div>' +
                '</div>'
            );

        }

        if (!Insider.dom('.addtocart-button.disabled').exists()) {
            return (
                '<div class="' + classes.container + '">' +
                '   <div class="' + classes.wrapper + '-bottom">' +
                '        <div class="' + classes.productName + '">' + productName + '</div> ' +
                '        <div class="' + classes.productPrice + '">£' + productPrice + '</div> ' +
                '        <div style="background:#5D863C !important" class="' + classes.addtocart + '">' +
                '            <button>ADD TO BAG</button>' +
                '        </div>' +
                '    </div>' +
                '</div>'
            );
        }

        return (
            '<div class="' + classes.container + '">' +
            '   <div class="' + classes.wrapper + '-bottom">' +
            '        <div class="' + classes.productName + '">' + productName + '</div> ' +
            '        <div class="' + classes.productPrice + '">£' + productPrice + '</div> ' +
            '        <div class="' + classes.addtocart + '">' +
            '            <button>BACK TO DETAILS</button>' +
            '        </div>' +
            '    </div>' +
            '</div>'
        );

    };

    self.checkProductNameLength = function () {
        if (Insider.dom('.' + classes.productName).text().length > 35) {
            Insider.dom('.' + classes.productName).text(
                Insider.dom('.' + classes.productName).text().substr(0, 35) + '...');
        }
    };

    self.addHTML = function (config) {
        if (!config[2]) {
            config.push(' ');
        }

        Insider.dom('.ins-product-price').after(
            '<div class="' + classes.productColour + '">' + config[0] + '</div> ' +
            '<div class="' + classes.productSize + '">Size: ' + config[1] + '</div>' +
            '<div class="' + classes.productFit + '">' + config[2] + '</div>'
        );
    };

    self.getProductInformation = function () {
        var productInfo = [];

        Insider.dom('.selected-option').nodes.forEach(function (element, index) {
            productInfo.push(element.innerText);
        });
        Insider.eventManager.once('click.12', '.chzn-results li', function () {
            setTimeout(function () {
                productInfo.push(Insider.dom('.active-result.result-selected').text().trim());
            }, 300);
        });

        if (Insider.dom(singleDropBar + ' > a span').text() !== 'Please select your fit' &&
            Insider.dom(singleDropBar).exists()) {
            productInfo.push('Fit: ' + Insider.dom(singleDropBar + ' > a span').text());
        }

        return productInfo;
    };

    self.listenProductChange = function () {
        Insider.eventManager.once('mousedown.product:click' + variationId, '.product-options', function () {
            setTimeout(function () {
                productInformation = self.getProductInformation();

                if (productInformation[1] !== '' && productInformation[0] !== '') {
                    Insider.dom('.' + classes.addtocart + ' > button').text('ADD TO BAG');
                    Insider.dom('.' + classes.addtocart ).attr('style', 'background: #5D863C;');
                }
                Insider.dom('.' + classes.productColour).remove();
                Insider.dom('.' + classes.productSize).remove();
                Insider.dom('.' + classes.productFit).remove();
                self.addHTML(productInformation);
            }, 600);
        });
        Insider.__external.ajaxListener(function (url, response, method) {
            if (url.indexOf('/products/getRelatedProductsTemplate') > -1) {
                setTimeout(function () {
                    productInformation = self.getProductInformation();

                    if (productInformation[1] !== '' && productInformation[0] !== '') {
                        Insider.dom('.' + classes.addtocart + ' > button').text('ADD TO BAG');
                        Insider.dom('.' + classes.addtocart).attr('style', 'background: #5D863C;');
                    }
                    Insider.dom('.' + classes.productColour).remove();
                    Insider.dom('.' + classes.productSize).remove();
                    Insider.dom('.' + classes.productFit).remove();
                    self.addHTML(productInformation);
                }, 600);
            }
        });

        Insider.observer.observe(document, function () {
            self.getProductInformation();
        });
    };

    self.setPositionEvent = function () {
        Insider.eventManager.once('scroll.' + variationId, function () {
            Insider.eventManager.once('scroll.1' + variationId, function () {
                if (Insider.dom('#static-hover').attr('class') === 'hovering') {
                    Insider.dom('.' + classes.wrapper).attr('style', 'position: fixed;margin-top:5.8%');
                } else {
                    Insider.dom('.' + classes.wrapper).attr('style', 'position: static;');
                }
            });
        });
    };

    self.addToCartEvent = function () {
        Insider.eventManager.once('click.add:cart:' + variationId, '.' + classes.addtocart,
            function () {
                Insider.__external.ajaxListener(function (url, response, method) {
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
/* OPT-57570  END */




















(function (self) {
    var builderId = 57;
    var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);
    var productInformation = [];
    var productName = Insider.dom('#sticky-wrapper > h1').text();
    var productPrice = Insider.systemRules.getCurrentProduct().price;
    var isBannerExists = Insider.dom('.text-banner').exists();
    var isControlGroup = Insider.campaign.isControlGroup(variationId);
    var classes = {
        container: 'ins-sticky-cart-container',
        wrapper: 'ins-sticky-wrapper',
        productName: 'ins-product-name',
        productPrice: 'ins-product-price',
        productColour: 'ins-product-colour',
        productSize: 'ins-product-size',
        productFit: 'ins-product-fit',
        addtocart: 'ins-add-to-cart-button'
    };
    var singleDropBar = '#single-drop-option-group-length_chzn';

    self.init = function () {
        if (!isControlGroup) {
            self.removePartnersButton();
            self.reset();
            Insider.dom('#products-option').prepend(self.generalHTML());
            self.checkProductNameLength();
            self.addHTML(self.getProductInformation());
            self.listenProductChange();
            self.setPositionEvent();
            self.addToCartEvent();
        }
    };

    self.removePartnersButton = function () {
        Insider.dom('#sticky-button').remove();
        Insider.dom('.global-promotion').remove();
    };

    self.reset = function () {
        Insider.dom('.' + classes.container).remove();
    };

    self.generalHTML = function () {
        return (
            '<div class="' + classes.container + '">' +
            '   <div class="' + classes.wrapper + '">' +
            '        <div class="' + classes.addtocart + '">' +
            '            <button>ADD TO BAG</button>' +
            '        </div>' +
            '        <div class="' + classes.productPrice + '">£' + productPrice + '</div> ' +
            '        <div class="' + classes.productName + '">' + productName + '</div> ' +
            '    </div>' +
            '</div>'
        );
    };

    self.checkProductNameLength = function () {
        if (Insider.dom('.' + classes.productName).text().length > 55) {
            Insider.dom('.' + classes.productName).text(
                Insider.dom('.' + classes.productName).text().substr(0, 55) + '...');
        }
    };

    self.addHTML = function (config) {
        if (!config[2]) {
            config.push(' ');
        }

        Insider.dom('.' + classes.addtocart).after(
            '<div class="' + classes.productFit + '">' + config[2] + '</div>' +
            '<div class="' + classes.productSize + '">Size: ' + config[1] + '</div>' +
            '<div class="' + classes.productColour + '">' + config[0] + '</div> '
        );
    };

    self.getProductInformation = function () {
        var productInfo = [];

        Insider.dom('.selected-option').nodes.forEach(function (element, index) {
            productInfo.push(element.innerText);
        });
        Insider.eventManager.once('click.12', '.chzn-results li', function () {
            setTimeout(function () {
                productInfo.push(Insider.dom('.active-result.result-selected').text().trim());
            }, 300);
        });

        if (Insider.dom(singleDropBar + ' > a span').text() !== 'Please select your fit' &&
            Insider.dom(singleDropBar).exists()) {
            productInfo.push('Fit: ' + Insider.dom(singleDropBar + ' > a span').text());
        }

        return productInfo;
    };

    self.listenProductChange = function () {
        Insider.eventManager.once('mousedown.product:click' + variationId, '.product-options', function () {
            setTimeout(function () {
                productInformation = self.getProductInformation();

                Insider.dom('.' + classes.productColour).remove();
                Insider.dom('.' + classes.productSize).remove();
                Insider.dom('.' + classes.productFit).remove();
                self.addHTML(productInformation);
            }, 600);
        });
        Insider.__external.ajaxListener(function (url, response, method) {
            if (url.indexOf('/products/getRelatedProductsTemplate') > -1) {
                setTimeout(function () {
                    productInformation = self.getProductInformation();

                    Insider.dom('.' + classes.productColour).remove();
                    Insider.dom('.' + classes.productSize).remove();
                    Insider.dom('.' + classes.productFit).remove();
                    self.addHTML(productInformation);
                }, 600);
            }
        });

        Insider.observer.observe(document, function () {
            self.getProductInformation();
        });
    };

    self.setPositionEvent = function () {
        Insider.eventManager.once('scroll.' + variationId, function () {
            Insider.eventManager.once('scroll.1' + variationId, function () {
                if (Insider.dom('#static-hover').attr('class') === 'hovering') {
                    Insider.dom('#header').attr('style', 'z-index:1050');
                    Insider.dom('.' + classes.wrapper).attr('style', 'position: fixed;margin-top:7.6%');
                } else {
                    Insider.dom('.' + classes.wrapper).attr('style', 'position: static;');
                }
            });
        });
    };

    self.addToCartEvent = function () {
        Insider.eventManager.once('click.add:cart:' + variationId, '.' + classes.addtocart,
            function () {
                Insider.__external.ajaxListener(function (url, response, method) {
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
/* OPT-57570  END */
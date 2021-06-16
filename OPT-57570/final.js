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
/* OPT-57570  END */

/**OPT-52715
 * 
 * 
 * top buyuk add to bag
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
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

















//action builder
var addToCartConfig = {
    builderId: 57,
    products: {

    },
    selectors: {

    }
};

typeof Insider.__external.createAddToCartConfig === 'function' &&
    Insider.__external.createAddToCartConfig(addToCartConfig);

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

true;
/* OPT-57570  END */
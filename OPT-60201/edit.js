/* OPT-57570  START */
Insider.__external.createAddToCartConfig = function (addToCartConfig) {
    var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(addToCartConfig.builderId);
    var productInformation = [];
    var productName = Insider.dom('#sticky-wrapper > h1').text();
    var productPrice = Insider.systemRules.getCurrentProduct().price;
    var isControlGroup = Insider.campaign.isControlGroup(variationId);
    var classes = {
        container: 'ins-sticky-cart-container-' + variationId,
        wrapper: 'ins-sticky-wrapper-' + variationId,
        productName: 'ins-product-name-' + variationId,
        productPrice: 'ins-product-price-' + variationId,
        productColour: 'ins-product-colour-' + variationId,
        productSize: 'ins-product-size-' + variationId,
        productFit: 'ins-product-fit-' + variationId,
        addtocart: 'ins-add-to-cart-button-' + variationId
    };
    var singleDropBar = '#single-drop-option-group-length_chzn';
    var self = this;

    self.init = function () {
        if (!isControlGroup) {
            self.removePartnersButton();
            self.reset();
            Insider.dom('#products-option').prepend(self.generalHTML());
            self.checkProductNameLength();
            self.addHTML(self.getProductInformation());
            self.listenProductChange();

            if (addToCartConfig.configuration === 5 || addToCartConfig.configuration === 6 ||
                addToCartConfig.configuration === 7 || addToCartConfig.configuration === 8) {
                self.setPositionEvent();
            }
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
            '        <div class="' + classes.addtocart + ' sp-custom-' + variationId + '-1">' +
            '            <button>' + addToCartConfig.addTocartButtonText + '</button>' +
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
        if (addToCartConfig.configuration === 8 || addToCartConfig.configuration === 4) {
            if (!config[2]) {
                config.push(' ');
            }

            if (config[1] !== '') {
                Insider.dom('.' + classes.addtocart).after(
                    '<div class="' + classes.productFit + '">' + config[2] + '</div>' +
                    '<div class="' + classes.productSize + '">Size: ' + config[1] + '</div>'
                );
            }

        }

        Insider.dom('.' + classes.addtocart).after(
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

        if (addToCartConfig.configuration === 8 || addToCartConfig.configuration === 4) {
            if (Insider.dom(singleDropBar + ' > a span').text() !== 'Please select your fit' &&
                Insider.dom(singleDropBar).exists()) {
                productInfo.push('Fit: ' + Insider.dom(singleDropBar + ' > a span').text());
            }
        }

        return productInfo;
    };

    self.listenProductChange = function () {
        Insider.eventManager.once('mousedown.product:click' + variationId, '.product-options', function () {
            setTimeout(function () {
                productInformation = self.getProductInformation();
                Insider.dom('.' + classes.productColour).remove();

                if (addToCartConfig.configuration === 8 || addToCartConfig.configuration === 4) {
                    Insider.dom('.' + classes.productSize).remove();
                    Insider.dom('.' + classes.productFit).remove();
                }

                self.addHTML(productInformation);
            }, 600);
        });

        if (addToCartConfig.configuration === 8 || addToCartConfig.configuration === 4) {
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
        }

    };

    self.setPositionEvent = function () {
        Insider.eventManager.once('scroll.' + variationId, function () {
            Insider.eventManager.once('scroll.1' + variationId, function () {
                if (Insider.dom('#static-hover').attr('class') === 'hovering') {
                    Insider.dom('.' + classes.wrapper).attr('style', 'position: fixed;margin-top:97px');
                    Insider.dom('#header').attr('style', 'z-index:1050');
                } else {
                    Insider.dom('.' + classes.wrapper).attr('style', 'position: static;');
                }
            });
        });
    };

    self.addToCartEvent = function () {

        Insider.eventManager.once('click.add:cart:57750' + variationId, '.' + classes.addtocart,
            function () {
                if (addToCartConfig.configuration === 1 || addToCartConfig.configuration === 2 ||
                    addToCartConfig.configuration === 4 || addToCartConfig.configuration === 5 ||
                    addToCartConfig.configuration === 6 || addToCartConfig.configuration === 8) {
                    Insider.__external.ajaxListener(function (url, response, method) {
                        if (url.indexOf('/cart') > -1) {
                            self.sendCustomGoal();
                        }
                    });

                    Insider.systemRules.call('spAddToCart').addToBasket(Insider.systemRules.call('getCurrentProduct').id,
                        Insider.fns.noop(), {
                            product: Insider.systemRules.call('getCurrentProduct')
                        });
                }
                window.scrollTo(0, 0);
            });

    };

    self.sendCustomGoal = function () {
        Insider.__external.sendCustomGoal(57, 6, false);
    };

    self.init();
};
true;
/* OPT-57570  END */
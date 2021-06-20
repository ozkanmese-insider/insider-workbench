/* OPT-57570  START */
(function (self) {
    var builderId = 57;
    var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);
    var productInformation = [];
    var productName = Insider.dom('#sticky-wrapper > h1').text();
    var productPrice = Insider.systemRules.getCurrentProduct().price;
    var isControlGroup = Insider.campaign.isControlGroup(variationId);
    var classes = {
        container: 'ins-sticky-cart-container',
        wrapper: 'ins-sticky-wrapper',
        productName: 'ins-product-name',
        productPrice: 'ins-product-price',
        productColour: 'ins-product-colour',
        addtocart: 'ins-add-to-cart-button'
    };

    self.init = function () {
        if (!isControlGroup) {
            self.removePartnersButton();
            self.reset();
            Insider.dom('#products-option').prepend(self.generalHTML());
            self.checkProductNameLength();
            self.addHTML(self.getProductInformation());
            self.listenProductChange();
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
            '            <button>BACK TO DETAILS</button>' +
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

        return productInfo;
    };

    self.listenProductChange = function () {
        Insider.eventManager.once('mousedown.product:click' + variationId, '.product-options', function () {
            setTimeout(function () {
                productInformation = self.getProductInformation();
                Insider.dom('.' + classes.productColour).remove();
                self.addHTML(productInformation);
            }, 600);
        });
    };

    self.addToCartEvent = function () {
        Insider.eventManager.once('click.add:cart:' + variationId, '.' + classes.addtocart,
            function () {
                window.scrollTo(0, 0);
                self.sendCustomGoal();
            });
    };

    self.sendCustomGoal = function () {
        Insider.__external.sendCustomGoal(builderId, 6, false);
    };

    self.init();
})({});
/* OPT-57570  END */

/****
  * 
  * 
  * 
  * 
  * addd to bag gray
  */
/* OPT-57570  START */
(function (self) {
    var builderId = 57;
    var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);
    var productInformation = [];
    var productName = Insider.dom('#sticky-wrapper > h1').text();
    var productPrice = Insider.systemRules.getCurrentProduct().price;
    var isControlGroup = Insider.campaign.isControlGroup(variationId);
    var classes = {
        container: 'ins-sticky-cart-container',
        wrapper: 'ins-sticky-wrapper',
        productName: 'ins-product-name',
        productPrice: 'ins-product-price',
        productColour: 'ins-product-colour',
        addtocart: 'ins-add-to-cart-button'
    };

    self.init = function () {
        if (!isControlGroup) {
            self.removePartnersButton();
            self.reset();
            Insider.dom('#products-option').prepend(self.generalHTML());
            self.checkProductNameLength();
            self.addHTML(self.getProductInformation());
            self.listenProductChange();
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
        if (Insider.dom('.' + classes.productName).text().length > 55) {
            Insider.dom('.' + classes.productName).text(
                Insider.dom('.' + classes.productName).text().substr(0, 55) + '...');
        }
    };

    self.addHTML = function (config) {
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

        return productInfo;
    };

    self.listenProductChange = function () {
        Insider.eventManager.once('mousedown.product:click' + variationId, '.product-options', function () {
            setTimeout(function () {
                productInformation = self.getProductInformation();
                Insider.dom('.' + classes.productColour).remove();
                self.addHTML(productInformation);
            }, 600);
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
 * 
 * sam add to bag green
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
    var isControlGroup = Insider.campaign.isControlGroup(variationId);
    var classes = {
        container: 'ins-sticky-cart-container',
        wrapper: 'ins-sticky-wrapper',
        productName: 'ins-product-name',
        productPrice: 'ins-product-price',
        productColour: 'ins-product-colour',
        addtocart: 'ins-add-to-cart-button'
    };

    self.init = function () {
        if (!isControlGroup) {
            self.removePartnersButton();
            self.reset();
            Insider.dom('#products-option').prepend(self.generalHTML());
            self.checkProductNameLength();
            self.addHTML(self.getProductInformation());
            self.listenProductChange();
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
        if (Insider.dom('.' + classes.productName).text().length > 55) {
            Insider.dom('.' + classes.productName).text(
                Insider.dom('.' + classes.productName).text().substr(0, 55) + '...');
        }
    };

    self.addHTML = function (config) {
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

        return productInfo;
    };

    self.listenProductChange = function () {
        Insider.eventManager.once('mousedown.product:click' + variationId, '.product-options', function () {
            setTimeout(function () {
                productInformation = self.getProductInformation();
                Insider.dom('.' + classes.productColour).remove();
                self.addHTML(productInformation);
            }, 600);
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
/* 

    add to bag greenn top

*/
/* OPT-57570  START */
(function (self) {
    var builderId = 57;
    var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);
    var productInformation = [];
    var productName = Insider.dom('#sticky-wrapper > h1').text();
    var productPrice = Insider.systemRules.getCurrentProduct().price;
    var isControlGroup = Insider.campaign.isControlGroup(variationId);
    var classes = {
        container: 'ins-sticky-cart-container',
        wrapper: 'ins-sticky-wrapper',
        productName: 'ins-product-name',
        productPrice: 'ins-product-price',
        productColour: 'ins-product-colour',
        addtocart: 'ins-add-to-cart-button'
    };

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

        return productInfo;
    };

    self.listenProductChange = function () {
        Insider.eventManager.once('mousedown.product:click' + variationId, '.product-options', function () {
            setTimeout(function () {
                productInformation = self.getProductInformation();
                Insider.dom('.' + classes.productColour).remove();
                self.addHTML(productInformation);
            }, 600);
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
 * 
 * 
 * 
 * 
 * 
 * back to details top
 */
/* OPT-57570  START */
(function (self) {
    var builderId = 57;
    var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);
    var productInformation = [];
    var productName = Insider.dom('#sticky-wrapper > h1').text();
    var productPrice = Insider.systemRules.getCurrentProduct().price;
    var isControlGroup = Insider.campaign.isControlGroup(variationId);
    var classes = {
        container: 'ins-sticky-cart-container',
        wrapper: 'ins-sticky-wrapper',
        productName: 'ins-product-name',
        productPrice: 'ins-product-price',
        productColour: 'ins-product-colour',
        addtocart: 'ins-add-to-cart-button'
    };

    self.init = function () {
        if (!isControlGroup) {
            self.removePartnersButton();
            self.reset();
            Insider.dom('#products-option').prepend(self.generalHTML());
            self.checkProductNameLength();
            self.addHTML(self.getProductInformation());
            self.setPositionEvent();
            self.listenProductChange();
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
            '            <button>BACK TO DETAILS</button>' +
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

        return productInfo;
    };

    self.listenProductChange = function () {
        Insider.eventManager.once('mousedown.product:click' + variationId, '.product-options', function () {
            setTimeout(function () {
                productInformation = self.getProductInformation();
                Insider.dom('.' + classes.productColour).remove();
                self.addHTML(productInformation);
            }, 600);
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
                window.scrollTo(0, 0);
                self.sendCustomGoal();
            });
    };

    self.sendCustomGoal = function () {
        Insider.__external.sendCustomGoal(builderId, 6, false);
    };

    self.init();
})({});
/* OPT-57570  END */
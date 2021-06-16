/* OPT-57570  START */
(function (self) {
    var builderId = 49;
    var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);
    var isControlGroup = Insider.campaign.isControlGroup(variationId);
    var stickyButtonHeader = '#sticky-button-header';
    var classes = {
        wrapper: 'ins-sticky-wrapper',
        addToCart: 'ins-add-to-cart-button',
    };

    self.init = function () {
        if (!isControlGroup) {
            self.removePartnersButton();
            self.reset();
            Insider.dom('.product-details-wrapper').prepend(self.addTocartButton());
            self.setPositionEvent();
            self.addToCartEvent();
        }
    };

    self.removePartnersButton = function () {
        Insider.dom(stickyButtonHeader + ' > a').remove();
    };

    self.reset = function () {
        Insider.dom(classes.wrapper).remove();
    };

    self.addTocartButton = function () {
        return (
            '   <div class="' + classes.wrapper + '">' +
            '       <div class="' + classes.addToCart + '">' +
            '           <button>ADD TO BAG</button>' +
            '       </div>' +
            '   </div>');
    };

    self.setPositionEvent = function () {
        Insider.eventManager.once('scroll.' + variationId, function () {
            Insider.eventManager.once('scroll.1' + variationId, function () {
                if (Insider.dom(stickyButtonHeader).attr('class') === 'hovering') {
                    Insider.dom(stickyButtonHeader).attr('style', 'opacity:0;');
                } else {
                    Insider.dom(stickyButtonHeader).attr('style', 'opacity:1;');
                }
            });
        });
    };

    self.addToCartEvent = function () {
        Insider.eventManager.once('click.add:cart:' + variationId, '.' + classes.addToCart,
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
    var builderId = 49;
    var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);
    var isControlGroup = Insider.campaign.isControlGroup(variationId);

    self.init = function () {
        if (!isControlGroup) {
            self.removePartnersButton();
            self.reset();
            Insider.dom('.product-details-wrapper').prepend(self.addTocartButton());
            self.setPositionEvent();
            self.addToCartEvent();
        }
    };

    self.removePartnersButton = function () {
        Insider.dom('#sticky-button-header a').remove();
    };

    self.reset = function () {
        Insider.dom('.ins-sticky-wrapper').remove();
    };

    self.addTocartButton = function () {
        return (
            '   <div class="ins-sticky-wrapper">' +
            '       <div class="ins-add-to-cart-button">' +
            '           <button>ADD TO BAG</button>' +
            '       </div>' +
            '   </div>');
    };

    self.setPositionEvent = function () {
        Insider.eventManager.once('scroll.' + variationId, function () {
            Insider.eventManager.once('scroll.1' + variationId, function () {
                if (Insider.dom('#sticky-button-header').attr('class') === 'hovering') {
                    Insider.dom('#sticky-button-header').attr('style', 'opacity:0;');
                } else {
                    Insider.dom('#sticky-button-header').attr('style', 'opacity:1;');
                }
            });
        });
    };

    self.addToCartEvent = function () {
        Insider.eventManager.once('click.add:cart:' + variationId, '.ins-add-to-cart-button',
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
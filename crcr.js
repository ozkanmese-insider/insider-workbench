(function (self) {
    var builderId = 657;
    var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);
    var isControlGroup = Insider.campaign.isControlGroup(variationId);
    var isShownCampaign = false;
    var isVisible = false;
    var hasColour = Insider.dom('#color').exists();

    var className = {
        style: 'ins-custom-style-' + variationId,
        wrapper: 'ins-sticky-wrapper-' + variationId,
        addToCart: 'ins-add-to-cart-' + variationId,
    };

    var product = {
        name: Insider.dom('#sticky-wrapper > h1').text(),
        price: Insider.systemRules.getCurrentProduct().price,
        color: Insider.dom('label.title > span:last-child').nodes[0].outerText,
        size: Insider.dom('label.title > span:last-child').nodes[1].outerText
    };

    var goalId = {
        addToCartClickGoal: 52,
    };

    self.init = function () {
        self.reset();

        !isVisible && self.showCampaign();
    };

    self.reset = function () {
        Insider.dom('.' + className.style + ' ,.' + className.wrapper).remove();
    };

    self.showCampaign = function () {
        isShownCampaign = Insider.campaign.custom.show(variationId);

        if (isControlGroup) {
            Insider.dom(selector.wrapper).addClass('sp-custom-' + variationId + '-1');
        } else {
            self.addStyle();
            self.addHtml();
        }

        self.setEvents();
    };

    self.addStyle = function () {
        Insider.dom('head').append('<style class"' + className.style + '">' +
            '.' + className.wrapper + ' {position: fixed;width: 380px;right: 20px;bottom: 100px;z-index: 99999;padding: 5px;margin: 0;text-align: center;}' +
            '.' + className.addToCart + ' {width: 100% !important;background: #303484 !important;color:#FFF !important;border-color: #bfbfbf !important;}' +
            '</style>');
    };

    self.addHtml = function () {
        Insider.dom('.content-wrapper').append(
            '<span class="product-name"><p class="btnTxt">' + product.name + '</p></span>' +
            '<span class="product-name"><p class="btnTxt">£' + product.price + '</p></span>' +
            '<span class="product-name"><p class="btnTxt">' + product.color + '</p></span>' +
            '<span class="product-name"><p class="btnTxt">' + product.size + '</p></span>' +
            '</span>');
    };

    self.setEvents = function () {
        Insider.eventManager.once('click.add:to:search:opt52363', , function () {
            Insider.__external.sendCustomGoal(builderId, goalId.addToCartClickGoal);
        });
    };

    self.listenScroll = function () {
        Insider.eventManager.once('resize.window:resize:' + variationId + ', scroll.window:scroll:' + variationId,
            window,
            function () {
                self.calculateScrollPosition();

                if (isVisible) {
                    isShownCampaign && Insider.dom('.' + className.wrapper).hide();
                } else {
                    isShownCampaign ? Insider.dom('.' + className.wrapper).show() : self.showCampaign();
                }
            });
    };

    self.init();
})({});

false;

/* OPT-42914 Start */
var limitSelector = '.product-infos a:last';

Insider.fns.onElementLoaded(limitSelector, function () {
    setTimeout(function () {
        var addToBasketSelector = '.product-options .add-to-basket :eq(1)';
        var backToTopSelector = '#top-button-block button';
        var builderId = 399;
        var goalId = 52;
        var variationId = Insider.campaign.userSegment.segments[builderId];
        var isControlGroup = Insider.campaign.custom.isControlGroup(variationId);

        Insider.eventManager.once('click.ins:add:to:basket', addToBasketSelector, function () {
            (Insider.__external.sendCustomGoal || Insider.fns.noop)(builderId, goalId, true);
        });

        if (!isControlGroup) {
            var backToStartMargin = 'ins-back-top-' + variationId;
            var stickyAddToCartClass = 'ins-sticky-add-to-cart-' + variationId;
            var limitTopPosition = Insider.dom(limitSelector).offset().top;
            var scrollEventName = 'scroll.add:to:basket:' + variationId;
            var isRemoved = false;

            Insider.fns.onElementLoaded(backToTopSelector, function () {
                Insider.dom(backToTopSelector).addClass(backToStartMargin);
            }).listen();

            Insider.dom(addToBasketSelector).addClass(stickyAddToCartClass);

            Insider.eventManager.once(scrollEventName, window, function () {
                if (Insider.dom(window).scrollTop() > limitTopPosition && !isRemoved) {
                    isRemoved = true;
                    Insider.dom(addToBasketSelector).removeClass(stickyAddToCartClass);
                } else if (Insider.dom(window).scrollTop() < limitTopPosition && isRemoved) {
                    isRemoved = false;
                    Insider.dom(addToBasketSelector).addClass(stickyAddToCartClass);
                }
            });
        }

        Insider.campaign.custom.show(variationId);
    }, 1000);
}).listen();

false;
/* OPT-42914 End */



/* OPT-53436 START */
(function (self) {
    var builderId = 1486;
    var variationId = Insider.campaign.userSegment.segments[builderId];
    var siteAddToCartButton = '.ems-prdd-right.sticky > .ems-prdd-block3 > .ems-prdd-add-to-cart';
    var classes = {
        stickyDiv: 'sp-custom-' + variationId + '-1',
        styleClass: 'ins-sticky-style-' + variationId
    };

    self.init = function () {
        if (Insider.systemRules.call('isOnProductPage')) {
            if (!Insider.campaign.isControlGroup(variationId)) {
                self.createDiv();
                self.createStyle();
                self.addScrollEvent();
                self.addFindStore();
            }
            self.showCampaign();
        }
    };

    self.createDiv = function () {
        var stickyPanel = Insider.dom().create('span', { className: classes.stickyDiv });
        var clone = Insider.dom('.ems-prdd-right.sticky').getNode(0).childNodes;
        var excludedElements = [' .ems-prdd-tab', ' .ems-prdd-social',
            ' .ems-prdd-info', ' .ems-prdd-favorite', ' .ems-prdd-code'];

        Insider.dom('.ems-prdd-grid .ga2').append(stickyPanel);

        clone.forEach(function (node) {
            Insider.dom(stickyPanel).append(node.cloneNode(true));
        });

        excludedElements.forEach(function (element) {
            Insider.dom('.' + classes.stickyDiv + element).remove();
        });
        Insider.dom(stickyPanel).hide();
    };

    self.createStyle = function () {
        var style =
            '.' + classes.stickyDiv + '{' +
            'z-index:8;' +
            'padding: 10px;' +
            ' background: white;' +
            'top: 100px;' +
            'position: fixed;' +
            '-webkit-box-shadow: 0px 0px 44px 5px rgba(0,0,0,0.75);' +
            '-moz-box-shadow: 0px 0px 44px 5px rgba(0,0,0,0.75);' +
            'box-shadow: 0px 0px 44px 5px rgba(0,0,0,0.75);' +
            '}';

        Insider.dom('<style>').addClass(classes.styleClass).html(style).appendTo('head');
    };

    self.addScrollEvent = function () {
        Insider.eventManager.once('scroll.pagedown:opt:53436', function () {
            setTimeout(function () {

                if (Insider.dom(window).scrollTop() >
                    (Insider.dom(siteAddToCartButton).offset().top + Insider.dom(siteAddToCartButton).height())) {
                    Insider.dom('.' + classes.stickyDiv).show();
                }
                else {
                    Insider.dom('.' + classes.stickyDiv).hide();
                }
            });
        }, 300);
    };

    self.addFindStore = function () {
        setTimeout(function () {
            Insider.eventManager.once('click.button:opt:53436',
                '.' + classes.stickyDiv + ' > .ems-prdd-block2.btn-group', function () {
                    Insider.dom('body').addClass('ems-find-store-ready');
                    Insider.dom('body').addClass('ems-find-store-animate');
                });
        }, 2000);
    };
    
    self.showCampaign = function () {
        Insider.eventManager.once('scroll.pagedown:show:opt:53436', function () {
            if (Insider.dom(window).scrollTop() >
                (Insider.dom(siteAddToCartButton).offset().top + Insider.dom(siteAddToCartButton).height())) {
                Insider.campaign.custom.show(variationId);
            }
        });
    };

    self.init();
})({});

false;
/* OPT-53436 END */




(function (self) {
    var builderId = 50;
    var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);
    var classes = {
        customStyle: 'ins-style' + variationId,
        productInfosPrice: 'ins-product-information-price-' + variationId,
        productInfosColor: 'ins-product-information-color-' + variationId,
        addToCart: 'ins-add-to-cart-' + variationId
    };
    var product = {
        price: Insider.systemRules.getCurrentProduct().price,
        color: Insider.dom('label.title > span:last-child').nodes[0].outerText,
    };
    var addToCartButton = '.button.btn-sm';

    self.init = function () {
        if (!Insider.campaign.isControlGroup(variationId) && Insider.systemRules.call('isOnProductPage')) {
            self.reset();
            self.setAddToCartBar();
            self.setCSS();
            self.setEvents();
        }
    };

    self.reset = function () {
        Insider.dom('#sticky-button').remove();
    };

    self.setAddToCartBar = function () {
        Insider.dom('#sticky-button').remove();
        Insider.dom('#nav-top').append('<div id="sticky-button" style="border-bottom:1px solid gray;border-top:1px solid gray" class="sticky-button"><div class="content-wrapper">' +
            '<span style="font-weight:bold;font-size:1rem;" class="product-name" itemprop="name">Birdwatching Top</span>' +
            '<span style="font-weight:500" class="' + classes.productInfosPrice + '" itemprop="name">£' + product.price + '</span>' +
            '<span class="' + classes.productInfosColor + '" itemprop="name">' + product.color + '</span>' +
            '<a style="" class="button btn-sm'+ classes.addToCart + '">ADD TO BAG</a></div></div>');
    };

    self.setCSS = function () {
        Insider.dom('head').append(
            '<style class="' + classes.customStyle + '">' +
            '.' + classes.productInfosPrice + '{font-size: 1rem;margin: 0 1em 0 0;vertical-align: middle;margin-left:5%;}' +
            '.' + classes.productInfosColor + '{font-size: 1rem;margin: 0 1em 0 0;vertical-align: middle;margin-left:5%;}' +
            '.' + classes.addToCart + '{margin-left:4%;background:#638C42 !important;color:white;margin-right:4%}' +
            '</style>');
    };

    self.setEvents = function () {
        Insider.eventManager.once('click.add:cart:opt57570', addToCartButton,
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



(function (self) {
    var builderId = 50;
    var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);
    var classes = {
        customStyle: 'ins-style' + variationId,
        productInfosPrice: 'ins-product-information-price-' + variationId,
        productInfosColor: 'ins-product-information-color-' + variationId,
        addToCart: 'ins-add-to-cart-' + variationId
    };
    var product = {
        price: Insider.systemRules.getCurrentProduct().price,
        color: Insider.dom('label.title > span:last-child').nodes[0].outerText,
    };
    var addToCartButton = '.button.btn-sm';

    self.init = function () {
        if (!Insider.campaign.isControlGroup(variationId) && Insider.systemRules.call('isOnProductPage')) {
            self.reset();
            self.setAddToCartBar();
            self.setCSS();
            self.setEvents();
        }
    };

    self.reset = function () {
        Insider.dom('#sticky-button').remove();
    };

    self.setAddToCartBar = function () {
        Insider.dom('#sticky-button').remove();
        Insider.dom('#nav-top').append('<div id="sticky-button" style="border-bottom:1px solid gray;border-top:1px solid gray" class="sticky-button"><div class="content-wrapper">' +
            '<span style="font-weight:bold;font-size:1rem;" class="product-name" itemprop="name">Birdwatching Top</span>' +
            '<span class="' + classes.productInfosPrice + '" itemprop="name">£' + product.price + '</span>' +
            '<span class="' + classes.productInfosColor + '" itemprop="name">' + product.color + '</span>' +
            '<a style="margin-left:4%;background:#638C42;color:white;margin-right:4%" class="button btn-sm">ADD TO BAG</a></div></div>');
    };

    self.setCSS = function () {
        Insider.dom('head').append(
            '<style class="' + classes.customStyle + '">' +
            '.' + classes.productInfosPrice + '{font-size: 1rem;margin: 0 1em 0 0;vertical-align: middle;margin-left:5%;}' +
            '.' + classes.productInfosColor + '{font-size: 1rem;margin: 0 1em 0 0;vertical-align: middle;margin-left:5%;}' +
            '</style>');
    };

    self.setEvents = function () {
        Insider.eventManager.once('click.add:cart:opt57570', addToCartButton,
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

(function (self) {
    var builderId = 50;
    var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);
    var classes = {
        wrapper: 'ins-preview-wrapper',
        customStyle: 'ins-style' + variationId,
        productInfosPrice: 'ins-product-information-price-' + variationId,
        productInfosColor: 'ins-product-information-color-' + variationId,
        addToCart: 'ins-add-to-cart-' + variationId
    };
    var product = {
        price: Insider.systemRules.getCurrentProduct().price,
        color: Insider.dom('label.title > span:last-child').nodes[0].outerText,
    };
    var addToCartButton = '.button.btn-sm';

    self.init = function () {
        if (!Insider.campaign.isControlGroup(variationId) && Insider.systemRules.call('isOnProductPage')) {
            self.reset();
            self.setAddToCartBar();
            self.setCSS();
            self.setEvents();
        }
    };

    self.reset = function () {
        Insider.dom('#sticky-button').remove();
    };

    self.setAddToCartBar = function () {
        Insider.dom('#sticky-button').remove();
        Insider.dom('#nav-top').append('<div id="ins-preview-wrapper sticky-button" style="border-bottom:1px solid gray;border-top:1px solid gray" class="' + classes.wrapper + 'sticky-button"><div class="content-wrapper">' +
            '<span style="font-weight:bold;font-size:1rem;" class="product-name" itemprop="name">Birdwatching Top</span>' +
            '<span class="' + classes.productInfosPrice + '" itemprop="name">£' + product.price + '</span>' +
            '<span class="' + classes.productInfosColor + '" itemprop="name">' + product.color + '</span>' +
            '<a style="margin-left:4%;background:#638C42;color:white;margin-right:4%" class="button btn-sm">ADD TO BAG</a></div></div>');
    };

    self.setCSS = function () {
        Insider.dom('head').append(
            '<style class="' + classes.customStyle + '">' +
            '.' + classes.productInfosPrice + '{font-size: 1rem;margin: 0 1em 0 0;vertical-align: middle;margin-left:5%;}' +
            '.' + classes.productInfosColor + '{font-size: 1rem;margin: 0 1em 0 0;vertical-align: middle;margin-left:5%;}' +
            '</style>');
    };

    self.setEvents = function () {
        Insider.eventManager.once('click.add:cart:opt57570', addToCartButton,
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
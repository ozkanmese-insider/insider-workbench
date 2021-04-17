(function (self) {
    var builderId = 57;
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
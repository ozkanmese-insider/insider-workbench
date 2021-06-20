/* OPT-59572 START */
(function (self) {
    var isMobile = Insider.browser.isMobile();
    var builderId = isMobile ? 2546 : 2545;
    var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);
    var isControlGroup = Insider.campaign.isControlGroup(variationId);
    var className = 'ins-wrapper-' + variationId;
    var originalPrice = Insider.systemRules.call('getCurrentProduct').price;
    var discountedPrice;
    var addToCartSelector;
    var appendTo;

    if (isMobile) {
        addToCartSelector = '.mobile-add-to-cart-section';
        appendTo = '.product-detail-code-and-delivery > ul';
    } else {
        if (Insider.dom('.detail-old-price').exists()) {
            addToCartSelector = '.add-to-cart';
            appendTo = '.detail-new-price';
        } else {
            addToCartSelector = '.add-to-cart';
            appendTo = '.product-detail-price-and-container.clearfix > div > div > div > span';
        }
    }

    self.init = function () {
        if (!isControlGroup) {
            self.reset();
            self.buildHtml();
            self.append();
        }

        self.setEvents();
    };

    self.reset = function () {
        Insider.dom('.' + className).remove();
    };

    self.buildHtml = function () {
        return (
            '<div class="' + className + ' sp-custom-' + variationId + '-1">' +
            '<span>' + self.getProductDiscount() + '</span>' +
            '</div>'
        );
    };

    self.getProductDiscount = function () {
        if (originalPrice > 100 && originalPrice < 150) {
            discountedPrice = originalPrice - 50;
        } else if (originalPrice > 150 && originalPrice < 200) {
            discountedPrice = originalPrice - 75;
        } else if (originalPrice > 200) {
            discountedPrice = originalPrice - 80;
        }

        var discountText = 'Sepetteki fiyat: ' + Number(discountedPrice).toFixed(2) + 'TL';

        return discountText;
    };

    self.append = function () {
        if (discountedPrice !== undefined) {
            Insider.dom(appendTo).after(self.buildHtml());
        }
    };

    self.setEvents = function () {
        Insider.eventManager.once('click.add:to:cart:' + variationId, addToCartSelector, function () {
            (Insider.__external.sendCustomGoal || Insider.fns.noop)(builderId, 170, false);
        });

    };

    self.init();
})({});

true;
/* OPT-59572 END */
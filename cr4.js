(function (self) {
    var builderId = !Insider.browser.isMobile() ? 1171 : 1172;
    var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);
    var productIdList = ['10364797', '10364797', '40452085', '70452079', '70452079',
        '30452081', '30452081', '20452091', '20452091', '80452093', '80452093',
        '30452095', '30452095', '10452096', '10452096', '50453602', '50453602',
        '80452088', '80452088', '452092', '452092', '10460751', '10460751',
        '60452089', '70452098', '70452098', '70408595', '364477',
        '70429913', '70429913', '80424255', '80424255', '364477'];
    var classes = {
        excluded: 'ins-custom-exlude-' + variationId,
        hide: 'ins-custom-hide-button-' + variationId,
        style: 'ins-custom-style-' + variationId
    };
    var isShown = false;

    self.init = function () {
        if (!Insider.campaign.isControlGroup(variationId)) {
            self.reset();
            self.addStyle();
            self.removeAddToCart();
        }
    };

    self.reset = function () {
        Insider.dom('.' + classes.style).remove();
    };

    self.addStyle = function () {
        var style = '.' + classes.hide + '{ display:none !important; }';

        Insider.dom('<style>').addClass(classes.style).html(style).appendTo('head');
    };

    self.getProductList = function () {
        if (Insider.systemRules.call('isOnCategoryPage')) {
            return Insider.systemRules.call('getProductList').isOnCategoryPage();
        } else if (Insider.systemRules.call('isOnProductPage')) {
            return Insider.systemRules.call('getProductList').isOnProductPage();
        }

        return Insider.systemRules.call('getProductList').isOnMainPage();
    };

    self.removeAddToCart = function () {
        var buttonClass = '.range-revamp-product-compact__add-to-cart-button';
        var productList = self.getProductList();

        Insider.dom(buttonClass).addClass(classes.excluded);

        if (productList) {
            productList.forEach(function (product) {
                if (productIdList.indexOf(product.id) > -1) {
                    Insider.dom(buttonClass, product.path).addClass(classes.hide);

                    if (!isShown) {
                        isShown = Insider.campaign.custom.show(variationId);
                    }
                }
            });
        }

        Insider.fns.onElementLoaded(buttonClass + ':not(.' + classes.excluded + ')', function () {
            setTimeout(function () {
                self.removeAddToCart();
            }, 1000);
        }).listen();
    };

    self.init();
})({});

false;
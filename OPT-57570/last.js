/* OPT-57570  START */

(function (self, designA, designB, designC, designD, designE) {
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
    var sizeselector = '.property-option.group-size';
    var colorSelector = '';
    var bannerExists = false;
    var designValue = 'A';

    designA.init = function () {
        designA.reset();
        designA.setAddToCartBar();
        designA.setCss();
        designA.setEvents();

    };

    designA.reset = function () {
        Insider.dom().remove();
    };

    designA.setAddToCartBar = function () {

    };

    designB.init = function () {
        designB.reset();
        designB.setAddToCartBar();
        designB.setCss();
        designB.setEvents();

    };

    designB.reset = function () {
        // Insider.dom().remove();
    };
    designB.setAddToCartBar = function () {
        Insider.dom('body').append('<div class="' + classes.wrapper + '">' +
            '<div style="font-weight:bold;" class="' + classes.productInfosName + '" itemprop="name">' + product.name + '</div>' +
            '<div class="' + classes.productInfosPrice + '" itemprop="name">£' + product.price + '</div>' +
            '<div class="' + classes.productInfosColor + '" itemprop="name">Colour: ' + product.color + '</div>' +
            '<div class="' + classes.addtocart + '" style="text-decoration:none;">ADD TO BAG</div>' +
            '</div>');
    };

    designB.setCss = function () {
        Insider.dom('head').append('<style class="' + classes.customStyle + '">' +
            '.' + classes.wrapper + ' {width:100%;left:0% !important;position:fixed;bottom: 0%;background:white;padding: 6px 16px 0px 16px;display:flex;left:30%;z-index:11111111;} ' +
            '.' + classes.productInfosName + '{color:#676768;padding:16px;font-size:16px;margin-left:25%;}' +
            '.' + classes.productInfosPrice + '{color:#676768;padding:16px;font-size:16px;margin-left:4%;}' +
            '.' + classes.productInfosColor + '{color:#676768;padding:16px;font-size:16px;margin-left:4%;}' +
            '.' + classes.addtocart + '{font-size:16px;background-color: #638c42;color: #fff;padding: 9px 25px;font-weight: 500;margin:7px;margin-left:8%;width:380px;text-align:center;text-decoration:none;}' +
            '</style>');
    };

    designC.init = function () {
        designC.reset();
        designC.setAddToCartBar();
        designC.setCss();
        designC.setEvents();

    };

    designC.reset = function () {
        Insider.dom().remove();
    };
    designC.setAddToCartBar = function () {

    };

    designD.init = function () {
        designD.reset();
        designD.setAddToCartBar();
        designD.setCss();
        designD.setEvents();

    };

    designD.reset = function () {
        Insider.dom().remove();
    };
    designD.setAddToCartBar = function () {

    };

    designE.init = function () {
        designE.reset();
        designE.setAddToCartBar();
        designE.setCss();
        designE.setEvents();

    };

    designE.reset = function () {
        Insider.dom().remove();
    };
    designE.setAddToCartBar = function () {

    };

    self.init = function () {
        self.setEvents();
        self.designInitialize();
    };

    self.setEvents = function () {
        Insider.eventManager.once('click.size:opt57570', sizeselector, function () {
            designValue = 'B';

            self.designInitialize();
        });

        Insider.eventManager.once('click.size:opt57570', colorSelector, function () {
            designValue = 'C';

            self.designInitialize();
        });

        Insider.eventManager.once('click.size:opt57570', sizeselector, function () {
            designValue = 'D';

            self.designInitialize();
        });

        if (Insider.dom(bannerExists)) {
            designValue = 'E';

            self.designInitialize();

        }

    };

    self.designInitialize = function () {
        if (designValue === 'A') {
            designA.init();

        } else if (designValue === 'B') {
            designB.init();

        } else if (designValue === 'C') {
            designC.init();

        } else if (designValue === 'D') {
            designD.init();

        } else if (designValue === 'E') {
            designE.init();

        }
    };

    self.init();
})({});

true;
/* OPT-57570  END */

Insider.dom('#price-range > span').text(); /* OPT-58217 */
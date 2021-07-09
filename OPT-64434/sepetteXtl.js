/* OPT-59572 START */
(function (self) {
    var isMobile = Insider.browser.isMobile();
    var builderId = isMobile ? 2546 : 2545;
    var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);
    var isControlGroup = Insider.campaign.isControlGroup(variationId);
    var products = ['Hml Busan Beyaz Unisex Sneaker 208682-2001', 'Hoops 2.0 Beyaz Erkek Basketbol Ayakkabısı Eg3970',
        'Advantage K Beyaz Unisex Sneaker Ef0211', 'Duramo Lite 2.0 Lacivert Erkek Koşu Ayakkabısı Fv6056',
        'Runfalcon K Siyah Kadın Koşu Ayakkabısı F36549'
    ];
    var originalPrice;
    var discountedPrice;
    var className = 'ins-wrapper-' + variationId;

    self.init = function () {
        if (!isControlGroup && Insider.systemRules.call('isOnCategoryPage')) {
            self.reset();
            self.findPrice();
        }
    };

    self.reset = function () {
        Insider.dom('.' + className).remove();
    };

    self.findPrice = function () {
        products.forEach(function (product) {
            if (Insider.dom('.productbox-name:contains(' + product + ')').exists()) {
                if (Insider.dom('.productbox-name:contains(' + product + ')').next().nodes[0].children.length > 1) {
                    originalPrice = parseFloat(Insider.dom('.productbox-name:contains(' + product + ')').next()
                        .nodes[0].childNodes[3].innerText.split(' ')[0]);

                    if (originalPrice > 100 && originalPrice < 300) {
                        discountedPrice = originalPrice - 20;
                    } else if (originalPrice > 300 && originalPrice < 400) {
                        discountedPrice = originalPrice - 40;
                    } else if (originalPrice > 400 && originalPrice < 500) {
                        discountedPrice = originalPrice - 60;
                    } else if (originalPrice > 500 && originalPrice < 600) {
                        discountedPrice = originalPrice - 80;
                    } else if (originalPrice > 600) {
                        discountedPrice = originalPrice - 100;
                    }

                    Insider.dom('.productbox-name:contains(' + product + ')').next().after(
                        '<div class="' + className + ' sp-custom-' + variationId + '-1">' +
                        '<span>Sepette' + discountedPrice + ',' + Insider.dom('.productbox-name:contains(' + product +
                            ')').next().nodes[0].childNodes[3].innerText.split(',')[1] + '</span>' +
                        '</div>'
                    );

                } else {
                    originalPrice = parseFloat(Insider.dom('.productbox-name:contains(' + product + ')').next()
                        .nodes[0].childNodes[1].innerText.split(' ')[0]);

                    if (originalPrice > 100 && originalPrice < 300) {
                        discountedPrice = originalPrice - 20;
                    } else if (originalPrice > 300 && originalPrice < 400) {
                        discountedPrice = originalPrice - 40;
                    } else if (originalPrice > 400 && originalPrice < 500) {
                        discountedPrice = originalPrice - 60;
                    } else if (originalPrice > 500 && originalPrice < 600) {
                        discountedPrice = originalPrice - 80;
                    } else if (originalPrice > 600) {
                        discountedPrice = originalPrice - 100;
                    }

                    Insider.dom('.productbox-name:contains(' + product + ')').next().after(
                        '<div class="' + className + ' sp-custom-' + variationId + '-1">' +
                        '<span>Sepette' + discountedPrice + ',' + Insider.dom('.productbox-name:contains(' + product +
                            ')').next().nodes[0].childNodes[1].innerText.split(',')[1] + '</span>' +
                        '</div>'
                    );

                }
            }
        });

    };

    self.init();
})({});

true;
/* OPT-59572 END */

/* OPT-64434 START */
(function (self) {
    var builderId = Insider.browser.isMobile() ? 2721 : 2720;
    var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);
    var products = ['Hml Busan Beyaz Unisex Sneaker 208682-2001', 'Hoops 2.0 Beyaz Erkek Basketbol Ayakkabısı Eg3970',
        'Advantage K Beyaz Unisex Sneaker Ef0211', 'Duramo Lite 2.0 Lacivert Erkek Koşu Ayakkabısı Fv6056',
        'Runfalcon K Siyah Kadın Koşu Ayakkabısı F36549'];
    var originalPrice;
    var discountedPrice;

    var classes = {
        wrapper: 'ins-wrapper-' + variationId,
        productName: 'productbox-name',
    };

    self.init = function () {
        if (!Insider.campaign.isControlGroup(variationId) && Insider.systemRules.call('isOnCategoryPage')) {
            self.reset();
            self.findPriceAndAddBadge();
        }

        self.setEvents();
    };

    self.reset = function () {
        Insider.dom('.' + classes.wrapper).remove();
    };

    self.findPriceAndAddBadge = function () {
        products.forEach(function (product) {
            var selector = '.' + classes.productName + ':contains(' + product + ')';

            if (Insider.dom(selector).exists()) {
                if (Insider.dom(selector).next().nodes[0].children
                    .length > 1) {
                    originalPrice = parseFloat(Insider.dom('.product-list-container > div > div > div >' +
                            'a:nth-child(4) > .productbox-name:contains(' + product + ')')
                        .siblings().find('.product-box-new-price').text().trim().replace(',', '.'));

                    if (originalPrice > 100 && originalPrice < 300) {
                        discountedPrice = originalPrice - 20;
                    } else if (originalPrice > 300 && originalPrice < 400) {
                        discountedPrice = originalPrice - 40;
                    } else if (originalPrice > 400 && originalPrice < 500) {
                        discountedPrice = originalPrice - 60;
                    } else if (originalPrice > 500 && originalPrice < 600) {
                        discountedPrice = originalPrice - 80;
                    } else if (originalPrice > 600) {
                        discountedPrice = originalPrice - 100;
                    }

                    if (!isNaN(originalPrice)) {
                        Insider.dom(selector).next().after(
                            '<div class="' + classes.wrapper + ' sp-custom-' + variationId + '-1">' +
                            '<span>Sepette ' + discountedPrice.toFixed(2) + ' TL' + '</span>' +
                            '</div>'
                        );
                    }
                }

            }
        });

    };

    self.setEvents = function () {
        Insider.eventManager.once('click.ins:page:view:' + variationId, '.product-box-container', function () {
            Insider.__external.sendCustomGoal(builderId, 176, true);
        });
    };

    self.init();
})({});

true;
/* OPT-64434 END */
/* OPT-64434 START */
var campaignShowStatus = false;
var products = ['Hml Busan Beyaz Unisex Sneaker 208682-2001', 'Hoops 2.0 Beyaz Erkek Basketbol Ayakkabısı Eg3970',
    'Advantage K Beyaz Unisex Sneaker Ef0211', 'Duramo Lite 2.0 Lacivert Erkek Koşu Ayakkabısı Fv6056',
    'Runfalcon K Siyah Kadın Koşu Ayakkabısı F36549'];

products.some(function (product) {
    campaignShowStatus = Insider.dom('.productbox-name:contains(' + product + ')').exists();

    return campaignShowStatus;
});

campaignShowStatus;
/* OPT-64434 END */









































/* OPT-64434 START */
(function (self) {
    var builderId = Insider.browser.isMobile() ? 2693 : 2692;
    var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);
    var products = ['Hml Busan Beyaz Unisex Sneaker 208682-2001', 'Hoops 2.0 Beyaz Erkek Basketbol Ayakkabısı Eg3970',
        'Advantage K Beyaz Unisex Sneaker Ef0211', 'Duramo Lite 2.0 Lacivert Erkek Koşu Ayakkabısı Fv6056',
        'Runfalcon K Siyah Kadın Koşu Ayakkabısı F36549'
    ];
    var originalPrice;
    var discountedPrice;

    var classes = {
        wrapper: 'ins-wrapper-' + variationId,
        productName: 'productbox-name',
        ancestors: 'div > a:nth-child(4) > '
    };

    self.init = function () {
        if (!Insider.campaign.isControlGroup(variationId) && Insider.systemRules.call('isOnCategoryPage')) {
            self.reset();
            self.findPriceAndAddBadge();
        }
    };

    self.reset = function () {
        Insider.dom('.' + classes.wrapper).remove();
    };

    self.findPriceAndAddBadge = function () {
        products.forEach(function (product) {
            if (Insider.dom('.' + classes.productName + ':contains(' + product + ')').exists()) {
                if (Insider.dom('.' + classes.productName + ':contains(' + product + ')').next().nodes[0].children
                    .length > 1) {
                    originalPrice = parseFloat(Insider.dom(classes.ancestors + '.' + classes.productName +
                            ':contains(' + product + ')').siblings().text().trim().split('\n                            ')[2]
                        .replace(',', '.'));

                    discountedPrice = originalPrice * (90 / 100);

                    Insider.dom('.' + classes.productName + ':contains(' + product + ')').next().after(
                        '<div class="' + classes.wrapper + ' sp-custom-' + variationId + '-1">' +
                        '<span>Sepette ' + discountedPrice.toFixed(2) + ' TL' + '</span>' +
                        '</div>'
                    );

                } else {
                    originalPrice = parseFloat(Insider.dom(classes.ancestors + '.' + classes.productName +
                            ':contains(' + product + ')').siblings().text().trim().split('\n                            ')[1]
                        .replace(',', '.'));

                    discountedPrice = originalPrice * (90 / 100);

                    Insider.dom('.' + classes.productName + ':contains(' + product + ')').next().after(
                        '<div class="' + classes.wrapper + ' sp-custom-' + variationId + '-1">' +
                        '<span>Sepette ' + discountedPrice.toFixed(2) + ' TL' + '</span>' +
                        '</div>'
                    );

                }
            }
        });

    };

    self.init();
})({});

true;
/* OPT-64434 END */
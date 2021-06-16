//action builder
var isArabic = Insider.systemRules.getLang() === 'ar_AR' ? true : false;
var bannerConfig = {
    builderId: 493,
    products: {
        banner_bubble: {
            img: isArabic ? 'https://image.useinsider.com/avonmorocco/defaultImageLibrary/GI3%20Triple%20Banners1%20285x293%20ar-1617981940.png' :
                'https://image.useinsider.com/avonmorocco/defaultImageLibrary/GI3%20Triple%20Banners1%20285x293%20fr-1617981927.jpeg',
            id: '154112',
        },
        banner_mascara: {
            img: isArabic ? 'https://image.useinsider.com/avonmorocco/defaultImageLibrary/GI3%20Triple%20Banners2%20285x293%20ar-1617981953.png' :
                'https://image.useinsider.com/avonmorocco/defaultImageLibrary/GI3%20Triple%20Banners2%20285x293-1617981946.jpeg',
            id: '168104',
        },
        banner_glimmerstick: {
            img: isArabic ? 'https://image.useinsider.com/avonmorocco/defaultImageLibrary/GI3%20Triple%20Banners3%20285x293%20ar-1617981964.png' :
                'https://image.useinsider.com/avonmorocco/defaultImageLibrary/GI3%20Triple%20Banners3%20285x293%20fr-1617981958.jpeg',
            id: '170795',
        }
    },
    selectors: {
        productIdSelector: '.div_table tbody tr:first td:nth-of-type(3) input',
        productQuantitySelector: '.div_table tbody tr:first td:nth-of-type(4) input',
        placementLocationSelector: '.padding_bottom10.font_12'
    },
    customGoals: [317, 318, 319]
};

typeof Insider.__external.createBannerConfig57444 === 'function' &&
    Insider.__external.createBannerConfig57444(bannerConfig);
//custom rule
Insider.__external.createBannerConfig57444 = function (config) {
    var self = this;
    var isMobile = Insider.browser.isMobile();
    var variationId = Insider.campaign.userSegment.segments[config.builderId];
    var classes = {
        mainClass: 'ins-main-banner-' + variationId,
        goalClass: 'sp-custom-' + variationId + '-1',
        bannerClass: 'ins-banner-side',
        lineNumber: 'line-number'
    };

    self.init = function () {
        self.setEvents();
    };
    self.setEvents = function () {
        self.reset();
        self.createBanner();
        self.addClickEvent();
    };
    self.reset = function () {
        Insider.dom('.' + classes.mainClass).remove();
    };
    self.createBanner = function () {
        var creatAlignedBanner = '<div class="' + classes.mainClass + ' ' + classes.goalClass + ' ins-main-banner">' +
            '<span class="' + classes.bannerClass + ' ' + classes.bannerClass + '-one">' +
            '<img src="' + config.products.banner_bubble.img + '"><span class="' + classes.lineNumber + '">' +
            config.products.banner_bubble.id + '</span></span>' +
            '<span class="' + classes.bannerClass + ' ' + classes.bannerClass + '-two">' +
            '<img src="' + config.products.banner_mascara.img + '"><span class="' + classes.lineNumber + '">' +
            config.products.banner_mascara.id + '</span></span>' +
            '<span class="' + classes.bannerClass + ' ' + classes.bannerClass + '-three">' +
            '<img src="' + config.products.banner_glimmerstick.img + '"><span class="' + classes.lineNumber + '">' +
            config.products.banner_glimmerstick.id + '</span></span>' +
            '</div>';

        isMobile ? Insider.dom(config.selectors.placementLocationSelector).before(creatAlignedBanner) :
            Insider.dom(config.selectors.placementLocationSelector).find('table').before(creatAlignedBanner);
    };
    self.addClickEvent = function () {
        setTimeout(function () {
            Insider.eventManager.once('click.ins:Banner:Add:' + variationId,
                '.' + classes.mainClass + ' .' + classes.bannerClass,
                function () {
                    var productId = Insider.dom(this).find('.' + classes.lineNumber).text();
                    var productIndex = Insider.dom(this).index();

                    self.sendGoal(productIndex);
                    Insider.dom(config.selectors.productIdSelector).val(productId);
                    Insider.dom(config.selectors.productQuantitySelector).val('1');
                    setTimeout(function () {
                        if (typeof window.updateOrder === 'function') {
                            window.updateOrder();
                        }
                    }, 500);
                });
        }, 500);
    };
    self.sendGoal = function (index) {
        if (index === 0) {
            Insider.__external.sendCustomGoal(config.builderId, config.customGoals[0]);
        } else if (index === 1) {
            Insider.__external.sendCustomGoal(config.builderId, config.customGoals[1]);
        } else if (index === 2) {
            Insider.__external.sendCustomGoal(config.builderId, config.customGoals[2]);
        }
    };
    self.init();
};
true;
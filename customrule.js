(function (self) {
    var skuIds = ['76576W.BLK', '13070W.WSL', '13070W.BKRG', '22823W.WSL', '22604W.BBK', '104008W.BKHP', '104008W.GYCL',
        '15601W.BBK', '15400W.BBK', '15901W.NVW', '15902W.BBK', '15901W.BBK', '12775W.BBK', '15601W.GYBL', '204105ww.blk', '204105ww.choc',
        '15400W.NVGY', '52649W.BBK', '58350W.BBK', '55509EWW.BBK', '55510EWW.BBK', '55510EWW.NVY', '65981W.TPE', '302023WL.MLT',
        '52787W.BBK', '52787W.CHAR', '52787W.NVRD', '52984EWW.BBK', '65693W.CDB', '55098EWW.BBK', '220034WW.GYNV',
        '52649W.NVY', '64943W.BLK', '232057W.BBK', '232057W.RDBK', '52504W.BBK', '65981W.NVY', '52531W.BBK', '52649w.char',
        '232040WW.GYNV', '232040WW.NVY', '16701W.BBK', '16701W.NVGY', '52531W.BBK', '52631W.NVY', '55509EWW.CCBK',
        '52631W.BKRD', '65908W.TPE', '55510EWW.CHAR', '52531W.BBK', '52631W.BKRD', '52631W.NVY', '52504W.BBK',
        '52504W.BLK', '232057W.BBK', '232057W.RDBK', '65355EWW.CHAR', '64943W.BLK', '64943W.KHK', '65981W.TPE',
        '104008W.BKHP', '104008W.GYCL', '23487W.TPE', '65693W.cdb', '23487W.TPE', '33218W.BLK', '23487W.NVY', '149203W.LGPK', '15905W.NVW', '149057W.BBK', '232063WW.NVBL', '23945W.NVY', '23945W.PNK', '77210W.BLK', '51893EWW.GYW', '52504W.NVY', '52927EWW.CCBK', '66384W.BRN', '100033W.GRY', '100033W.WHT', '104009W.LPD', '23958W.NVY', '31440w.olv', '13106w.bbk', '149149w.tpe', '23945w.pnk', '13260w.wsl', '13264w.bbk', '23312w.nvy', '77254w.blk', '32504w.wht', '149149w.tppk', '52630w.bbk', '77068w.bkgy', '77130w.blk', '77509w.blk', '232018ww.char', '76536w.bbk', '216008ww.khk', '66272w.blk', '216008ww.khk', '76536w.bbk', '55509eww.gry', '12841W.pur', '31440W.ras', '31440W.slt'
    ];
    /* OPT-40479 START */
    var builderIds = {
        categoryPage: {
            mobile: 16,
            desktop: 15
        },
        searchPage: {
            mobile: 28,
            desktop: 27
        },
    };
    var isOnCategoryPage = Insider.systemRules.call('isOnCategoryPage');
    var isOnSearchPage = Insider.fns.hasParameter('/search/');
    var isMobile = Insider.browser.isMobile();
    var builderId = isMobile ? builderIds.categoryPage.mobile : builderIds.categoryPage.desktop;

    if (isOnSearchPage) {
        builderId = isMobile ? builderIds.searchPage.mobile : builderIds.searchPage.desktop;
    }
    /* OPT-40479 END */
    var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);
    var campaign = Insider.campaign.get(variationId);
    /* OPT-43654 START */
    var isValidLanguage = (campaign.lang || []).indexOf('all_ALL') > -1 ||
        (campaign.lang || []).indexOf(Insider.systemRules.call('getLang')) > -1;
    /* OPT-43654 END */
    var isControlGroup = Insider.campaign.isControlGroup(variationId);
    var badgeImageUrl = '//image.useinsider.com/skechersau/defaultImageLibrary/wide-fit-skx-badge-1596001972.png';
    var isShownCampaign = false;
    var isJoinedCamp = (Insider.storage.localStorage.get('sp-camp-' + variationId) || {}).joined || false;
    var className = {
        badgeAdded: 'ins-badge-added-' + variationId,
        customBadge: 'ins-custom-badge-' + variationId
    };
    var selector = {
        mainWrapper: '.main-wrapper .column.main',
        productWrapper: '.products.wrapper .product-item-photo'
    };
    var goalId = {
        sales: 8,
        pageView: 9,
        addToCart: 10
    };

    self.init = function () {
        debugger;
        self.reset();
        self.updateSkuList();

        if (isOnCategoryPage || isOnSearchPage) {
            /* OPT-40479 */
            self.checkProductsForBadge();
            self.trackLazyLoading();
        } else if (Insider.systemRules.call('isOnProductPage') && isJoinedCamp) {
            self.setProductPageGoals();
        } else if (Insider.systemRules.call('isOnAfterPaymentPage') && isJoinedCamp) {
            self.checkSalesGoal();
        }

        return true; /* OPT-40479 */
    };
    self.reset = function () {
        Insider.dom('.' + className.customBadge).remove();
        Insider.dom('.' + className.badgeAdded).removeClass(className.badgeAdded);
    };
    self.updateSkuList = function () {
        skuIds = skuIds.map(function (skuId) {
            return skuId.toLowerCase().replace('.', '-');
        });
    };
    /* OPT-54057 START */
    self.findBadgedWrapper = function (searchKey) {
        var productWrapper = Insider.dom(selector.productWrapper + '[href*="' + searchKey + '"]' +
            ':not(.' + className.badgeAdded + ')');

        if (productWrapper.exists()) {
            if (!isShownCampaign) {
                isShownCampaign = Insider.campaign.custom.show(variationId);
            }
            productWrapper.addClass(className.badgeAdded + ' sp-custom-' + variationId + '-1');

            !isControlGroup && self.addCustomBadge(productWrapper);
        }
    };

    self.checkProductsForBadge = function () {
        skuIds.forEach(function (skuId) {
            self.findBadgedWrapper(skuId);
        });
    };
    /* OPT-54057 END */
    self.addCustomBadge = function (productWrapper) {
        productWrapper.append('<img src="' + badgeImageUrl + '" class="' + className.customBadge + '"></div>');
    };
    self.trackLazyLoading = function () {
        Insider.observer.observe(document.querySelector(selector.mainWrapper), function () {
            Insider.dom(selector.productWrapper).exists() && self.checkProductsForBadge();
        });
    };
    self.setProductPageGoals = function () {
        var productSku = (Insider.dom('.product-add-form form')
            .data('product-sku') || '').toLowerCase().replace('.', '-');

        if (isJoinedCamp && skuIds.indexOf(productSku) > -1) {
            Insider.__external.sendCustomGoal(builderId, goalId.pageView);
            Insider.eventManager.once('click.ins:add:cart:' + variationId, '#product-addtocart-button', function () {
                Insider.__external.sendCustomGoal(builderId, goalId.addToCart);
            });
        }
    };
    self.checkSalesGoal = function () {
        var isPaid = Insider.storageAccessor.paidProducts().some(function (product) {
            return skuIds.some(function (skuId) {
                return product.url.indexOf(skuId) > -1;
            });
        });

        if (isPaid) {
            setTimeout(function () {
                Insider.__external.sendCustomGoal(builderId, goalId.sales);
            }, 1500);
        }
    };

    return isValidLanguage && self.init() || false;
})({});
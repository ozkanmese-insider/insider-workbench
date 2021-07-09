/* OPT-62733 Start */
(function (self) {
    var attributeStorageName = 'ins-cart-product-attributes';
    var cartProductAttributes = Insider.storage.get(attributeStorageName) || {};
    var revivalProduct = Insider.storage.get('ins-last-visited-revival-made');
    var vintageProduct = Insider.storage.get('ins-last-visited-vintage');
    var cartProduct = ((Insider.storageAccessor.cartProductList() || {}).productList || {})[0] || [];
    var cartCount = Insider.systemRules.call('getCartCount');
    var activeProduct;
    var activeProductBase;
    var builderId;
    var subTitle = 'Produced in small batches';

    cartProduct.name = decodeURIComponent(cartProduct.name);

    if (cartCount) {
        activeProduct = cartProductAttributes[cartProduct.id];
        activeProductBase = cartProduct;
        (activeProductBase || {}).name = ((activeProductBase || {}).name || {}).split('/')[0].trim();
        builderId = 75;
    } else if (vintageProduct) {
        activeProduct = vintageProduct || '{}';
        activeProductBase = JSON.parse((activeProduct || {}).base || '{}');
        subTitle = 'Only One Made';
        builderId = 77;
    } else if (revivalProduct) {
        activeProduct = revivalProduct || '{}';
        activeProductBase = JSON.parse((activeProduct || '{}').base || '{}');
        builderId = 76;
    }

    var sizeAndSubtitle = ((activeProduct || {}).product_size || '') + ' ' + ((activeProduct || {}).product_subtitle || '');
    var sizeAndSubtitleExists = sizeAndSubtitle !== ' ';
    var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);
    var className = {
        style: 'ins-custom-pop-up-style-' + variationId,
        popup: 'sp-custom-' + variationId
    };
    var storageName = 'ins-popup-closed-' + variationId;

    self.init = function () {
        self.remove();
        self.buildHtml();
        self.setEvents();
    };

    self.remove = function () {
        Insider.dom('.' + className.style).remove();
        Insider.dom('.' + className.popup).remove();
    };

    self.buildHtml = function () {
        Insider.dom('body').append('<div class="' + className.popup + '">' +
            '<div style="line-height: normal;width: 95%;height: 461px;background-color: #fff;overflow: hidden;z-index: 10;position: fixed;margin: auto;left: 0;right: 0;top: 0;bottom: 0;text-align: center;"' +
            'class="ins-custom-wrapper">' +
            '<form id="question-group-form">' +
            '<div class="swiper-container swiper-container-horizontal" style="width: 100%; height: 100%;">' +
            '<div class="swiper-wrapper">' +
            '<div class="swiper-slide" style="width: 100%;height: 90%;border-color: rgb(255, 255, 255);">' +
            '<div class="ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se"' +
            'style="z-index: 90; display: none;"></div>' +
            '<div id="wrap-text-1619615021414" class=" element-text" style="position: absolute;left: 0;right: 0;top: 20px;z-index: 1;">' +
            '<div id="text-1619615021414" style="width: auto; height: auto; min-height: 29px; padding: 5px; font-family: Roboto, sans-serif; box-shadow: none;">' +
            '<div id="editable-text-1619615021414" style="outline: none; overflow-wrap: break-word; word-break: break-word;">' +
            '<div style="text-align: center;"><span style="color:#262e3d;"><strong><span style="font-size:30px;">' +
            '<span style="font-family:iransans-light !important;">Don&apos;t miss out.</span></span></strong></span></div>' +
            '</div></div></div>' +
            '<div id="wrap-text-1619615792380" class=" element-text" style="position: absolute;left: 0;top: 70px;z-index: 1;right: 0;">' +
            '<div id="text-1619615792380" style="width: auto;height: auto;min-height: 29px;padding: 5px;font-family: Roboto, sans-serif;box-shadow: none;">' +
            '<div id="editable-text-1619615792380" style="outline: none; overflow-wrap: break-word; word-break: break-word;">' +
            '<div style="text-align: center;"><span style="font-size:14px;">' +
            '<span style="color: #22262C; font-family: Roboto, sans-serif !important;">' + subTitle + '</span></span></div></div></div></div>' +
            '<div id="wrap-button-1619616133608" class=" element-button" style="position: absolute;left: 0;top: 340px;right: 0;z-index: 1;">' +
            '<div id="button-1619616133608" style="width: 128px;height: 38px;background-color: rgb(177, 78, 46);border-style: solid;border-width: 1px;border-color: rgb(177, 78, 46);box-shadow: none;margin: auto;">' +
            '<a id="link-button-1619616133608" class="element-link" href="#" slide-type="none" style="width: 100%; height: 100%; display: table; color: rgb(255, 255, 255);">' +
            '<div id="editable-button-1619616133608" style="width: 100%; height: 100%; outline: none; overflow-wrap: break-word; word-break: break-word; display: table-cell; vertical-align: middle; color: rgb(255, 255, 255);">' +
            '<div style="text-align: center;"><span style="font-size: 14px; font-family: Roboto, sans-serif !important;">Checkout</span>' +
            '</div></div></a></div></div>' +
            '<div id="wrap-text-1619616740750" class=" element-text" style="transform: translate(-50%, 0); position: absolute; left: 50%; top: 280px; z-index: 1;">' +
            '<div id="text-1619616740750" style="width: 500px; height: auto; min-height: 29px; padding: 5px; font-family: Roboto, sans-serif; border-color: rgb(0, 0, 0);">' +
            '<div id="editable-text-1619616740750" style="outline: none; overflow-wrap: break-word; word-break: break-word;">' +
            '<div style="text-align: center;"><span style="color:#262e3d;"><span style="font-size:14px;">' +
            '<span style="font-size:18px; font-family: Roboto, sans-serif !important;">' + (sizeAndSubtitleExists ? sizeAndSubtitle + ' - ' : '') + activeProductBase.name + '<br>' +
            '<strong style="font-size:18px; font-family: Roboto, sans-serif !important;">&ZeroWidthSpace;$' + activeProductBase.price + '</strong></span><br></span></span>' +
            '</div></div></div></div>' +
            '<div id="wrap-image-1619617522977" class=" element-image" style="position: absolute;left: 0;right: 0;top: 100px;z-index: 1;">' +
            '<div id="image-1619617522977" style="overflow: hidden;height: auto;width: auto;box-shadow: none;/* margin: auto; */">' +
            '<a href="' + activeProductBase.url + 'id="link-image-1619617522977" class="element-link"' +
            'style="width: 100%;height: 100%;display: block;color: rgb(255, 255, 255);">' +
            '<img src=' + activeProductBase.img + ' id="img-image-1619617522977" class="element-image"' +
            'style="display: block;width: auto;max-height: 170px;margin: auto;"></a></div></div>' +
            '<div id="wrap-button-1619697695905" class=" element-button ajax-submit"' +
            'style="position: absolute;left: 0;right: 0;top: 390px;z-index: 1;">' +
            '<div id="button-1619697695905"' +
            'style="width: auto;height: 40px;background-color: rgb(255, 255, 255);font-family: Roboto, sans-serif;border-width: 0px;opacity: 1;">' +
            '<a id="link-button-1619697695905" class="element-link"' +
            'href="https://www.revivalrugs.com/pages/design-support" slide-type="none"' +
            'style="width: 100%; height: 100%; display: table; color: rgb(255, 255, 255);">' +
            '<div id="editable-button-1619697695905"' +
            'style="width: 100%; height: 100%; outline: none; overflow-wrap: break-word; word-break: break-word; display: table-cell; vertical-align: middle; color: rgb(255, 255, 255);">' +
            '<div style="text-align: center;"><span style="color:#20323d;"><span' +
            'style="font-size: 12px; font-family: Roboto, sans-serif !important;">Not' +
            'sure? Get a <strong><u style="font-family: Roboto, sans-serif !important;">&ZeroWidthSpace;free' +
            'design consulation.</u></strong></span></span></div>' +
            '</div></a></div></div></div></div></div></form>' +
            '<div id="wrap-close-button-1619101761293" class=" element-close-button" style="position: absolute;left: 485px;top: 6px;z-index: 1;">' +
            '<div id="close-button-1619101761293" class="element-content" style="width: auto; height: auto; color: rgb(28, 51, 63); text-align: center; cursor: pointer; font-size: 17px; line-height: 1; opacity: 1;">' +
            '<i class="fa fa-times element-close-button" id="icon-close-button-1619101761293" style="box-sizing: inherit;"></i></div>' +
            '</div></div><div class="ins-custom-overlay"></div></div>');

        Insider.dom('head').append('<style class=\'' + className.style + '\'> .ins-custom-overlay{' +
            'position: fixed; top: 0; left: 0; height: 100%; width: 100%; z-index: 9; background: black; opacity: 0.6;}' +
            '.fa-times:before {content: \'\f00d\';}*swiper-pagination-wrap{bottom:10px;top:auto!important}' +
            '@font-face{font-family:IRANSans-Light;src:local(\'IRANSans-Light\');' +
            'src:url(https://font.static.useinsider.com/IRANSans/IRANSans-Light.eot);' +
            'src:url(https://font.static.useinsider.com/IRANSans/IRANSans-Light.eot?#iefix) format(\'embedded-opentype\'),' +
            'url(https://font.static.useinsider.com/IRANSans/IRANSans-Light.woff2) format(\'woff2\'),' +
            'url(https://font.static.useinsider.com/IRANSans/IRANSans-Light.woff) format(\'woff\'),' +
            'url(https://font.static.useinsider.com/IRANSans/IRANSans-Light.ttf) format(\'truetype\');font-weight:300;font-style:normal}' +
            '.swiper-pagination-bullet { background: #000000; color: #000000;}' +
            '.swiper-pagination-bullet-active { background: #007AFF!important; color: #007AFF;}' +
            '.swiper-button-next, .swiper-button-prev { color: #007AFF!important}</style>');

        Insider.dom('head').append('<link class="swiper-style-class" rel="stylesheet"' +
            ' href="https://assets.api.useinsider.com/fonts/font-awesome/css/font-awesome.css" type="text/css" media="screen">');
    };

    self.setEvents = function () {
        Insider.eventManager.once('click.add:to:cart:button:' + variationId, '#wrap-button-1619616133608', function () {
            if (!Insider.systemRules.call('getCartCount')) {
                var payload = {
                    product: activeProductBase
                };

                Insider.systemRules.spAddToCart().addToBasket(activeProductBase.id, Insider.fns.noop(), payload);
            }

            Insider.storage.set({ name: storageName, value: true, expires: 1 }, 'localStorage', true);

            setTimeout(function () {
                window.location.href = 'https://www.revivalrugs.com/cart';
            }, 1000);
        });

        Insider.eventManager.once('click.close:button:' + variationId, '#wrap-close-button-1619101761293', function () {
            self.remove();

            Insider.storage.set({ name: storageName, value: true, expires: 1 }, 'localStorage', true);
        });

        Insider.eventManager.once('click.overlay:' + variationId, '.ins-custom-overlay', function () {
            self.remove();

            Insider.storage.set({ name: storageName, value: true, expires: 1 }, 'localStorage', true);
        });
    };

    self.exitIntent = function () {
        var listenScroll = function (callback) {
            var lastOffset = Insider.dom(window).scrollTop();
            var lastDate = new Date().getTime();
            var listeningScrollDirection = 'Up';
            var isRun = false;
            var scrollEvent = 'scroll.ins-' + builderId;

            Insider.eventManager.once(scrollEvent, window, function (event) {
                var delayInMs = event.timeStamp - lastDate;
                var offset = event.target.scrollingElement.scrollTop - lastOffset;
                var speedPerMs = offset / delayInMs;

                if (!isRun && listeningScrollDirection === 'Up' && speedPerMs < -4) {
                    isRun = true;

                    Insider.eventManager.off(scrollEvent);

                    callback();
                }

                lastDate = event.timeStamp;
                lastOffset = event.target.scrollingElement.scrollTop;
            });
        };

        listenScroll(function () {
            self.init();
        });
    };

    if (!Insider.storage.get(storageName) && activeProduct && (activeProductBase.img !== 'https:') &&
        !(Insider.storage.localStorage.get('sp-camp-' + variationId) || {}).joined) {
        self.exitIntent();
    }

    (Insider.__external.newAjaxListener || Insider.fns.noop)(function (url) {
        if (url.indexOf('/cart/') > -1) {
            if (url.indexOf('/cart/add') > -1 && Insider.systemRules.call('isOnProductPage')) {
                cartProductAttributes[Insider.systemRules.call('getCurrentProduct').id] = Insider.getCustomProductAttributes();
            } else if (url.indexOf('/cart/update') > -1) {
                var cartProductTemp = Insider.storageAccessor.cartProductList().productList.filter(function (index) {
                    return cartProductAttributes[index.id] !== undefined;
                });

                cartProductAttributes = cartProductTemp;
            }

            if (cartProductAttributes.length === 0) {
                Insider.storage.localStorage.remove(attributeStorageName);
            } else {
                Insider.storage.localStorage.set({ name: attributeStorageName, value: cartProductAttributes });
            }
        }
    });
})({});

false;
/* OPT-62733 End */
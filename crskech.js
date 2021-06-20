/* OPT-62004 Start */
(function (self) {
    var revivalProduct = JSON.parse((Insider.storageAccessor.customAttributes() || {})
        .last_visited_revival_product || '');
    var vintageProduct = JSON.parse((Insider.storageAccessor.customAttributes() || {})
        .last_visited_vintage_product || '');
    var cartProduct = ((Insider.storageAccessor.cartProductList() || {}).productList || {})[0] || [];
    var activeProduct;
    var builderId;

    if (Insider.systemRules.call('getCartCount')) {
        activeProduct = cartProduct;
        builderId = 50;
    } else if (vintageProduct) {
        activeProduct = vintageProduct;
        builderId = 52;
    } else {
        activeProduct = revivalProduct;
        builderId = 51;
    }

    var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);
    var className = {
        style: 'ins-custom-pop-up-style-' + variationId,
        popup: 'ins-custom-pop-up-' + variationId + ' sp-custom-' + variationId
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
            '<div style="line-height: normal; width: 511px;height: 461px;background-color: #fff;overflow: hidden;z-index: 10;position: fixed;margin-left: auto;margin-right: auto;left: 0;right: 0;top: 0;text-align: center;transform: translate(0%, 50%);" class="ins-custom-wrapper">' +
            '    <form id="question-group-form">' +
            '        <div class="swiper-container swiper-container-horizontal" style="width: 100%; height: 100%;">' +
            '            <div class="swiper-wrapper">' +
            '                <div class="swiper-slide" style="width: 511px; height: 461px; border-color: rgb(255, 255, 255);">' +
            '                    <div class="ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se" style="z-index: 90; display: none;"></div>' +
            '                    <div id="wrap-text-1619615021414" class=" element-text" style="position: absolute; left: 140px; top: 20px; z-index: 1;">' +
            '                        <div id="text-1619615021414" style="width: auto; height: auto; min-height: 29px; padding: 5px; font-family: Roboto, sans-serif; box-shadow: none;">' +
            '                            <div id="editable-text-1619615021414" style="outline: none; overflow-wrap: break-word; word-break: break-word;">' +
            '                                <div style="text-align: center;"><span style="color:#262e3d;"><strong><span style="font-size:30px;"><span style="font-family:iransans-light !important;">Don&apos;t miss' +
            '                                                    out.</span></span></strong></span></div>' +
            '                            </div>' +
            '                        </div>' +
            '                    </div>' +
            '                    <div id="wrap-text-1619615792380" class=" element-text" style="position: absolute; left: 150px; top: 70px; z-index: 1;">' +
            '                        <div id="text-1619615792380" style="width: 198px; height: auto; min-height: 29px; padding: 5px; font-family: Roboto, sans-serif; box-shadow: none;">' +
            '                            <div id="editable-text-1619615792380" style="outline: none; overflow-wrap: break-word; word-break: break-word;">' +
            '                                <div style="text-align: center;"><span style="font-size:14px;"><span style="color: #22262C; font-family: Roboto, sans-serif !important;">Produced in small batches</span></span></div>' +
            '                            </div>' +
            '                        </div>' +
            '                    </div>' +
            '                    <div id="wrap-button-1619616114001" class=" element-button" style="position: absolute; left: 120px; top: 340px; z-index: 1;">' +
            '                        <div id="button-1619616114001" style="width: 119px; height: 38px; background-color: rgb(255, 255, 255); font-family: Roboto, sans-serif; opacity: 1; border-width: 1px; border-color: rgb(38, 46, 61); border-style: solid; box-shadow: none;">' +
            '                            <a id="link-button-1619616114001" class="element-link" href="#" slide-type="none" style="width: 100%; height: 100%; display: table; color: rgb(255, 255, 255);">' +
            '                                <div id="editable-button-1619616114001" style="width: 100%; height: 100%; outline: none; overflow-wrap: break-word; word-break: break-word; display: table-cell; vertical-align: middle; color: rgb(255, 255, 255);">' +
            '                                    <div style="text-align: center;"><span style="color:#262e3d;"><span style="font-size: 14px; font-family: Roboto, sans-serif !important;">Wishlist</span></span></div>' +
            '                                </div>' +
            '                            </a></div>' +
            '                    </div>' +
            '                    <div id="wrap-button-1619616133608" class=" element-button" style="position: absolute; left: 270px; top: 340px; z-index: 1;">' +
            '                        <div id="button-1619616133608" style="width: 119px; height: 38px; background-color: rgb(177, 78, 46); font-family: Roboto, sans-serif; border-style: solid; border-width: 1px; border-color: rgb(177, 78, 46); box-shadow: none;">' +
            '                            <a id="link-button-1619616133608" class="element-link" href="#" slide-type="none" style="width: 100%; height: 100%; display: table; color: rgb(255, 255, 255);">' +
            '                                <div id="editable-button-1619616133608" style="width: 100%; height: 100%; outline: none; overflow-wrap: break-word; word-break: break-word; display: table-cell; vertical-align: middle; color: rgb(255, 255, 255);">' +
            '                                    <div style="text-align: center;"><span style="font-size: 14px; font-family: Roboto, sans-serif !important;">Checkout</span>' +
            '                                    </div>' +
            '                                </div>' +
            '                            </a></div>' +
            '                    </div>' +
            '                    <div id="wrap-text-1619616740750" class=" element-text" style="transform: translate(-50%, 0); position: absolute; left: 50%; top: 280px; z-index: 1;">' +
            '                        <div id="text-1619616740750" style="width: auto; height: auto; min-height: 29px; padding: 5px; font-family: Roboto, sans-serif; border-color: rgb(0, 0, 0);">' +
            '                            <div id="editable-text-1619616740750" style="outline: none; overflow-wrap: break-word; word-break: break-word;">' +
            '                                <div style="text-align: center;"><span style="color:#262e3d;"><span style="font-size:14px;"><span style="font-size:18px; font-family: Roboto, sans-serif !important;">' + activeProduct.name +
            '<br><strong style="font-size:18px; font-family: Roboto, sans-serif !important;">&ZeroWidthSpace;$' + activeProduct.price + '</strong></span><br></span></span>' +
            '                                </div>' +
            '                            </div>' +
            '                        </div>' +
            '                    </div>' +
            '                    <div id="wrap-image-1619617522977" class=" element-image" style="position: absolute; left: 130px; top: 110px; z-index: 1;">' +
            '                        <div id="image-1619617522977" style="overflow: hidden; width: 249px; height: 158px; box-shadow: none;"><a href="' + activeProduct.url + '" id="link-image-1619617522977" class="element-link" style="width: 100%; height: 100%; display: block; color: rgb(255, 255, 255);"><img src="' + activeProduct.img + '" id="img-image-1619617522977" class="element-image" style="display: block; width: 100%; height: 100%;"></a></div>' +
            '                    </div>' +
            '                    <div id="wrap-button-1619697695905" class=" element-button ajax-submit" style="position: absolute; left: 140px; top: 390px; z-index: 1;">' +
            '                        <div id="button-1619697695905" style="width: 229px; height: 40px; background-color: rgb(255, 255, 255); font-family: Roboto, sans-serif; border-width: 0px; opacity: 1;">' +
            '                            <a id="link-button-1619697695905" class="element-link" href="https://www.revivalrugs.com/pages/design-support" slide-type="none" style="width: 100%; height: 100%; display: table; color: rgb(255, 255, 255);">' +
            '                                <div id="editable-button-1619697695905" style="width: 100%; height: 100%; outline: none; overflow-wrap: break-word; word-break: break-word; display: table-cell; vertical-align: middle; color: rgb(255, 255, 255);">' +
            '                                    <div style="text-align: center;"><span style="color:#20323d;"><span style="font-size: 12px; font-family: Roboto, sans-serif !important;">Not sure? Get' +
            '                                                a <strong><u style="font-family: Roboto, sans-serif !important;">&ZeroWidthSpace;free design' +
            '                                                        consulation.</u></strong></span></span></div>' +
            '                                </div>' +
            '                            </a></div>' +
            '                    </div>' +
            '                </div>' +
            '            </div>' +
            '        </div>' +
            '    </form>' +
            '    <div id="wrap-close-button-1619101761293" class=" element-close-button" style="position: absolute;left: 485px;top: 6px;z-index: 1;">' +
            '        <div id="close-button-1619101761293" class="element-content" style="width: auto; height: auto; color: rgb(28, 51, 63); text-align: center; cursor: pointer; font-size: 17px; line-height: 1; opacity: 1;">' +
            '            <i class="fa fa-times element-close-button" id="icon-close-button-1619101761293" style="' +
            'box-sizing: inherit;' +
            '"></i></div>' +
            '    </div>' +
            '</div>' +
            '<div class="ins-custom-overlay"></div>' +
            '</div>');

        Insider.dom('head').append('<style class="' + className.style + '"> .ins-custom-overlay{' +
            'position: fixed; top: 0; left: 0; height: 100%; width: 100%; z-index: 9; background: black; opacity: 0.6;}' +
            '.fa-times:before {content: "\f00d";}*swiper-pagination-wrap{bottom:10px;top:auto!important}' +
            '@font-face{font-family:IRANSans-Light;src:local(&apos;IRANSans-Light&apos;);' +
            'src:url(https://font.static.useinsider.com/IRANSans/IRANSans-Light.eot);' +
            'src:url(https://font.static.useinsider.com/IRANSans/IRANSans-Light.eot?#iefix) format(&apos;embedded-opentype&apos;),' +
            'url(https://font.static.useinsider.com/IRANSans/IRANSans-Light.woff2) format(&apos;woff2&apos;),' +
            'url(https://font.static.useinsider.com/IRANSans/IRANSans-Light.woff) format(&apos;woff&apos;),' +
            'url(https://font.static.useinsider.com/IRANSans/IRANSans-Light.ttf) format(&apos;truetype&apos;);font-weight:300;font-style:normal}' +
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
                    product: activeProduct
                };

                Insider.systemRules.spAddToCart().addToBasket('32277877588067', Insider.fns.noop(), payload);
            }

            setTimeout(function () {
                window.location.href = 'https://www.revivalrugs.com/cart';
            }, 500);
        });

        Insider.eventManager.once('click.add:to:wishlist:button:' + variationId, '#wrap-button-1619616114001', function () {
            window.location.href = activeProduct.url;
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

    var exitIntent = function () {
        var timeStamp = null;
        var lastMouseY = null;

        Insider.eventManager.off('mousemove.ins:check:exit:intent:' + variationId, window)
            .on('mousemove.ins:check:exit:intent:' + variationId, window, function (event) {
                if (event.clientY <= 100) {
                    if (timeStamp === null) {
                        timeStamp = Insider.dateHelper.getTime();
                        lastMouseY = event.screenY;
                    }

                    var now = Date.now();
                    var timeDifference = now - timeStamp;
                    var yDifference = event.screenY - lastMouseY;
                    var speedY = Math.round(yDifference / timeDifference * 100);

                    timeStamp = now;
                    lastMouseY = event.screenY;

                    if (speedY <= -500) {
                        self.init();
                        Insider.campaign.custom.show(variationId);
                        Insider.eventManager.off('mousemove.ins:check:exit:intent:' + variationId, window);
                    }
                }
            });
    };

    if (Insider.storage.get(storageName)) {
        exitIntent();
    }
})({});

false;
/* OPT-62004 End */

/* OPT-62004 Start */
if (Insider.systemRules.call('isOnProductPage') && Insider.dom('#product-sticky-form')
    .attr('data-product').indexOf('revival-made') > -1) {
    JSON.stringify(Insider.systemRules.call('getCurrentProduct'));
}
/* OPT-62004 End */
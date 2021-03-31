Insider.__external.editRecommender42326 = function (variation) {
    var self = {};
    var variationId = variation;
    var attributeName = 'data-product';
    var storageName = 'ins-wishlist-item-ids';
    var tagSeletor = '.ins-dynamic-element-tag';
    var wrapperSelector = '.ins-preview-wrapper-' + variationId;
    var wishlistIds = Insider.storage.localStorage.get(storageName) || [];
    var selectors = {
        imageBoxSelector: '.ins-image-box',
        wishlistsSelector: '.ins-wishlist',
        productBoxSelector: '.ins-product-box',
        productNameSelector: '.ins-product-name',
        discountSelector: '.ins-product-discount',
        productPriceSelector: '.ins-product-price',
        percentageSelector: '.ins-discount-percentage',
        badgeSelector: '[data-element-name="@badge_html"]',
        colorSelector: '[data-element-name="@color_html"]',
        boxSelector: '.ins-web-smart-recommender-box-item',
        wishlistSelector: wrapperSelector + ' .ins-wishlist',
        priceHTMLselector: wrapperSelector + ' [data-element-name="@price_html"] .ins-dynamic-element-tag',
        attributeSelector: wrapperSelector + ' .ins-product-attribute-wrapper:not([data-element-name="@price_html"]) ' +
            tagSeletor,
    };
    var styleTag = '' +
        wrapperSelector + ' .ins-product-discount-container {' +
        '    margin-bottom: 2px;' +
        '}' +
        'a.ins-wishlist i:hover {' +
        '    color: #1a3979 !important;' +
        '}' +
        wrapperSelector + ' .ins-product-discount {' +
        '     text-decoration-line:unset !important;' +
        '}' +
        wrapperSelector + ' .ins-product-discount-container {' +
        '     margin-bottom: 5px; !important; margin-top: -7px;' +
        '}' +
        wrapperSelector + ' .ins-edit-display {' +
        '     height: 24px;' +
        '}' +
        '[data-element-name="@price_html"] {' +
        ' color: black !important' +
        '}' +
        selectors.attributeSelector + ' {' +
        '     display: none !important;' +
        '}';

    self.init = function () {
        Insider.fns.onElementLoaded(wrapperSelector, function () {
            setTimeout(function () {
                self.reset();
                self.editAttribute();
                self.editHTML();
                self.editPriceHTML();
                self.addEvent();
                self.addBadge();
                self.addWishlist();
            }, 300);
        }).listen();
    };

    self.reset = function () {
        Insider.dom(wrapperSelector + ' .ins-discount-value').remove();
        Insider.dom(wrapperSelector + ' .ins-wishlist').remove();
        Insider.dom('.ins-custom-style-' + variationId).remove();
    };

    self.editAttribute = function () {
        if (Insider.systemRules.call('isOnProductPage')) {
            styleTag += (wrapperSelector + ' .ins-content-wrapper {' +
                '    width: 80%;' +
                '    margin: 0 auto;' +
                '}');
        }

        Insider.dom('head').append('<style class="ins-custom-style-' + variationId + '">' + styleTag + '</style>');

        Insider.fns.onElementLoaded(selectors.attributeSelector, function () {
            setTimeout(function () {
                Insider.dom(selectors.attributeSelector).nodes.forEach(function (element) {
                    var elementText = Insider.dom(element).text();

                    if (elementText.indexOf('Calacatta') > -1 || elementText.indexOf('Branco artico') > -1) {
                        Insider.dom(element).text(' ');
                    }

                    if ((elementText.indexOf('data-src') > -1 || elementText.indexOf('has-image') > -1 ||
                            elementText.indexOf('content') > -1) && elementText.indexOf('no cartão') === -1) {
                        var html = elementText.replace('data-src', 'src').replace('data-src', 'src')
                            .replace('lazy-mara', '').replace('lazy-mara', '');

                        Insider.dom(element).text('');

                        Insider.dom(element).append(html);

                        Insider.dom(selectors.attributeSelector).attr('style', 'display:block !important'); /* */
                        Insider.dom(selectors.attributeSelector + ' #configurable_swatch_cor').attr('style', 'display:flex !important'); /* OPT */
                        Insider.dom('.ins-dynamic-text-area > div:last-child span').attr('style', 'display: none !important;');

                    }
                });
            }, 800);
        }).listen();
    };

    self.editHTML = function () {
        Insider.fns.onElementLoaded(wrapperSelector + ' [data-element-name="@color_html"]', function () {
            setTimeout(function () {
                Insider.dom(wrapperSelector + ' ' + selectors.boxSelector).nodes.forEach(function (element) {
                    Insider.dom(selectors.colorSelector + ' a', element).removeClass('has-image swatch-link');
                    Insider.dom(selectors.colorSelector + ' a span', element).removeClass('swatch-label');
                    Insider.dom(selectors.colorSelector + ' .gtm_product_color span').remove();

                    Insider.dom(selectors.badgeSelector + ' .content', element).addClass('ins-edit-display');
                    Insider.dom(selectors.badgeSelector + ' .content img', element).addClass('ins-edit-margin');
                    Insider.dom(selectors.colorSelector + ' li img', element).addClass('ins-edit-scale');
                    Insider.browser.name === 'IE' &&
                        Insider.dom(selectors.productNameSelector, element).addClass('ins-margin');

                    Insider.dom(wrapperSelector + ' .x', element).remove();

                    Insider.dom('.ins-description-box', element).before(Insider.dom(selectors.badgeSelector, element));

                    /* QH */
                    if (Insider.dom(selectors.badgeSelector, element).text().trim() === '@badge_html') {
                        Insider.dom(selectors.badgeSelector, element).css('opacity', '0');
                    }
                    /* QH */

                    setTimeout(function () {
                        self.editProductBox(Insider.dom(selectors.imageBoxSelector, element).nodes[0]);
                    }, 500);

                    if (Insider.dom(selectors.percentageSelector, element).text() === '0') {
                        Insider.dom(selectors.percentageSelector, element).parent('.ins-discount-badge').remove();
                    }
                });

                Insider.dom(wrapperSelector + ' .ins-dynamic-text-area').show();

            }, 900);
        }).listen();
    };

    self.editPriceHTML = function () {
        Insider.fns.onElementLoaded(selectors.priceHTMLselector, function () {
            setTimeout(function () {
                Insider.dom(selectors.priceHTMLselector).nodes.forEach(function (element) {
                    var elementText = Insider.dom(element).text();
                    var newText;

                    if (elementText.indexOf(' R$') !== -1) {
                        newText = '<b style="color:black;font-size:16px !important;">' + elementText.split(' R$').shift() +
                            '</b> R$ ' + elementText.split(' R$').pop();
                    }

                    Insider.dom(element).text(' ');
                    Insider.dom(element).append(newText.replace('de', ''));
                });
            }, 300);
        }).listen();
    };

    self.editProductBox = function (selector) {
        var firstHref = Insider.dom(selector).parents('.ins-web-smart-recommender-inner-box')
            .find(selectors.productBoxSelector).attr('href');
        var otherHref = Insider.dom(selector).parents('a:first').attr('href');
        var href = otherHref !== 'javascript:;' ? otherHref : firstHref;
        var productId = href.split('--').pop().split('.html').shift();

        if (productId) {
            Insider.request.get({
                url: 'https://api-price.marabraz.com.br/prices/' + productId + '/site',
                data: '',
                success: function (data) {
                    if (data && ((Insider.fns.parse(data.response) || {}).status) === 'OK') {
                        var responseData = (((Insider.fns.parse(data.response) || {}).data || {})[0]) || {};
                        var configuration = {
                            productId: productId,
                            targetElement: Insider.dom(selector).parents(selectors.boxSelector),
                            originalPrice: responseData.price || 0,
                            discountPrice: responseData.cash_price || 0,
                            discountAmount: responseData.percentage_discount || 0,
                            name: Insider.dom(selector).attr('alt') || '',
                            intallmentLabel: responseData.installments_label || '',
                            wishlistId: responseData.entity_id || ''
                        };

                        self.editItems(configuration);
                    }
                }
            });
        }
    };

    self.editItems = function (config) {
        if (config.productId && config.targetElement && config.originalPrice && config.discountPrice &&
            config.discountAmount && config.intallmentLabel) {
            var imageSelector = config.targetElement.find(selectors.imageBoxSelector);
            var productName = config.targetElement.find(selectors.productNameSelector).text();
            var productIdUpdated = config.productId.replace(/[^0-9,.]/g, '');

            config.targetElement.find(selectors.discountSelector)
                .text(self.formPrice(String(config.originalPrice).replace('.', ',')));
            config.targetElement.find(selectors.wishlistsSelector)
                .attr(attributeName, config.wishlistId);
            config.targetElement.find('.ins-wishlist i')
                .attr(attributeName, config.wishlistId);
            config.targetElement.find(selectors.productPriceSelector)
                .text(self.formPrice(String(config.discountPrice).replace('.', ',')));
            config.targetElement.find(selectors.percentageSelector)
                .text(config.discountAmount.replace(/[^0-9,.]/g, ''));
            config.targetElement.find('[data-element-name="@price_html"] .ins-dynamic-element-tag')
                .text(config.intallmentLabel.replace('s/ juros', 'no cartão').replace('de', ''));
            config.name !== '' && config.targetElement.find(selectors.productNameSelector)
                .text((productName.substr(0, productName.lastIndexOf(' - ')) || productName) + ' - ' + config.name);
            !config.targetElement.find('.ins-custom-discount').exists() &&
                config.targetElement.find('[data-element-name="@price_html"]').after(
                    '<div class="ins-custom-discount ins-discount-value" style="font-family: nerisblack, sans-serif; font-size: 12px; text-transform: uppercase; color: #7c9d21; margin: 2px 0; border: 1px solid #7c9d21; text-align: center; padding: 3px;">' +
                    '   <span class="ins-discount-slot"></span> ' +
                    '</div>');
            config.targetElement.find('.ins-discount-value')
                .text('  ECONOMIZE R$' + (config.originalPrice - config.discountPrice).toFixed(2).replace('.', ','));

            imageSelector.css('background-image', imageSelector.css('background-image')
                .replace(/[\+]?\d{10,15}/, productIdUpdated));
        }
        self.editPriceHTML();
    };

    self.formPrice = function (text) {
        var price = parseFloat(text.replace(/[^0-9,]/g, '').replace(',', '.'))
            .toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        return 'R$' + price;
    };

    self.addEvent = function () {
        Insider.eventManager.once('click.ins:color', wrapperSelector + ' .gtm_product_color', function (event) {
            event.stopPropagation();
            event.preventDefault();

            if (event.target.className === 'gtm_product_color ins-edit-scale') {
                self.editProductBox(event.target);
            }
        });
    };

    self.addBadge = function () {
        Insider.fns.onElementLoaded(wrapperSelector + ' ' + selectors.imageBoxSelector, function () {
            setTimeout(function () {
                Insider.dom(wrapperSelector + ' ' + selectors.boxSelector).nodes.forEach(function (element) {
                    var productIdText = Insider.dom('[data-element-name="@wishlist_id"]', element).text();
                    var productId = productIdText.indexOf('@wishlist_id') === -1 ? productIdText : '';
                    var wishlistClass = wishlistIds.indexOf(productId) > -1 ? 'active' : '';
                    var badgeHTML =
                        '<a href="javascript:void(0)" data-product="' + productId + '" target="_parent" class="' + wishlistClass + ' ins-wishlist wishlist wishlistBtn"title="Adicionar à Lista de Desejos"style=" background:#bbb; border:2px solid transparent; border-radius: 50% !important;left:4%; top: 25px; z-index: 2; color: #1a3979; text-decoration: none; opacity: 1; touch-action: manipulation; display: block; position: absolute; height: 24px; width: 24px; text-align: center; -webkit-border-radius: 50%; -moz-border-radius: 50%;">' +
                        '   <i  data-product="' + productId + '" class="fa fa-heart" aria-hidden="true"style=" color:#fff; transform: scale(1); top: 0; font: 14px/1 FontAwesome; font-size: 12px; text-rendering: auto; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; display: block; line-height: 22px;"></i>' +
                        '</a>';

                    Insider.dom(selectors.productBoxSelector, element).before(badgeHTML);
                });
            }, 600);
        }).listen();
    };

    self.addWishlist = function () {
        Insider.fns.onElementLoaded(selectors.wishlistSelector, function () {
            setTimeout(function () {
                Insider.eventManager.once('click.ins:wishlist:' + variationId, selectors.wishlistSelector,
                    function (event) {
                        Insider.dom(event.target).parent(selectors.wishlistsSelector).toggleClass('active');

                        var productId = Insider.dom(event.target).attr(attributeName) || '';

                        typeof window.ajaxWishlistFn === 'function' &&
                            window.ajaxWishlistFn(productId, Insider.dom(event.target).nodes[0]);

                        self.setWishlistStorage(productId);
                    });
            }, 600);
        }).listen();
    };

    self.setWishlistStorage = function (id) {
        var index = wishlistIds.indexOf(id);

        if (index > -1) {
            wishlistIds.splice(index, 1);
        } else {
            wishlistIds.push(id);
        }

        Insider.storage.localStorage.set({
            name: storageName,
            value: wishlistIds,
            expires: 30
        });
    };

    self.init();

};

true;
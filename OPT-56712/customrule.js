/* OPT-56712 START */
var builderId = 40;
var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);
var campaignLanguage = Insider.campaign.get(variationId).lang[0];

Insider.utils.onExitIntended(true, function () {
    if (campaignLanguage === Insider.systemRules.call('getLang') || campaignLanguage === 'es_ES') {
        (function (self) {
            var $cartIcon = Insider.dom('.ico-tablet-cart.icon-carrito.ico-cart');
            var classes = {
                wrapper: 'ins-cart-reminder-wrapper-' + variationId,
                arrow: 'ins-cart-reminder-arrow-' + variationId,
                header: 'ins-cart-reminder-header-container-' + variationId,
                body: 'ins-cart-reminder-body-' + variationId,
                footer: 'ins-cart-reminder-footer-' + variationId,
                totalCartPrice: 'ins-total-cart-price-' + variationId,
                closeButton: 'ins-close-button-' + variationId,
                cartReminderButton: 'ins-cart-reminder-button-' + variationId,
                cartReminderItem: 'ins-cart-reminder-item-' + variationId,
                itemInfoWrapper: 'ins-cart-reminder-item-wrapper-' + variationId,
                itemUrl: 'ins-cart-reminder-item-url-' + variationId,
                itemImage: 'ins-cart-reminder-item-image-' + variationId,
                itemNameWrapper: 'ins-cart-reminder-name-wrapper-' + variationId,
                itemName: 'ins-cart-reminder-item-name-' + variationId,
                itemPrice: 'ins-cart-reminder-item-price-' + variationId,
                customStyle: 'ins-style-' + variationId,
                defaultGoal: 'sp-custom-' + variationId + '-1',
                overlay: 'ins-overlay-' + variationId
            };
            var paidProducts = Insider.storage.localStorage.get('ins-cart-product-list') || {};
            var totalCartAmount = Insider.storage.localStorage.get('total-cart-amount');

            Insider.__external.isCartReminderShown = !!Insider.storage.session.get('ins-cart-reminder-shown');

            self.init = function () {
                if (totalCartAmount !== 0 && !Insider.__external.isCartReminderShown) {
                    if (!Insider.campaign.isControlGroup(variationId)) {
                        self.reset();
                        self.setCartReminderHtml();
                        self.setCSS();
                        self.setEvents();
                        self.setSessionStorage();
                    }
                }
            };

            self.reset = function () {
                Insider.dom('.' + classes.overlay + ', .' + classes.wrapper + ' , .' + classes.customStyle).remove();
            };

            self.setCartReminderHtml = function () {
                var reminderHtml =
                    '<div class="' + classes.overlay + '"></div>' +
                    '<div class="' + classes.wrapper + '">' +
                    '   <div class="' + classes.arrow + '"></div>' +
                    '   <div class="' + classes.header + '">' +
                    '       <div class="' + classes.totalCartPrice + '">Tienes productos en tu carrito: ' +
                    Insider.systemRules.call('getTotalCartAmount').toFixed(2).replace('.', ',') + ' EUR</div>' +
                    '       <div class="' + classes.closeButton + '">×</div>' +
                    '   </div>' +
                    '   <div class="' + classes.body + '">' +
                    self.setCartReminderItemsHtml() +
                    '   </div>' +
                    '   <div class="' + classes.footer + '">' +
                    '       <div class="' + classes.cartReminderButton + ' ' + classes.defaultGoal +
                    '">Ir al carrito</div>' +
                    '   </div>' +
                    '</div>';

                $cartIcon.after(reminderHtml);
            };

            self.setCartReminderItemsHtml = function () {
                var productHtml = '';

                Insider.dom(paidProducts.productList).each(function (index, product) {
                    if (Insider.fns.isFalsy(product.img)) {
                        return true;
                    }

                    productHtml +=
                        '<div class="' + classes.cartReminderItem + '">' +
                        '   <a href="' + product.url.trim() + '" class="' + classes.itemUrl + ' ' + classes.defaultGoal +
                        '">' +
                        '       <div class="' + classes.itemInfoWrapper + '">' +
                        '           <div class="' + classes.itemImage + '" style="background-image: url(' + product.img.trim() +
                        ')"></div>' +
                        '           <div class="' + classes.itemNameWrapper + '">' +
                        '               <p class="' + classes.itemName + '">' + decodeURIComponent(product.name).trim() +
                        '</p>' +
                        '               <p class="' + classes.itemPrice + '">' + ((product.price).toString()).replace('.', ',') +
                        ' EUR</p>' +
                        '           </div>' +
                        '       </div>' +
                        '   </a>' +
                        '</div>';
                });

                return productHtml;
            };

            self.setCSS = function () {
                Insider.dom('head').append('<style class="' + classes.customStyle + '">' +
                    '.' + classes.wrapper + ' {width: 300px; position: absolute; top: 46px; right: 25px; z-index: 999; background: white;} ' +
                    '.' + classes.header + '{border-bottom: 1px solid #dadada; padding: 5px; font-weight: bold; text-align: initial}' +
                    '.' + classes.body + '{padding: 10px 10px 10px 10px; overflow-y: scroll; min-height: 100px; max-height: 400px;}' +
                    '.' + classes.arrow + '{content: ""; width: 0; height: 0; right: 5px; border-style: solid; border-width: 0 10px 10px 10px;' +
                    'border-color: transparent transparent #ffffff transparent; z-index: 2147483648; margin-top: -10px; position: absolute;}' +
                    '.' + classes.closeButton + '{cursor: pointer; display: block !important;font-size: 28px; font-weight: 100; color: #dadada; ' +
                    'position: absolute; top: -4px; right: 5px; font-family: Arial, sans-serif; text-align: center;}' +
                    '.' + classes.cartReminderItem + '{margin-top: 15px;}' +
                    '.' + classes.itemInfoWrapper + '{display: flex;}' +
                    '.' + classes.itemImage + '{background-repeat: no-repeat; min-width: 90px; height: 90px; background-position: 100% 100%;' +
                    'background-size: contain;}' +
                    '.' + classes.itemNameWrapper + '{line-height: 1.3; margin-left: 10px;padding-top: 12px;font-weight: bold;}' +
                    '.' + classes.itemName + '{color: gray !important}' +
                    '.' + classes.itemPrice + '{color: black !important; margin-top: 10px;}' +
                    '.' + classes.footer + '{text-align: center; background-color: rgb(226, 47, 50) !important; color: white !important;' +
                    'height: 41px; cursor: pointer;}' +
                    '.' + classes.cartReminderButton + '{text-align: center; line-height: 40px;}' +
                    '.' + classes.overlay + '{z-index: 99; width: 100%; top: 0; left: 0; height: 100%; position: fixed; background-color: rgba(0, 0, 0, 0.5);}' +
                    '</style>');
            };

            self.setEvents = function () {
                Insider.eventManager.once('click.close:button:' + variationId,
                    '.' + classes.closeButton + ', .' + classes.overlay,
                    function () {
                        self.reset();
                    });

                Insider.eventManager.once('click.go:to:cart:page:' + variationId, '.' + classes.footer, function () {
                    window.location.href = 'https://www.dia.es/compra-online/cart';
                });
            };

            self.setSessionStorage = function () {
                Insider.storage.session.set({
                    name: 'ins-cart-reminder-shown',
                    value: true
                });
            };

            self.init();
        })({});

        Insider.campaign.custom.show(variationId);
    }
});

false;
/* OPT-56712 END */
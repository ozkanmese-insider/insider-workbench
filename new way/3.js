/* OPT-47273 START */
Insider.__external.cartReminderConfig47273 = function (builderId) {
    'use strict';

    var self = {};
    var variationId = Insider.campaign.userSegment.segments[builderId];
    var isControlGroup = Insider.campaign.isControlGroup(variationId);
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
        defaultGoal: 'sp-custom-' + variationId + '-1'
    };
    var paidProducts = Insider.storage.localStorage.get('ins-cart-product-list');
    var totalCartAmount = Insider.storage.localStorage.get('total-cart-amount');

    self.init = function () {
        if (self.checkCartReminderOnSite()) {
            if (!isControlGroup) {
                self.reset();
                self.setCartReminderHtml();
                self.setCSS();
                self.setEvents();
            }

            self.showCampaign();
        }
    };

    self.checkCartReminderOnSite = function () {
        return paidProducts !== null && paidProducts.productList.length >= 1 && totalCartAmount !== null &&
            parseFloat(totalCartAmount) > 0 &&
            !Insider.systemRules.call('isOnCartPage') && !Insider.systemRules.call('isOnAfterPaymentPage');
    };

    self.reset = function () {
        Insider.dom('.' + classes.wrapper + ' , .' + classes.customStyle).remove();
    };

    self.setCartReminderHtml = function () {
        var reminderHtml =
            '<div class="' + classes.wrapper + '">' +
            '   <div class="' + classes.arrow + '"></div>' +
            '   <div class="' + classes.header + '">' +
            '       <div class="' + classes.totalCartPrice + '">Total de la cesta: ' + Insider.systemRules.call('getTotalCartAmount').toFixed(2) + ' €</div>' +
            '       <div class="' + classes.closeButton + '">×</div>' +
            '   </div>' +
            '   <div class="' + classes.body + '">' +
            self.setCartReminderItemsHtml() +
            '   </div>' +
            '   <div class="' + classes.footer + '">' +
            '       <div class="' + classes.cartReminderButton + ' ' + classes.defaultGoal + '">Ir a la cesta</div>' +
            '   </div>' +
            '</div>';

        Insider.dom(reminderHtml).insertAfter('#topmenu');
    };

    self.setCartReminderItemsHtml = function () {
        var productHtml = '';

        Insider.dom(paidProducts.productList).each(function (index, product) {
            if (typeof product.img === 'undefined' || product.img === '') {
                return true;
            }

            productHtml +=
                '<div class="' + classes.cartReminderItem + '">' +
                '   <a href="' + product.url.trim() + '" class="' + classes.itemUrl + '">' +
                '       <div class="' + classes.itemInfoWrapper + '">' +
                '           <div class="' + classes.itemImage + '" style="background-image: url(' + product.img.trim() + ')"></div>' +
                '           <div class="' + classes.itemNameWrapper + '">' +
                '               <p class="' + classes.itemName + '">' + decodeURIComponent(product.name).trim() + '</p>' +
                '               <p class="' + classes.itemPrice + '">' + product.price + ' €</p>' +
                '           </div>' +
                '       </div>' +
                '   </a>' +
                '</div>';
        });

        return productHtml;
    };

    self.setCSS = function () {
        Insider.dom('head').append('<style class="' + classes.customStyle + '">' +
            '.' + classes.wrapper + ' {width: 300px; position: fixed; top: 50px; right: 12px; z-index: 99999999999; background: white;} ' +
            '.' + classes.header + '{border-bottom: 1px solid #dadada; padding: 5px; font-weight: bold;}' +
            '.' + classes.body + '{padding: 10px 10px 10px 10px; overflow-y: scroll; min-height: 100px; max-height: 400px;}' +
            '.' + classes.arrow + '{content: ""; width: 0; height: 0; right: 35px; border-style: solid; border-width: 0 10px 10px 10px;' +
            'border-color: transparent transparent #ffffff transparent; z-index: 2147483648; margin-top: -10px; position: absolute;}' +
            '.' + classes.closeButton + '{cursor: pointer; display: block !important;font-size: 28px; font-weight: 100; color: #dadada; ' +
            'position: absolute; top: -4px; right: 5px; font-family: Arial, sans-serif; text-align: center;}' +
            '.' + classes.cartReminderItem + '{margin-top: 15px;}' +
            '.' + classes.itemInfoWrapper + '{display: flex;}' +
            '.' + classes.itemImage + '{background-repeat: no-repeat; min-width: 90px; height: 90px; background-position: 100% 100%;' +
            'background-size: contain;}' +
            '.' + classes.itemNameWrapper + '{line-height: 1.3; margin-left: 10px;}' +
            '.' + classes.footer + '{text-align: center; background-color: rgb(226, 47, 50) !important; color: rgb(9, 9, 9) !important;' +
            'font-weight: 700 !important; height: 41px; cursor: pointer;}' +
            '.' + classes.cartReminderButton + '{text-align: center; line-height: 40px;}' +
            '</style>');
    };

    self.setEvents = function () {
        Insider.eventManager.once('click.close:button:' + variationId, '.' + classes.closeButton, function () {
            self.reset();
        });

        Insider.eventManager.once('click.go:to:cart:page:' + variationId, '.' + classes.footer, function () {
            window.location.href = 'https://www.dia.es/compra-online/cart';
        });
    };

    self.showCampaign = function () {
        Insider.campaign.custom.show(variationId);

        Insider.storage.session.set({
            name: 'ins-user-session-' + variationId,
            value: true
        });
    };

    
    !Insider.storage.session.get('ins-user-session-' + variationId) && self.init();
};

false;
/* OPT-47273 END */
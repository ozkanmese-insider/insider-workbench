/* OPT-64855 START */
(function (self) {
    var builderId = 4;
    var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);
    var isControlGroup = Insider.campaign.isControlGroup(variationId);
    var classes = {
        customStyle: 'ins-custom-style-' + variationId,
        container: 'ins-sticky-cart-container-' + variationId,
        wrapper1: 'ins-sticky-wrapper-1-' + variationId,
        wrapper2: 'ins-sticky-wrapper-2-' + variationId,
        addtocart: 'ins-add-to-cart-button-' + variationId,
        productBrand: 'ins-product-brand-' + variationId,
        productName: 'ins-product-name-' + variationId,
        productPrice: 'ins-product-price-' + variationId,
        productImage: 'ins-product-image-' + variationId,
        productStars: 'ins-product-stars-' + variationId,
        moveToTop: 'ins-move-to-top' + variationId
    };
    var addToCartButtonText = 'ADD TO CART';
    var productPrice = Insider.systemRules.getCurrentProduct().price || 0;
    var productName = Insider.dom('.detail-item > h1.detail-item_brand > div.detail-item_title').text();
    var productBrand = Insider.dom('.detail-item > h1.detail-item_brand > span > span.ng-binding').text();
    var productImage = Insider.systemRules.getCurrentProduct().img || '';
    var partnersFavoriteButton = '.btn--watch.btn.btn-secondary';
    var partnersAddToCartButton = '.btn--add-to-cart.btn--has-icon.btn.btn-primary';
    var partnersCommentsButton = '.hidden-xs.productTile_rating.ng-pristine';

    self.init = function () {
        if (!isControlGroup && Insider.systemRules.call('isOnProductPage')) {
            self.reset();
            self.append();
            self.addStarsAndFavoritesIcon();
            self.addCSS();
            self.setEvents();
        }
    };

    self.reset = function () {
        Insider.dom('.' + classes.container).remove();
    };

    self.append = function () {
        Insider.dom('#search-bar').after(self.generalHtml());
        Insider.dom('head').append('<style class="' + classes.customStyle + '">' +
        '.' + classes.wrapper1 + '{display:flex; width:100%; align-items: center; justify-content: flex-start;}' +
        '.' + classes.wrapper2 + '{display:flex; margin-right:5%; align-items: center;}' +
        '.' + classes.addtocart + '.sp-custom-c2-1 button {width:150px; height:58px; background-color: white; color:#ED702A; font-weight: bolder; border: 2px solid #ED702A; margin-left:8%}' +
        '.' + classes.productBrand + '{font-weight:600; font-family: AmsiPro-Light; color: black; margin-right:35%}' +
        '.' + classes.productName + '{font-weight:400;}' +
        '.' + classes.productPrice + '{olor: black; font-weight:bolder; font-size: large; margin-right:8%; margin-left:8%;}' +
        '.' + classes.productImage + '{width: 60px; height:60px; margin-right:2%; margin-left:2%}' +
        '.' + classes.container + '{display:flex; width:100%; background-color:white; justify-content: space-between; align-items: center; padding-top:1%; padding-bottom:1%; border-top: 1px solid #ED702A;}' +
        '</style>');
    };

    self.generalHtml = function () {
        return (
            '<div class="' + classes.container + '">' +
            '   <div class="' + classes.wrapper1 + '">' +
            '        <img class="' + classes.productImage + '" src="' + productImage + '">' +
            '        <div class="' + classes.productBrand + '">' + productBrand +
            '           <div class="' + classes.productName + '">' + productName + '</div> ' +
            '        </div> ' +
            '   </div>' +
            '   <div class="' + classes.wrapper2 + '">' +
            '        <div class="' + classes.productPrice + '">$' + productPrice + '</div> ' +
            '        <div class="' + classes.addtocart + ' sp-custom-' + variationId + '-1">' +
            '            <button>' + addToCartButtonText + '</button>' +
            '        </div>' +
            '    </div>' +
            '</div>'
        );
    };

    self.addStarsAndFavoritesIcon = function () {
        var $stars = Insider.dom(partnersCommentsButton).clone();
        var $favorites = Insider.dom(partnersFavoriteButton).clone();

        Insider.dom('.' + classes.productPrice).before($stars);
        Insider.dom('.' + classes.productPrice).after($favorites);
    };

    self.addCSS = function () {
        Insider.dom('.productTile_rating.ng-pristine.ng-untouched.ng-valid.ng-scope.ng-isolate-scope.ng-not-empty')
            .attr('style', 'min-width:75px');
    };

    self.setEvents = function () {
        Insider.eventManager.once('click.add:cart:' + variationId, '.' + classes.addtocart,
            function () {
                self.sendCustomGoal();

                Insider.dom(partnersAddToCartButton).click();
            });

        Insider.eventManager.once('click.add:favorite:' + variationId, '.' + classes.wrapper2 + ' > button',
            function () {
                Insider.dom(partnersFavoriteButton).click();
            });

        Insider.eventManager.once('click.comments:' + variationId, '.' + classes.wrapper2 +
            ' > div' + partnersCommentsButton, function () {
            window.scrollTo(0, 730);
        });

    };

    self.sendCustomGoal = function () {
        Insider.__external.sendCustomGoal(4, 4, false);
    };

    self.init();

    sQuery(document).on('framelessInited' + variationId, self.init);
})({});

true;
/* OPT-64855 END */
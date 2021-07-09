/* OPT-64855 START */
(function (self) {
    var builderId = 4;
    var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);
    var isControlGroup = Insider.campaign.isControlGroup(variationId);
    var classes = {
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
    var productPrice = Insider.systemRules.getCurrentProduct().price;
    var productName = Insider.dom('.detail-item > h1.detail-item_brand > div.detail-item_title').text();
    var productBrand = Insider.dom('.detail-item > h1.detail-item_brand > span > span.ng-binding').text();
    var productImage = Insider.systemRules.getCurrentProduct().img;
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
        Insider.__external.sendCustomGoal(57, 6, false);
    };

    self.init();
})({});
/* OPT-64855 END */
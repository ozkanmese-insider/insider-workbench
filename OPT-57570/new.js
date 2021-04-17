(function (self) {
    var builderId = 57;
    var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);
    var productInformation = [];
    var productName = Insider.dom('#sticky-wrapper > h1').text();
    var productPrice = Insider.systemRules.getCurrentProduct().price;

    self.init = function () {
        self.removePartnersButton();
        Insider.dom('#products-option').prepend(self.generalHTML());
        self.addHTML(self.getProductInformation());
        self.listenProductChange();
    };
    self.listenProductChange = function () {
        Insider.eventManager.once('mousedown.product:click' + variationId, '.product-options', function () {
            setTimeout(function () {
                productInformation = self.getProductInformation();

                if (productInformation[1] !== '' && productInformation[0] !== '') {
                    Insider.dom('.ins-add-to-cart-button button').text('Add To Cart');
                }
                Insider.dom('.ins-product-colour').remove();
                Insider.dom('.ins-product-size').remove();
                Insider.dom('.ins-product-fit').remove();
                self.addHTML(productInformation);
            }, 600);
        });
        Insider.__external.ajaxComplete(function (url, method) {
            if (url.indexOf('/products/getRelatedProductsTemplate') > -1) {
                setTimeout(function () {
                    productInformation = self.getProductInformation();

                    if (productInformation[1] !== '' && productInformation[0] !== '') {
                        Insider.dom('.ins-add-to-cart-button button').text('Add To Cart');
                    }
                    Insider.dom('.ins-product-colour').remove();
                    Insider.dom('.ins-product-size').remove();
                    Insider.dom('.ins-product-fit').remove();
                    self.addHTML(productInformation);
                }, 600);
            }
        });
    };
    self.getProductInformation = function () {

        var productInfo = [];

        Insider.dom('.selected-option').nodes.forEach(function (element, index) {
            productInfo.push(element.innerText);
        });

        if (Insider.dom('.chzn-container span').text()) {
            productInfo.push(Insider.dom('.chzn-container span').text());
        }

        return productInfo;
    };
    self.addHTML = function (config) {
        Insider.dom('.ins-sticky-wrapper').prepend(
            '<div class="ins-product-colour">' + config[0] + '</div> ' +
            '<div class="ins-product-size">' + config[1] + '</div>' +
            '<div class="ins-product-fit>' + config[2] + '</div>'
        );
    };
    self.generalHTML = function () {
        return (
            '<div class="ins-sticky-cart-container">' +
            '   <div class="ins-sticky-wrapper">' +
            '        <div class="ins-add-to-cart-button">' +
                        productName +
            '        </div>' +
            '        <div class="ins-add-to-cart-button">' +
                        productPrice +
            '        </div>' +
            '        <div class="ins-add-to-cart-button">' +
            '            <button>Add To Cart</button>' +
            '        </div>' +
            '    </div>' +
            '</div>'
        );
    };
    self.removePartnersButton = function () {
        Insider.dom('#sticky-button').remove();
    };
    self.init();
})({});
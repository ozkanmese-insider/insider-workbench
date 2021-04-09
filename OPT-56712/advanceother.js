// Helpers - start
function formatPrice(price, currency) {
    currency = currency || spApi.getCurrency();
    var currencyRule = camp.currencyFormatRules[currency];

    if (typeof currencyRule.decimalCount === 'string') {
        currencyRule.decimalCount = parseInt(currencyRule.decimalCount);
    }

    /**
     * @param {number} currentPrice
     * @param {number} floatingPrice
     * @returns {string}
     */
    function addDigitToSinglePrice(currentPrice, floatingPrice) {
        var decimalPrice = currentPrice.toString();

        if (decimalPrice.length === 1 && !floatingPrice && currencyRule.decimalCount === 2) {
            decimalPrice += currencyRule.decimalSeparator + '00';
        }

        return decimalPrice;
    }

    if (!currencyRule) {
        return addDigitToSinglePrice(price, 0) + ' ' + currency;
    }

    price = price.toString();
    currencyRule.alignment = currencyRule.alignment.toString();
    var splittedPrice = price.toString().split('.');
    var floatingPrice = splittedPrice[1] || '';
    var basePrice = splittedPrice[0] || '';
    var formattedPrice = [];
    var percentile = 0;

    for (var i = (basePrice.length - 1); i >= 0; i--) {
        if (percentile > 0 && percentile % 3 === 0) {
            formattedPrice.push(currencyRule.thousandSeparator);
            percentile = 0;
        }
        formattedPrice.push(basePrice[i]);
        percentile++;
    }
    basePrice = formattedPrice.reverse().join('');

    if (!floatingPrice) {
        return currencyRule.alignment === '1' ?
            addDigitToSinglePrice(basePrice, 0) + ' ' + currencyRule.symbol :
            currencyRule.symbol + ' ' + addDigitToSinglePrice(basePrice, 0);
    }

    if (currencyRule.decimalCount !== -1) {
        while (floatingPrice.length < currencyRule.decimalCount) {
            floatingPrice += '0';
        }
    } else {
        floatingPrice = Number(basePrice + '.' + floatingPrice).toFixed(2).toString().split('.')[1] || '';
    }

    if (currencyRule.alignment === '1') {
        return addDigitToSinglePrice(basePrice, floatingPrice) + currencyRule.decimalSeparator +
            floatingPrice + ' ' + currencyRule.symbol;
    }

    return currencyRule.symbol + ' ' + addDigitToSinglePrice(basePrice, floatingPrice) +
        currencyRule.decimalSeparator + floatingPrice;
}

function replaceTextInElement(selector, newValue) {
    var $element = Insider.dom(selector);
    var currentHtml = ($element.html() || '').replace(/&nbsp;/g, ' ');
    var currentValue = $element.first().text();

    newValue = newValue.replace(/\s/g, ' ');

    $element.html(currentHtml.replace(currentValue, newValue));
}
// Helpers - end
var $previewContainer = Insider.dom('.ins-purchase-trigger-cart-reminder-on-site').closest('.ins-preview-wrapper');
var isAPI = camp.id !== 0;
var remainingPriceSelector = '.ins-purchase-trigger-cart-reminder-on-site .ins-cart-amount';

var construct = function () {
    setPosition();
    setEvents();

    if (isAPI) {
        setPrice();
        generateProductsHtml();
    } else {
        generateDummyProductsHtml();
    }
};

var setPosition = function () {
    setInitialCss();
    calculateArrowPosition();
};

var setInitialCss = function () {
    if (camp.locationConfig.relativeConfig) {
        var alignment = camp.locationConfig.relativeConfig.templateAlignment;

        $previewContainer.css({
            alignment: '10px',
            position: 'absolute'
        });
    }
};

var calculateArrowPosition = function () {
    if (camp.locationConfig.relativePosition) {
        var selectedElement = Insider.dom(camp.locationConfig.relativePosition.element);

        if (!selectedElement.exists()) {
            return false;
        }

        var arrowLeft = (selectedElement.offset().left + selectedElement.width() / 2) -
            ($previewContainer.offset().left) - 10;

        if (arrowLeft < 0) {
            arrowLeft += 10;
        }

        if (arrowLeft > window.innerWidth / 2) {
            $previewContainer.css({
                right: 10
            });
            arrowLeft = arrowLeft - (window.innerWidth - $previewContainer.outerWidth() - 10);
        }

        Insider.dom('.ins-pointer-arrow').css({
            left: arrowLeft + 'px'
        });
    }
};

var setEvents = function () {
    Insider.dom(window).on('resize', function () {
        calculateArrowPosition();
    });

    Insider.dom(document).on('framelessInited' + camp.id, construct);
};

var setPrice = function () {
    replaceTextInElement(remainingPriceSelector, formatPrice(Number(spApi.storageData('total-cart-amount')) || 0));
};

var generateProductsHtml = function () {
    var productHTML = '';
    var paidProducts = JSON.parse(spApi.storageData('ins-cart-product-list') || '{}');

    Insider.dom('.ins-cart-reminder-on-site-body').remove();

    Insider.dom(paidProducts.productList).each(function (index, product) {
        if (typeof product.img === 'undefined' || product.img === '') {
            return true;
        }

        productHTML +=
            '<a href="' + product.url.trim() + '" class="ins-product-box-link">' +
            '<div class="ins-temp-product-box">' +
            '<div class="ins-product-image-cont" style="background-image: url(' + product.img.trim() + ')"></div>' +
            '<div class="ins-product-info">' +
            '<p class="ins-product-name">' + decodeURIComponent(product.name).trim() + '</p>' +
            '<p class="ins-product-price">' + formatPrice(product.price) + '</p>' +
            '</div>' +
            '</div>' +
            '</a>';
    });

    Insider.dom('.ins-cart-reminder-on-site-footer').before(
        '<div class="ins-cart-reminder-on-site-body">' + productHTML + '</div>'
    );
};

var generateDummyProductsHtml = function () {
    Insider.dom('.ins-cart-reminder-on-site-footer').before(
        '<div class="ins-cart-reminder-on-site-body">' +
        '<div class="ins-temp-product-box ins-temp-product-box-dummy"></div>' +
        '<div class="ins-temp-product-box ins-temp-product-box-dummy"></div>' +
        '<div class="ins-temp-product-box ins-temp-product-box-dummy"></div>' +
        '<div class="ins-temp-product-box ins-temp-product-box-dummy"></div>' +
        '</div>'
    );
};

construct();
/* OPT-60404 Start */
var builderId = 186;
var variaionId = Insider.campaign.userSegment.segments[builderId];
var iframeSelector = '.sp-fancybox-iframe-' + variaionId;

var pmFunction = function () {
    var productImage = (((JSON.parse(Insider.localStorageGet('ins-cart-product-list'))
        .data || {}).productList || [])[0] || {}).img || '';

    sQuery('#img-image-1621245338295').attr('src', productImage);
};

Insider.fns.onElementLoaded(iframeSelector, function () {
    setTimeout(function () {
        (Insider.fns.pm({
            target: Insider.dom(iframeSelector).getNode(0).contentWindow,
            type: 'provider',
            message: {
                data: JSON.stringify({
                    campaign: 1
                }),
                callback: encodeURI(pmFunction)
            },
            success: function () { }
        }),
            this);
    }, 2000);
}).listen();

true;
/* OPT-60404 End */

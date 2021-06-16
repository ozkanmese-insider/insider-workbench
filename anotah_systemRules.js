/* OPT-60549 START */
var $discountPriceSelector = Insider.dom('.entry-summary > div > p > ins > span > bdi');
var originalPriceValue;
var originalPrice;
var discountPriceValue;
var price;

if ($discountPriceSelector.exists()) {
    originalPriceValue = Insider.dom('.entry-summary > div > p > del > span > bdi').text().trim();
    originalPrice = parseFloat(originalPriceValue.replace(/[^0-9\.]/g, ''));
    discountPriceValue = $discountPriceSelector.text().trim();
    price = parseFloat(discountPriceValue.replace(/[^0-9\.]/g, ''));
} else {
    originalPriceValue = Insider.dom('.entry-summary > div > p > span > bdi').text().trim();
    originalPrice = parseFloat(originalPriceValue.replace(/[^0-9\.]/g, ''));
    price = originalPrice;
}
/* OPT-60549 END */

var data = (JSON.parse(Insider.dom('.variations_form.cart')
    .attr('data-product_variations') || '{}') || [])[0] || {};
/* OPT-54074 Start */
var currency = Insider.systemRules.call('getCurrency');
var preferredCurrency = Insider.currencyService.to;
/* OPT-54074 End */

var product = {
    exchange: 'from ' + currency + ' to ' + preferredCurrency,
    /* OPT-54074 */
    id: Insider.dom('[name="product_id"]').val() ||
        (Insider.dom('.single-product-page').attr('id') || '').split('-').slice(-1).join(''),
    name: encodeURIComponent(Insider.dom('.product_title').text().trim()),
    price: Insider.currencyService.getConvertedPrice(currency,
        preferredCurrency, price),
    /* OPT-54074 */
    notConvertedPrice: price,
    originalPrice: originalPrice || 0, /* OPT-60549 */
    /* OPT-60549 */
    img: Insider.dom('.woocommerce-product-gallery__image:first').attr('data-thumb') || '',
    url: decodeURIComponent(window.location.href),
    cats: Insider.systemRules.call('getProductCategories'),
    quantity: Insider.dom(data.availability_html || '').hasClass('in-stock') || Insider.dom('.stock.in-stock')
        .exists() ? parseInt(Insider.dom('[id*=quantity]').val()) || 1 : 0
};

if (Insider.fns.hasParameter(window.btoa('insPriceAlert-anotah-9692'))) {
    product.price = parseFloat((product.price * 0.90).toFixed(0));
}

if (Insider.fns.hasParameter(window.btoa('insStockPush-anotah-9692'))) {
    product.quantity = 0;
}

return product;
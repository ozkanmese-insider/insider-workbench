var paidProductList = [];

function isIdExists(id, quantity) {
    var isExists = false;

    paidProductList.map(function (product) {
        if (product.id === id) {
            product.quantity += quantity;

            isExists = true;
        }
    });

    return isExists;
}

Insider.dom('.table-cart .item.line-item').each(function (key, productRow) {
    var quantity = parseInt(Insider.dom('.line-item-qty', productRow).val()) || 1;
    var price = parseFloat(Insider.dom('.item-price span', productRow).text().replace(/[^0-9]/g, '')) || 0;
    var url = Insider.dom('.item-info a', productRow).prop('href') || '';
    var id = ((window.products || [])[key] || {}).id || '';

    if (price !== 0 && !isIdExists(id, quantity)) {
        paidProductList.push({
            id: id,
            name: encodeURIComponent(Insider.dom('.item-info :header', productRow).text().trim()),
            price: price,
            originalPrice: parseFloat(Insider.dom('.item-price del',
                productRow).text().replace(/[^0-9]/g, '')) || price,
            img: (Insider.dom('.item-img img', productRow).prop('src') || '').replace('medium', 'large'),
            url: url,
            quantity: quantity,
            time: Insider.dateHelper.getTime()
        });
    }
});

return paidProductList;
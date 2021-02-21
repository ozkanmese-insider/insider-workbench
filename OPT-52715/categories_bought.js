/*OPT-52715 - cart page actions START*/
var datasStorage = 'ins-product-data-52715';
var paidProductsCategories = 'ins-paid-products-category-52715';
var categoryBought = JSON.parse(Insider.storage.localStorage.get(paidProductsCategories)) || [];
var datas = (((((dataLayer || []).filter(function(dataLayerItem) {
    return (dataLayerItem.event === 'cartScreen');
}) || [])[0] || {}).ecommerce || {}).checkout || {}).products;

Insider.storage.set({
    name: datasStorage,
    value: JSON.stringify(datas)
});

JSON.parse(Insider.storage.localStorage.get(datasStorage));
/*OPT-52715 - cart page actions end */

/**OPT-52715 after payment start */
if (Insider.systemRules.call('isOnAfterPaymentPage')) {
    var productDatas = JSON.parse(Insider.storage.localStorage.get(datasStorage));
    var paidProducts = Insider.systemRules.call('getPaidProducts');
    var index;

    for (var i =0; i < productDatas.length; i++) {
        for (var z = 0; z < paidProducts.length; z++) {
            if (productDatas[i].id.indexOf(paidProducts[z].id)) {
                index = categoryBought.indexOf(productDatas[i].category);

                if (index > -1) {
                    categoryBought.splice(index, 1);
                }

                categoryBought.push(productDatas[i].category);
                
            }
        }
    }

    Insider.storage.set({
        name: paidProductsCategories,
        value: JSON.stringify(categoryBought)
    });
    
    JSON.parse(Insider.storage.localStorage.get(paidProductsCategories));
}

Insider.storage.localStorage.get(paidProductsCategories) || '';
/*opt-52715 after payment end */

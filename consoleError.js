var authButton = 'authButton';
var fbAuthButton = 'fbAuthButton';
var userId = dataLayer[1].cd_userId;

0 !== dataLayer[1].cd_userEmail.length && ('1' === localStorage.getItem(authButton) ? (dataLayer.push({
    Category: 'Login',
    Action: userId,
    Label: dateFormatt,
    event: 'gaEvent'
}),
localStorage.setItem(authButton, '0')) : ('1' === localStorage.getItem(fbAuthButton) ? dataLayer.push({
    Category: 'Facebook Login',
    Action: userId,
    Label: dateFormatt,
    event: 'gaEvent'
}) : localStorage.setItem(authButton, '0'),
localStorage.setItem(fbAuthButton, '0')));
localStorage.setItem(authButton, '0');
localStorage.setItem(fbAuthButton, '0');
$('.auth__form__submit.button').on('click', function () {
    'G\u0130R\u0130\u015e YAP' === $('.auth__form__submit.button')[0].innerText && (localStorage.setItem(fbAuthButton, '0'),
    localStorage.setItem(authButton, '1'));
});
$('.inline.facebook.button').on('click', function () {
    localStorage.setItem(authButton, '0');
    localStorage.setItem(fbAuthButton, '1');
});

/**************************************************************************/
function setProductStorage(product, flag) {
    Insider.utils.cart.storeCartProductInformation(product, {
        count: parseInt(product.quantity),
        increase: flag
    });

    setTimeout(function () {
        Insider.storage.localStorage.set({
            name: 'total-cart-amount',
            value: ((parseFloat(Insider.storage.localStorage.get('total-cart-amount')) || 0) + product.price)
        });

        Insider.eventManager.dispatch('cart:amount:update');
    }, 500);
}

Insider.eventManager.once('click.add:to:cart:click', '.js-add-basket',
    function () {
        Insider.utils.product.setCategory();
        (Insider.targetingModules.setCartTargetingRules || Insider.fns.noop)();
    });

return {
    addToBasket: function (productid, callback, payload) {
        var payloadProduct = (payload || {}).product || {};

        Insider.request.get({
            url: payloadProduct.url || '',
            success: function (prodResponse) {
                var prodPage = document.createElement('div');

                prodPage.innerHTML = prodResponse.response;

                var productID = Insider.dom('.product-size-item:not(.is-disable):first',
                    prodPage).attr('data-pk') || '';
                var data = '{"product":' + productID + ',"quantity":1}';

                Insider.request.post({
                    url: '/baskets/basket/?insAddToCartTriggered',
                    type: 'POST',
                    data: data,
                    dataType: 'json',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    success: function () {
                        if (Insider.systemRules.call('isOnCartPage')) {
                            window.location.reload();
                        } else {
                            var currency = Insider.systemRules.call('getCurrency');
                            var product = {
                                id: productid || payloadProduct.item_id || payloadProduct.id,
                                name: payloadProduct.name,
                                price: (typeof payloadProduct.price === 'number' && payloadProduct.price) ||
                                    payloadProduct.price[currency || Insider.currencyService.to],
                                originalPrice: (typeof payloadProduct.originalPrice === 'number' &&
                                        payloadProduct.originalPrice) ||
                                    payloadProduct.original_price[currency ||
                                        Insider.currencyService.to],
                                img: payloadProduct.image_url || payloadProduct.img,
                                quantity: 1,
                                url: payloadProduct.url,
                                time: Insider.dateHelper.getTime()
                            };

                            setProductStorage(product, true);

                            Insider.dom('#frameforminicart').remove();

                            Insider.dom('body').append(
                                '<iframe src="https://www.panco.com.tr/" id="frameforminicart" ' +
                                'style="display:none;"></iframe>');

                            var ShadowHost = document.querySelector('#frameforminicart');

                            document.getElementById('frameforminicart').addEventListener('load', function () {
                                if (ShadowHost !== null) {
                                    Insider.dom('.basket-toggle.js-header-basket-box').html(
                                        ShadowHost.contentDocument.querySelectorAll(
                                            '.basket-toggle.js-header-basket-box')[0].innerHTML);

                                    Insider.dom('#frameforminicart').remove();
                                }
                            });
                        }
                    }
                });

            }
        });

        (callback || function () {}).call();
    }
};
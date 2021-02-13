spApi.isOnMainPage = function () {
    
    return (
        (window.location.pathname === '/') ||
    (window.location.pathname === 'index.php')
    ); 
};

spApi.isOnProductPage = function () {
    var selection = document.querySelector('div#product');
 
    return selection ? true : false;
};

spApi.isOnCategoryPage = function () {
    var category = document.querySelector('div.category');

    if (category) {
        return true;
    }
 
    return false;
  
};

spApi.isOnCartPage = function () {
    var checkoutCart = document.querySelector('.checkout-cart');

    if (checkoutCart) {
        return true;
    }
 
    return false;
  
};

spApi.isOnCouponPage = function () {
    var coupon = document.querySelector('#button-coupon');

    if (coupon) {
        return true;
    }
 
    return false; 
};

spApi.isOnRegSuccessPage = function () {};

spApi.isOnAfterPaymentPage = function () {
    var paymentSuccess = document.querySelector('.checkout-success');

    if (paymentSuccess) {
        return true;
    }
 
    return false;
};

spApi.getOrderId = function () {
    var pageParam = window.location.search.substring(1);
    var urlParams = pageParam.split('&');

    for (var i = 0; i < urlParams.length; i++) {
        var param = urlParams[i].split('=');

        if (param[0] === 'order_id') {
            return param[1];
        }
    }
};

spApi.isUserLoggedIn = function () {
    return document.getElementsByTagName('li:a').valueOf === 'Logout';
};

spApi.getCurrency = function () {
    var currencyIcon = sQuery('#form-currency .btn-group .btn-link strong').text();

    if (currencyIcon === '$') {
        return 'USD';
    }
 
    if (currencyIcon === '€') {
        return 'EUR';
    }

    return 'GBR';
};

spApi.getLang = function () {
    return document.documentElement.lang;
};

spApi.getSearchKeyWords = function () {};

spApi.useCouponButton = function () {};

spApi.getCategories = function () {
    var categoriesArray = [];

    $('#title-content > ul').each(function (i) {
        categoriesArray[i] = $(this)
            .find('a')
            .text();
    });
    console.log(categoriesArray);
};

spApi.getProductCategories = function () {
    var categorieArray = [];

    $('#title-content > ul > li > a').each(function (i) {
        categorieArray[i] = $(this).text();
    });

    return categorieArray[1];
};

spApi.getCurrentProduct = function () {
    var product = {};

    /* product.name = sQuery('#content > div > div.col-sm-6.product-right > h3').text();
    product.category = spApi.getProductCategories();
    product.price = 0; 
    product.productCode = sQuery('#content > div > div.col-sm-6.product-right > ul > li:nth-child(1)').text();
    product.id = sQuery('#product > div > input[type=hidden]:nth-child(3)').val();
    product.quantity = Number(sQuery('#input-quantity').val()) || 0; */
    product.img = sQuery(' div > li.photo-item.gallery-item.first.slick-slide > a > figure > img').attr('src');

    return product;
};

spApi.getTotalCartAmount = function () {

};

spApi.getCartCount = function () {
    var totalCartAmount = sQuery('#cart-total').text();

    return totalCartAmount;
};

spApi.getPaidProducts = function () {};

spApi.spAddToCart = function () {};

spApi.getLocale = function () {};

spApi.setEmailToCookie = function () {};

spApi.sliderSettings = function () {};

spApi.categorySettings = function () {};

spApi.triggerCartButton = function () {};

spApi.productImage = function() {

};
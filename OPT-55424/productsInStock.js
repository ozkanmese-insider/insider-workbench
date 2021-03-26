var productUrls = ['/p/8527256-112347-tilt-500-xs-14in-silver.html?queryID=1d8941831360ab208efa15b2237c6889',
    '/p/8545022-113810-tilt-100-20in-folding-bike-black.html?queryID=1e8fb25f5fe703106c4f3fcf8c04e31d',
    '/p/8526822-112698-tilt-500-20-folding-bike-yellow.html?queryID=381c8e8f015368df4410036060e4317d'];

Insider.__external.isProductOnStock = false;

productUrls.some(function (url) {
    if (Insider.fns.hasParameter(url) && !Insider.__external.isProductOnStock) {
        Insider.__external.isProductOnStock = !Insider.dom('#product-availability').exists();
    }
});

Insider.__external.isProductOnStock;
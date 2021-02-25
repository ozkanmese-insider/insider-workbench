var productInfosStorage = 'ins-product-infos-53128';
var paidProductsCategories = 'ins-paid-products-category-53128';
var categoryBought = JSON.parse(Insider.storage.localStorage.get(paidProductsCategories)) || [];

if ((Insider.systemRules.call('isOnCartPage') || Insider.fns.hasParameter('/checkouts/'))) {
 var productUrls = Insider.storageAccessor.paidProducts().map(function (product) {
     return product.url;
 });
 productUrls.forEach(function (url) {
     Insider.request.get({
         url: url,
         data: '',
         success: function (response) {
             var element = document.createElement('div');

             element.innerHTML = response.response;

             var productInfos = JSON.parse(Insider.storage.localStorage.get(productInfosStorage)) || [];
             var categories = [];
             var productIDs = [];
             var categoryText = Insider.dom('.pro-meta--col.category .detail', element).text().trim();
             var productIDText = Insider.dom('span#pro_sku', element).text().trim();

             categories.push(categoryText);
             productIDs.push(productIDText);

             var productDatas = {
                cat: categoryText,
                id : productIDText
             }

             productInfos.push(productDatas);

             Insider.storage.set({
              name: productInfosStorage,
              value: JSON.stringify(productInfos)
          });

          JSON.parse(Insider.storage.localStorage.get(productInfosStorage));
         }
     });
 });
}

if (Insider.systemRules.call('isOnAfterPaymentPage')) {
   var productDatas = JSON.parse(Insider.storage.localStorage.get(productInfosStorage));
   var paidProducts = Insider.systemRules.call('getPaidProducts');
   var index;

    for (var i =0; i < productDatas.length; i++) {
        for (var z = 0; z < paidProducts.length; z++) {
            if (productDatas[i].id.indexOf(paidProducts[z].id)) {
                index = categoryBought.indexOf(productDatas[i].cat);

                if (index > -1) {
                    categoryBought.splice(index, 1);
                }

                categoryBought.push(productDatas[i].cat);
                
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








(function (self) {
var productInfosStorage = 'ins-product-infos-53128';
var paidProductsCategories = 'ins-paid-products-category-53128';
var categoryBought = JSON.parse(Insider.storage.localStorage.get(paidProductsCategories)) || [];

 self.init = function () {
     self.checkConditions();
 };
 
 self.checkConditions = function () {
  if ((Insider.systemRules.call('isOnCartPage') || Insider.fns.hasParameter('/checkouts/'))) {
   var productUrls = Insider.storageAccessor.paidProducts().map(function (product) {
       return product.url;
   });
   productUrls.forEach(function (url) {
       Insider.request.get({
           url: url,
           data: '',
           success: function (response) {
               var element = document.createElement('div');
  
               element.innerHTML = response.response;
  
               var productInfos = JSON.parse(Insider.storage.localStorage.get(productInfosStorage)) || [];
               var categories = [];
               var productIDs = [];
               var categoryText = Insider.dom('.pro-meta--col.category .detail', element).text().trim();
               var productIDText = Insider.dom('span#pro_sku', element).text().trim();
  
               categories.push(categoryText);
               productIDs.push(productIDText);
  
               var productDatas = {
                  cat: categoryText,
                  id : productIDText
               }
  
               productInfos.push(productDatas);
  
               Insider.storage.set({
                name: productInfosStorage,
                value: JSON.stringify(productInfos)
            });
  
            JSON.parse(Insider.storage.localStorage.get(productInfosStorage));
           }
       });
   });
  }

  if (Insider.systemRules.call('isOnAfterPaymentPage')) {
   var productDatas = JSON.parse(Insider.storage.localStorage.get(productInfosStorage));
   var paidProducts = Insider.systemRules.call('getPaidProducts');
   var index;

    for (var i =0; i < productDatas.length; i++) {
        for (var z = 0; z < paidProducts.length; z++) {
            if (productDatas[i].id.indexOf(paidProducts[z].id)) {
                index = categoryBought.indexOf(productDatas[i].cat);

                if (index > -1) {
                    categoryBought.splice(index, 1);
                }

                categoryBought.push(productDatas[i].cat);
                
            }
        }
    }

    Insider.storage.set({
     name: paidProductsCategories,
     value: JSON.stringify(categoryBought)
 });
 
 JSON.parse(Insider.storage.localStorage.get(paidProductsCategories));
}
 };

 self.init();
})({});
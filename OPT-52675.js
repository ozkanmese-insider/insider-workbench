var flag;

var button = Insider.dom('a.js-cart-item-remove');

if (Insider.systemRules.isOnCartPage() > -1) {
    Insider.fns.onElementLoaded(button, function () { 
        Insider.eventManager.once('click.ins:user:clicked:opt-52675', button, 
            function () {
                if (Insider.systemRules.getCartCount() === 0) {
                    flag = true;
    
                } else {
                    flag = false;
                }
            });
    }).listen();
}
Insider.storage.set({
    name: 'ins-cart-cleared',
    value: flag
});

Insider.storage.get('ins-cart-cleared');

if (Insider.systemRules.getCartCount() === 0) {
    var flag = true;
} else {
    flag = false;
}
    
var button = Insider.dom('a.js-cart-item-remove');
    
if (Insider.systemRules.isOnCartPage() > -1) {
    Insider.fns.onElementLoaded(button, function () { 
        Insider.eventManager.once('click.ins:user:clicked:opt-52675', 
            function () {
                if (Insider.systemRules.getCartCount() === 0) {
                    flag = true;
                } else {
                    flag = false;
                }
            });
    }).listen();
}
Insider.storage.set({
    name: 'ins-cart-cleared',
    value: flag
});
    
Insider.storage.get('ins-cart-cleared');
if (Insider.systemRules.call('isOnCategoryPage')) {
 var button = Insider.dom('add-to-cart');

 Insider.fns.onElementLoaded(button, function () { 
  Insider.eventManager.once('click.ins:user:clicked:opt-53128', button, 
      function () {

      });
}).listen();
}
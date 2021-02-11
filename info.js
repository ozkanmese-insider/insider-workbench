// eslint-disable-next-line no-undef
Insider.fns.onElementLoaded(closeButton, function () {
    setTimeout(function () {
        // eslint-disable-next-line no-undef
        Insider.eventManager.once('click.ins:button:close:' + variationId, closeButton, function () {
            // eslint-disable-next-line no-undef
            Insider.dom(headerSelector).removeClass('ins-edit-height-' + variationId);
        });
    }, 300);
}).listen();
 /* local storage*/
var pathArray = window.location.pathname.split( '/' );
var setLocation = pathArray[3];

if ( pathArray[3] !== 'undefined' && pathArray[3] !== null) {
    
    Insider.storage.set({
        name: 'lastStep',
        value: setLocation
    });
} 
else {
    setLocation = 'home';
    Insider.storage.set({
        name: 'lastStep',
        value: setLocation
    });
} 
//tersten bakma ve sayfa icinden bulma yapilacak
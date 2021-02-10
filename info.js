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
var builderId = 230;
var variationId = Insider.campaign.userSegment.segments[builderId];

var lastPage = '';

if (window.location.toString().includes('home/address')) {
    lastPage = 'address';
    localStorage.setItem('last_step', lastPage);
    console.log('address');
}
 
if (window.location.toString().includes('home/tariffs')) {
    lastPage = 'tarifeler';
    localStorage.setItem('last_step', lastPage);
    console.log('tarifeler');
}

if (window.location.toString().includes('home/customer-info')) {
    lastPage = 'customer Info';
    localStorage.setItem('last_step', lastPage);
    console.log('customer Info');
}

if (window.location.toString().includes('home/onay')) {
    lastPage = 'onay';
    localStorage.setItem('last_step', lastPage);
    console.log('onay');
}
else {
    lastPage = 'home';
    localStorage.setItem('last_step', lastPage);    
    console.log('onay');
}

alert(localStorage.getItem('last_step'));

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
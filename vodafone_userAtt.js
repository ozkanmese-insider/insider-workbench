/* OPT-52178 START - evdeinternet_laststep User Attribute*/
/* OPT-52178 start*/
/* OPT-52178 end */
var setLocation;

switch (location.href) {
    case 'https://www.vodafone.com.tr/evde-internet/home/address':
        setLocation = 'address';
        break;
    case 'https://www.vodafone.com.tr/evde-internet/home/tariffs':
        setLocation = 'tarifeler';
        break;
    case 'https://www.vodafone.com.tr/evde-internet/home/customer-info':
        setLocation = 'customer-info';
        break;
    case 'https://www.vodafone.com.tr/evde-internet/home/onay':
        setLocation = 'onay';
        break;
    default:
        setLocation = 'home';
        break;
}
Insider.storage.set({
    name: 'ins-last-step',
    value: setLocation
});
Insider.storage.get('ins-last-step');

/* OPT-52178 END  - benzersiz_campign_login User Attribute */
var vodafoneValue;

if (window.location.href.indexOf('/benzersiz-teklif-oyna-kazan-kampanyasi/login-nvf')>-1) {
    vodafoneValue = 'nonVodafone';
} else {
    vodafoneValue = 'vodafone';
}

Insider.storage.set({
    name: 'ins-is-vodafone',
    value: vodafoneValue
});

Insider.storage.get('ins-is-vodafone') || '';

/* OPT-52178 Start - teklif_verenler User Attribute */

var button = Insider.dom('div > div.form__row.no-gutter--bottom.align--center > button');
var flag = false;

Insider.fns.onElementLoaded(button, function () { 
    Insider.eventManager.once('click.ins:user:clicked:opt-52178', button, 
        function () {
            flag = true;

            Insider.storage.set({
                name: 'ins-offer-given',
                value: flag
            });
        });
}).listen();
/* OPT-52178 END - teklif_verenler User Attribute */
/* OPT-52178 START - evdeinternet_laststep User Attribute*/
/* OPT-52178 start*/
/* OPT-52178 end */
var setLocation = '';
var path = window.location.href;

if (path.indexOf('https://www.vodafone.com.tr/evde-internet') >-1) {
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
        case 'https://www.vodafone.com.tr/evde-internet/home':
            setLocation = 'home';
            break;
        default:
            setLocation = '';
            break;    
    }
}

Insider.storage.set({
    name: 'ins-last-step',
    value: setLocation
});

Insider.storage.get('ins-last-step') || '';

/* OPT-52178 END  - benzersiz_campign_login User Attribute */
/****************************************************************************************************************** */

/* OPT-52178 Start - teklif_verenler User Attribute */
//var path = Insider.fns.hasParameter('/benzersiz-teklif-oyna-kazan-kampanyasi/make-offer-result');

/*
if (path === true) {
    (teklif > -1) ? flag = true : flag = false;   
} else {
    flag = false;
}
*/
var flag;
var teklif = Insider.dom('.teklif-heading1').text().indexOf('eklif');

switch (location.href) {
    case 'https://www.vodafone.com.tr/benzersiz-teklif-oyna-kazan-kampanyasi/make-offer-result':
        (teklif > -1) ? flag = true : flag = false;
        break;
    default:
        flag = false;
        break;
}

Insider.storage.set({
    name: 'ins-offer-given',
    value: flag
});

Insider.storage.get('ins-offer-given') || '';
/* OPT-52178 END - teklif_verenler User Attribute */

// butona tıkladıktan sonra link sorgusu atılıcak.
// after click check the ur
var vodafoneValue = '';
var path = window.location.href;
var button = Insider.dom('div > div > div > div.form__row.no-gutter--bottom.align--center > button');

Insider.fns.onElementLoaded(button, function () { 
    Insider.eventManager.once('click.ins:user:clicked:opt-52178', button, 
        function () {
            if (path.indexOf('/benzersiz-teklif-oyna-kazan-kampanyasi/login') > -1) {
                vodafoneValue = 'Vodafone';       
            }
        });
}).listen();

if (path.indexOf('/benzersiz-teklif-oyna-kazan-kampanyasi/nvf-login-otp') >-1) {
    if(button.text().indexOf('Onayla ve devam et') > -1) {
        vodafoneValue = 'nonVodafone';
    }  
}

Insider.storage.set({
    name: 'ins-is-vodafone',
    value: vodafoneValue
});

Insider.storage.get('ins-is-vodafone') || '';
/**
 * *******************************************************************************************************
 */

var vodafoneValue;
var path = window.location.href.indexOf('/benzersiz-teklif-oyna-kazan-kampanyasi/nvf-login-otp');
var button = Insider.dom('div > div > div > div.form__row.no-gutter--bottom.align--center > button').text();

if (button.indexOf('Onayla ve devam et') > -1) {
    if (path > -1) {
        vodafoneValue = 'nonVodafone';
    } else {
        vodafoneValue = 'vodafone';
    }  
} else {
    vodafoneValue = '';
}

Insider.storage.set({
    name: 'ins-is-vodafone',
    value: vodafoneValue
});

Insider.storage.get('ins-is-vodafone') || '';
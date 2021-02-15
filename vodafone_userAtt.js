/* OPT-52178 START - evdeinternet_laststep User Attribute*/
/* OPT-52178 start*/
/* OPT-52178 end */


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


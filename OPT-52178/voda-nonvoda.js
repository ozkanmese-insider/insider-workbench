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
var vodafoneValue = ' ';
var storageName = 'ins-is-vodafone-52178';

if (Insider.dom('div > div > div > div.form__row.no-gutter--bottom.align--center > button').text()
    .indexOf('Onayla ve devam et') > -1) {
    (window.location.href.indexOf('/benzersiz-teklif-oyna-kazan-kampanyasi/nvf-login-otp') > -1) ? 
        vodafoneValue = 'nonVodafone' : vodafoneValue = 'vodafone';
}

Insider.storage.set({
    name: storageName,
    value: vodafoneValue
});

Insider.storage.get(storageName) || '';

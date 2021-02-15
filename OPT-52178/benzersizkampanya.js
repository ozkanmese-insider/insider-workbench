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
var flag;
var storageName = 'ins-offer-given-52178';

switch (location.href) {
    case 'https://www.vodafone.com.tr/benzersiz-teklif-oyna-kazan-kampanyasi/make-offer-result':
        (Insider.dom('.teklif-heading1').text().indexOf('eklif') > -1) ? flag = true : flag = false;
        break;
    default:
        flag = false;
        break;
}

Insider.storage.set({
    name: storageName,
    value: flag
});

Insider.storage.get(storageName) || false;
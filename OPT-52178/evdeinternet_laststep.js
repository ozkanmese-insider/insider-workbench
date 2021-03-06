var setLocation = ' ';
var storageName = 'ins-last-step-52178';

if (window.location.href.indexOf('https://www.vodafone.com.tr/evde-internet') > -1) {
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
    name: storageName,
    value: setLocation
});

Insider.storage.get(storageName) || '';

if (searchedKey === 'Airpods') {

} else if (searchedKey === 'JBL') {

} else if (searchedKey === 'ตู้เย็น') {

} else if (searchedKey === 'เครื่องซักผ้า') {

} else if (searchedKey === 'TV') {

} else if (searchedKey === 'หูฟังไร้สาย') {

} else if (searchedKey === 'Iphone') {

} else if (searchedKey === 'แอร์') {

} else if (searchedKey === 'หูฟัง') {

}







/* OPT-55710 START*/
(function (self) {
    var builderId = 721;
    var variationId = Insider.campaign.userSegment.segments[builderId];
    var isControlGroup = Insider.campaign.isControlGroup(variationId);
    var storageName = 'ins-last-searched-word-' + variationId;
    var images = {
        JBL: 'https://image.useinsider.com/powerbuy/defaultImageLibrary/JBL-1618804628.jpeg',
        Airpods: 'https://image.useinsider.com/powerbuy/defaultImageLibrary/airpods-1618804657.jpeg',
        ตู้เย็น: 'https://image.useinsider.com/powerbuy/defaultImageLibrary/%E0%B8%95%E0%B8%B9%E0%B9%89%E0%B9%80%E0%B8%A2%E0%B9%87%E0%B8%99-1618804673.jpeg',
        เครื่องซักผ้า: 'https://image.useinsider.com/powerbuy/defaultImageLibrary/%E0%B8%95%E0%B8%B9%E0%B9%89%E0%B9%80%E0%B8%A2%E0%B9%87%E0%B8%99-1618804673.jpeg',
        TV: 'https://image.useinsider.com/powerbuy/defaultImageLibrary/%E0%B8%97%E0%B8%B5%E0%B8%A7%E0%B8%B5-1618804744.jpeg',
        หูฟังไร้สาย: 'https://image.useinsider.com/powerbuy/defaultImageLibrary/%E0%B8%AB%E0%B8%B9%E0%B8%9F%E0%B8%B1%E0%B8%87%E0%B9%84%E0%B8%A3%E0%B9%89%E0%B8%AA%E0%B8%B2%E0%B8%A2-1618804767.jpeg',
        Iphone: 'https://image.useinsider.com/powerbuy/defaultImageLibrary/Iphone-1618804810.jpeg',
       
        แอร์: 'https://image.useinsider.com/powerbuy/defaultImageLibrary/%E0%B9%81%E0%B8%AD%E0%B8%A3%E0%B9%8C-1618804878.jpeg',
        หูฟัง: 'https://image.useinsider.com/powerbuy/defaultImageLibrary/%E0%B8%AB%E0%B8%B9%E0%B8%9F%E0%B8%B1%E0%B8%87-1618804894.jpeg'
    };

    self.init = function () {
        self.checkSearchedWord();
        self.placeBanner();
    };

    self.checkSearchedWord = function () {
        if (Insider.fns.hasParameter('catalogsearch')) {
            var searchedWord = (Insider.dom('#txt-searchBox-input').nodes[0] || {}).value;

            if (searchedWord) {
                var matchedKey = (Object.keys(images).filter(function (word) {
                    var regexTest = new RegExp(searchedWord, 'i');

                    return regexTest.test(word);
                })).pop();

                if (matchedKey) {
                    Insider.storage.localStorage.set({
                        name: storageName,
                        value: matchedKey,
                        expires: 30
                    });
                }
            }
        }
    };

    self.placeBanner = function () {
        if (Insider.systemRules.call('isOnMainPage')) {
            var searchedKey = Insider.storage.localStorage.get(storageName) || '';

            if (searchedKey) {
                Insider.fns.onElementLoaded('.c38165:last img', function ($relatedImage) {
                    if (!isControlGroup) {
                        $relatedImage.attr('src', images[searchedKey]);
                    }

                    Insider.campaign.custom.show(variationId);
                }).listen();
            }
        }
    };

    self.init();
})({});

false;
/* OPT-55710 END*/

Insider.dom('.bl-parameter-listing li:eq(2) span:last').text();
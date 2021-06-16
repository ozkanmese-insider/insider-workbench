/* OPT-55710 START*/
(function (self) {
    var builderId = 915; /* OPT- 60181 */
    var variationId = Insider.campaign.userSegment.segments[builderId];
    var isControlGroup = Insider.campaign.isControlGroup(variationId);
    var storageName = 'ins-last-searched-word-' + variationId;
    var goalId;
    var classOfBannersAnchor = '.col-sm-6.col-xs-12.p-10 > a:nth-child(2)'; /* OPT-60181 */
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
        self.sendCustomGoal(); /* OPT-60181 */
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
                        var imageUrl = self.setImageUrl();

                        $relatedImage.attr('src', images[searchedKey]);
                        Insider.dom(classOfBannersAnchor).attr('href', imageUrl[0]); /* OPT-60181 */
                    }

                    Insider.campaign.custom.show(variationId);
                }).listen();
            }
        }
    };
    /* OPT-60181 START */
    self.setImageUrl = function () {
        var imageUrl;

        switch (Insider.storage.localStorage.get(storageName) || '') {
            case 'JBL':
                imageUrl = 'https://www.powerbuy.co.th/th/product-tag/JBL';
                goalId = 15;
                break;
            case 'Airpods':
                imageUrl = 'https://www.powerbuy.co.th/th/product-tag/JBL';
                goalId = 16;
                break;
            case 'ตู้เย็น':
                imageUrl = 'https://www.powerbuy.co.th/th/product-tag/JBL-info';
                goalId = 17;
                break;
            case 'เครื่องซักผ้า':
                imageUrl = 'https://www.powerbuy.co.th/th/product-tag/JBL';
                goalId = 18;
                break;
            case 'TV':
                imageUrl = 'https://www.powerbuy.co.th/th/product-tag/JBL';
                goalId = 19;
                break;
            case 'หูฟังไร้สาย':
                imageUrl = 'https://www.powerbuy.co.th/th/product-tag/JBL';
                goalId = 20;
                break;
            case 'Iphone':
                imageUrl = 'http://powerbuy.co.th/th/catalogsearch/result/?q=iphone';
                goalId = 21;
                break;
            case 'แอร์':
                imageUrl = 'http://powerbuy.co.th/th/catalogsearch/result/?q=iphone';
                goalId = 23;
                break;
            case 'หูฟัง':
                imageUrl = 'http://powerbuy.co.th/th/catalogsearch/result/?q=iphone';
                goalId = 24;
                break;
            default:
                imageUrl = 'https://www.powerbuy.co.th/th';
                break;
        }

        return [imageUrl, goalId];
    };

    self.sendCustomGoal = function () {
        Insider.eventManager.once('click.home:page:banner:' + variationId, classOfBannersAnchor,
            function () {
                if (!isControlGroup) {
                    var goalArray = self.setImageUrl();

                    Insider.__external.sendCustomGoal(builderId, goalArray[1], true);
                }
            });
    };
    /* OPT-60181 END */

    self.init();
})({});

false;
/* OPT-55710 END*/
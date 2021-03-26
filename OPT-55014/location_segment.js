/* OPT-55014 START */
(function (self) {
    var storageData = Insider.storage.get('ins-location-segment-55014') || {};
    var urlParse = window.location.href.split('/');
    var locationCounts = {
        taipeiCount: storageData.taipeiCount || 0,
        taoyuanCount: storageData.taoyuanCount || 0,
        hsinchuCount: storageData.hsinchuCount || 0,
        changhuaCount: storageData.changhuaCount || 0,
        taichungCount: storageData.taichungCount || 0,
        tainanCount: storageData.tainanCount || 0,
        kaohsiungCount: storageData.kaohsiungCount || 0,
    };

    self.init = function () {
        self.setStorage();
        self.updateLocationCount();
    };

    self.setStorage = function () {
        Insider.storage.set({
            name: 'ins-location-segment-55014',
            value: locationCounts
        });
    };

    self.updateLocationCount = function () {
        switch (urlParse[5]) {
            case 'Taipei-city':
                locationCounts.taipeiCount = locationCounts.taipeiCount + 1;
                break;
            case 'Taoyuan-city':
                locationCounts.taoyuanCount = locationCounts.taoyuanCount + 1;
                break;
            case 'Hsinchu-city':
                locationCounts.hsinchuCount = locationCounts.hsinchuCount + 1;
                break;
            case 'Changhua-county':
                locationCounts.changhuaCount = locationCounts.changhuaCount + 1;
                break;
            case 'Taichung-city':
                locationCounts.taichungCount = locationCounts.taichungCount + 1;
                break;
            case 'Tainan-city':
                locationCounts.tainanCount = locationCounts.tainanCount + 1;
                break;
            case 'Kaohsiung-city':
                locationCounts.kaohsiungCount = locationCounts.kaohsiungCount + 1;
                break;
        }

        self.setStorage();
    };

    self.init();
})({});
/* OPT-55014 END*/

(Insider.storage.get('ins-location-segment-55014') || {}).taipeiCount || '';
(Insider.storage.get('ins-location-segment-55014') || {}).taoyuanCount || '';
(Insider.storage.get('ins-location-segment-55014') || {}).hsinchuCount || '';
(Insider.storage.get('ins-location-segment-55014') || {}).changhuaCount || '';
(Insider.storage.get('ins-location-segment-55014') || {}).taichungCount || '';
(Insider.storage.get('ins-location-segment-55014') || {}).tainanCount || '';
(Insider.storage.get('ins-location-segment-55014') || {}).kaohsiungCount || '';
if (typeof spApi !== 'object' && typeof Insider !== 'object') {
    alert('Insider API bulunamadı');
} else {
    var builderIds = prompt('Lütfen control grubuna geçirmek istediğiniz kampanya builder id değerini girin. Birden fazla girmek için builder id değerleri arasına "," işareti koyunuz.');
    var storageName = typeof Insider === 'object' ? 'ins-user-segments' : 'user-segments';
    var userSegmentsFromStorage = JSON.parse(spApi.storageData(storageName) || '{}');
    var controlGroupId = 0;
    var successBuilderIds = [];

    builderIds = builderIds.replace(/[^0-9,]/).split(',');
    builderIds.forEach(function (builderId) {
        var isSegment = spApi.userSegments[builderId];

        if (isSegment !== undefined) {
            if (typeof Insider === 'object') {
                controlGroupId = Insider.campaign.getVariationsByBuilderId(builderId).filter(function (variation) {
                    return variation.type === 'cg';
                }).map(function (controlGroup) {
                    return controlGroup.variationId;
                });
            } else {
                controlGroupId = spApi.getVariationsByBuilderId(builderId).filter(function (variation) {
                    return variation.type === 'cg';
                }).map(function (controlGroup) {
                    return controlGroup.varId;
                });
            }

            if (userSegmentsFromStorage[builderId] !== undefined) {
                userSegmentsFromStorage[builderId] = controlGroupId[0];
                successBuilderIds.push(builderId);
            }
        }
    });
    spApi.storageData(storageName, userSegmentsFromStorage, {
        expires: (1 / 24) / 2
    });
    var message = successBuilderIds.length > 0 ? 'Değişikliklerin geçerli olması için sayfayı yenile bro :D' : 'OOOPS Dostum doğru girdiğine emin ol!';

    alert('Control grubuna başarılı geçen builder id\'ler: ' + successBuilderIds.toString() + '\n' + message);
}
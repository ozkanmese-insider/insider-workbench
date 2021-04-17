/* OPT-57754 START */
var customAttributes = [
    'daha_sonra_satin_alacagim', 'yeterli_bilgi_alamadim',
    'aradigim_paketi_bulamadim', 'arastirma_yapiyorum'
];
var updateStorage = function (storageData, attributeIndex) {
    if (storageData.indexOf(customAttributes[attributeIndex]) === -1) {
        storageData.push(customAttributes[attributeIndex]);
    }

    return storageData;
};

Insider.eventManager.once('insValidationSuccess' + 173 + '.listen:click:button:' + 173, document, function () {
    if (Insider.dom('#ins-slide-page-0.ins-active-slide').exists()) {
        var storageData = Insider.storage.localStorage.get('ins-form-selected-items-57754') || [];
        var selectedOptionText = Insider.dom('#ins-slide-page-0' +
            ' .ins-survey-selection-row.ins-survey-selection-checked').text();

        if (selectedOptionText.indexOf('Daha sonra satın alacağım') > -1) {
            storageData = updateStorage(storageData, 0);
        } else if (selectedOptionText.indexOf('Yeterli bilgi alamadım') > -1) {
            storageData = updateStorage(storageData, 1);
        } else if (selectedOptionText.indexOf('Aradığım paketi bulamadım') > -1) {
            storageData = updateStorage(storageData, 2);
        } else if (selectedOptionText.indexOf('Araştırma yapıyorum') > -1) {
            storageData = updateStorage(storageData, 3);
        }
        Insider.storage.localStorage.set({
            name: 'ins-form-selected-items-57754',
            value: storageData
        });
    }
});
/* OPT-57754 END */
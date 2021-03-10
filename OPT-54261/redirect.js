/* OPT-54261 START */
var redirectInformation = [{
    conditionLink: 'https://www.cigna.co.th/our-plans/signaturecare',
    redirectLink: 'https://www.cigna.co.th/our-plans/signaturecare/Generic'
}, {
    conditionLink: 'https://www.cigna.co.th/our-plans/signaturecare',
    redirectLink: 'https://www.cigna.co.th/our-plans/signaturecare/Generic'
}];

redirectInformation.some(function (linkInformation) {
    if (window.location.href === linkInformation.conditionLink) {
        setTimeout(function () {
            window.location.href = linkInformation.redirectLink;
        }, 1000);
    }
});
/* OPT-54261 END */

/* OPT-54261 START */
var redirectInformation = [{
    conditionLink: 'https://www.cigna.co.th/our-plans/signaturecare',
    redirectLink: 'https://www.cigna.co.th/our-plans/signaturecare/Generic'
}, {
    conditionLink: 'other pages',
    redirectLink: 'other pages you want to redirect'
}];

redirectInformation.some(function (linkInformation) {
    if (window.location.href === linkInformation.conditionLink) {
        setTimeout(function () {
            window.location.href = linkInformation.redirectLink;
        }, 1000);
    }
});
/* OPT-54261 END */

/* OPT-54261 START */
var builderId = 56;
var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);
var durationSecond = 1;
var redirectInformation = [{
    conditionLink: 'https://www.cigna.co.th/our-plans/signaturecare',
    redirectLink: 'https://www.cigna.co.th/our-plans/signaturecare/Generic'
}, {
    conditionLink: 'https://www.cigna.co.th/our-plans/signaturecare',
    redirectLink: 'https://www.cigna.co.th/our-plans/signaturecare/Generic'
}];

redirectInformation.some(function (linkInformation) {
    if (window.location.href === linkInformation.conditionLink) {
        if (!Insider.campaign.isControlGroup(variationId)) {
            setTimeout(function () {
                window.location.href = linkInformation.redirectLink;
            }, durationSecond*1000);

            return true;
        }
    }
});
/* OPT-54261 END */
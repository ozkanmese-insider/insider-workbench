/* OPT-53448 Start */
var builderId = Insider.browser.isMobile() ? 186 : 185;
var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);
var selector = '.ins-preview-wrapper-' + variationId + ' .ins-dynamic-element-tag';

Insider.fns.onElementLoaded(selector, function () {
    var currentNumber = Number(Insider.dom(selector).text());
    var newNumber = (currentNumber % 100);

    newNumber = newNumber < 10 ? newNumber * 5 : newNumber;

    Insider.dom(selector).text(newNumber);
}).listen();

true;
/* OPT-53448 End */


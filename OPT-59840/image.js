/* OPT-59840 START */
var builderId = Insider.browser.isMobile() ? 206 : 205;
var variationId = Insider.campaign.userSegment.segments[builderId];
var isControlGroup = Insider.campaign.isControlGroup(variationId);
var $productImages = Insider.dom('.product-image-photo').nodes;
var newSource;

if (!isControlGroup) {
    $productImages.forEach(function (image) {
        var source = image.src;

        if (source.indexOf('_') > -1) {
            newSource = source.split('_');
            source = newSource[0].concat('_1.jpg');
        } else {
            newSource = source.split('.jpg');
            source = newSource[0].concat('_1.jpg');
        }

        image.attributes[1].nodeValue = source;
    });
}

true;
/* OPT-59840 END */
/* OPT-59941 START */
Insider.dom('.wrap-countdown-text').attr('style', 'margin-left:5% !important;margin-bottom:4%'); 
true;
/* OPT-59941 END */
/* OPT-63736 START */
var $selector = '#ins-wrap-question-text-1505891501864';

Insider.dom($selector).hide();

Insider.eventManager.once('mousedown.notification:', '.ins-notification-center-button',
    function () {
        if (Insider.dom($selector).css('display') === 'none') {
            Insider.dom($selector).show();
        } else {
            Insider.dom($selector).hide();
        }
    });
/* OPT-63736 END */
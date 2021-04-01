/* OPT-55750 START */
setTimeout(function () {
    var triggerContentTrigger = '#insTriggerContent';

    var applyTriggerFixedContent = function () {
        Insider.dom(triggerContentTrigger).css({
            bottom: '51px',
            top: 'auto'
        });
    };

    applyTriggerFixedContent();

    Insider.fns.onElementLoaded(triggerContentTrigger, function ($triggerContent) {
        setTimeout(function () {
            applyTriggerFixedContent();

            var observer = new MutationObserver(function (mutations) {
                mutations.forEach(function () {
                    var customStyleClass = 'ins-outer-stylesheet-body-lock-1162';

                    if (Insider.dom(triggerContentTrigger).css('display') === 'none') {
                        Insider.dom('head').append('<style type="text/css" class="' + customStyleClass + '">' +
                                'html, body {overflow: hidden !important;  overflow-x:hidden !important;' +
                                'position: fixed !important;} body {position: relative !important; }</style>');
                    } else {
                        Insider.dom('.' + customStyleClass).remove();
                    }
                });
            });

            observer.observe($triggerContent.nodes[0], {
                attributes: true,
                attributeFilter: ['style']
            });
        }, 1000);
    }).listen();
}, 1000);
/* OPT-55750 END */

true;
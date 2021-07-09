/* OPT-62549 START */
(function (self) {
    var selectors = {
        notificationContent: '.ins-notification-content.ins-notification-content-notification-center',
        notificationWrapper: '.ins-preview-wrapper.ins-preview-wrapper-notification-center',
        hidedElement: '.header.content > ul > li.authorization-link > a > span',
        appendToLoggedIn: '.customer-welcome',
        appendToLoggedOut: '.authorization-link-login',
        contentWrapper: '.ins-content-wrapper.ins-content-wrapper-notification-center'
    };
    var notificationContentStyle = 'background-color: rgba(0, 0, 0, 0) !important; background-image: none !important;' +
        'border-width: 0px !important;border-style: none !important; display: block !important;' +
        'border-color: rgb(50, 50, 50) !important;border-radius: 0px !important;';
    var notificationWrapperStyle = 'display: block; visibility: visible; position: absolute;';

    self.init = function () {
        self.notificationCenterSettings();
    };

    self.notificationCenterSettings = function () {
        Insider.fns.onElementLoaded(selectors.notificationWrapper, function () {
            setTimeout(function () {
                if (Insider.systemRules.call('isUserLoggedIn') && !(Insider.systemRules.call('isOnCartPage') ||
                        Insider.systemRules.call('isOnMainPage'))) {
                    switch (Insider.fns.parseURL().host) {
                        case '4fstore.ru':
                            Insider.dom(selectors.notificationWrapper).insertAfter(selectors.appendToLoggedIn);

                            Insider.dom(selectors.notificationContent).attr('style',
                                notificationContentStyle + 'margin-left:6.5rem !important');
                            Insider.dom(selectors.notificationWrapper).attr('style',
                                notificationWrapperStyle + 'margin-left: 5rem;');

                            Insider.dom(selectors.hidedElement).hide();
                            break;
                        case '4fstore.com':
                            Insider.dom(selectors.notificationWrapper).insertAfter(selectors.appendToLoggedIn);

                            Insider.dom(selectors.notificationContent).attr('style',
                                notificationContentStyle + 'margin-left:9rem !important');

                            Insider.dom(selectors.hidedElement).hide();
                            break;
                        case '4fstore.cz':
                            Insider.dom(selectors.notificationWrapper).insertAfter(selectors.appendToLoggedIn);

                            Insider.dom(selectors.notificationContent).attr('style',
                                notificationContentStyle + 'margin-left:6.5rem !important');
                            Insider.dom(selectors.notificationWrapper).attr('style',
                                notificationWrapperStyle);

                            Insider.dom(selectors.hidedElement).hide();
                            break;
                        case '4fstore.de':
                            Insider.dom(selectors.notificationWrapper).insertAfter(selectors.appendToLoggedIn);

                            Insider.dom(selectors.notificationContent).attr('style',
                                notificationContentStyle + 'margin-left:7.5rem !important');

                            Insider.dom(selectors.hidedElement).hide();
                            break;
                        case '4fstore.sk':
                            Insider.dom(selectors.notificationWrapper).insertAfter(selectors.appendToLoggedIn);

                            Insider.dom(selectors.notificationContent).attr('style',
                                notificationContentStyle + 'margin-left:16.5rem !important');
                            Insider.dom(selectors.notificationWrapper).attr('style',
                                notificationWrapperStyle + 'margin-left:1rem');

                            Insider.dom(selectors.hidedElement).hide();
                            break;
                        case '4fstore.ro':
                            Insider.dom(selectors.notificationWrapper).insertAfter(selectors.appendToLoggedIn);

                            Insider.dom(selectors.notificationContent).attr('style',
                                notificationContentStyle + 'margin-left:7.5rem !important');
                            Insider.dom(selectors.notificationWrapper).attr('style',
                                notificationWrapperStyle);

                            Insider.dom(selectors.hidedElement).hide();
                            break;
                        case '4fstore.lt':
                            Insider.dom(selectors.notificationWrapper).insertAfter(selectors.appendToLoggedIn);

                            Insider.dom(selectors.notificationContent).attr('style',
                                notificationContentStyle + 'margin-left:9.5rem !important');
                            Insider.dom(selectors.notificationWrapper).attr('style',
                                notificationWrapperStyle);

                            Insider.dom(selectors.hidedElement).hide();
                            break;
                        case '4fstore.lv':
                            Insider.dom(selectors.notificationWrapper).insertAfter(selectors.appendToLoggedIn);

                            Insider.dom(selectors.notificationContent).attr('style',
                                notificationContentStyle + 'margin-left:7.5rem !important');
                            Insider.dom(selectors.notificationWrapper).attr('style',
                                notificationWrapperStyle);

                            Insider.dom(selectors.hidedElement).hide();
                            break;
                    }
                } else if (Insider.systemRules.call('isOnCategoryPage') ||
                Insider.systemRules.call('isOnProductPage')) {
                    switch (Insider.fns.parseURL().host) {
                        case '4fstore.cz':
                            Insider.dom(selectors.notificationWrapper).insertAfter(selectors.appendToLoggedOut);

                            Insider.dom(selectors.notificationContent).attr('style',
                                notificationContentStyle + 'margin-left:5.7rem !important');
                            Insider.dom(selectors.notificationWrapper).attr('style',
                                notificationWrapperStyle);
                            Insider.dom(selectors.contentWrapper).attr('style',
                                'margin-left:4.5rem !important;');
                            break;
                        case '4fstore.de':
                            Insider.dom(selectors.notificationContent).attr('style',
                                notificationContentStyle + 'margin-left: 8rem !important;');
                            break;
                        case '4fstore.sk':
                            Insider.dom(selectors.contentWrapper).attr('style', 'margin-left:4.5rem !important;');
                            break;
                        case '4fstore.ro':
                            Insider.dom(selectors.notificationWrapper).insertAfter(selectors.appendToLoggedOut);

                            Insider.dom(selectors.notificationContent).attr('style', notificationContentStyle +
                                'margin-left:8.7rem !important');
                            Insider.dom(selectors.notificationWrapper).attr('style', notificationWrapperStyle);
                            break;
                        case '4fstore.ru':
                            Insider.dom(selectors.notificationWrapper).insertAfter(selectors.appendToLoggedOut);

                            Insider.dom(selectors.notificationContent).attr('style',
                                notificationContentStyle + 'margin-left:5.5rem !important');
                            Insider.dom(selectors.notificationWrapper).attr('style', notificationWrapperStyle);
                            break;
                        case '4fstore.lt':
                            Insider.dom(selectors.notificationWrapper).insertAfter(selectors.appendToLoggedOut);

                            Insider.dom(selectors.notificationContent).attr('style',
                                notificationContentStyle + 'margin-left:5rem !important');
                            Insider.dom(selectors.notificationWrapper).attr('style', notificationWrapperStyle);
                            Insider.dom(selectors.contentWrapper).attr('style', 'margin-left:4.5rem !important;');
                            break;
                        case '4fstore.lv':
                            Insider.dom(selectors.notificationWrapper).insertAfter(selectors.appendToLoggedOut);

                            Insider.dom(selectors.notificationContent).attr('style',
                                notificationContentStyle + 'margin-left:5.3rem !important');
                            Insider.dom(selectors.notificationWrapper).attr('style', notificationWrapperStyle);
                            Insider.dom(selectors.contentWrapper).attr('style', 'margin-left:4.5rem !important;');
                            break;
                    }
                }
            }, 450);
        }).listen();
    };
    self.init();
})({});
/* OPT-62549 END */

/* OPT-62549 START */
Insider.__external.notificationWrapper62549 = '.ins-preview-wrapper.ins-preview-wrapper-notification-center';

Insider.fns.onElementLoaded(Insider.__external.notificationWrapper62549, function () {
    setTimeout(function () {
        if (Insider.systemRules.call('isUserLoggedIn') && (Insider.systemRules.call('isOnCategoryPage') ||
                Insider.systemRules.call('isOnProductPage'))) {
            Insider.dom(Insider.__external.notificationWrapper62549).insertAfter('.customer-welcome');

            Insider.dom('.ins-notification-content.ins-notification-content-notification-center').attr('style',
                'background-color: rgba(0, 0, 0, 0) !important; background-image: none !important;' +
                'border-width: 0px !important;border-style: none !important; display: block !important;' +
                'border-color: rgb(50, 50, 50) !important;border-radius: 0px !important;margin-left:1.5rem !important');
            Insider.dom(Insider.__external.notificationWrapper62549).attr('style',
                'display: block; visibility: visible; position: absolute;margin-left: 3rem;');

            Insider.dom('.header.content > ul > li.authorization-link > a > span').hide();
        }
    }, 450);
}).listen();
/* OPT-62549 END */

/* OPT-57749 START */
Insider.fns.onElementLoaded ('.breadcrumbs .item', function () {
    setTimeout (function () {
        if (!Insider.systemRules.call('isOnMainPage') && !Insider.systemRules.call('isOnAfterPaymentPage') &&
        !Insider.systemRules.call('isOnCartPage') && !Insider.fns.inited && Insider.dom('.breadcrumbs .item').exists()) {

            var loginSelector = '.authorization-link-login:last';
            var notificationMainSelector = '.ins-preview-wrapper.ins-preview-wrapper-notification-center';
            var getCampLang = Insider.systemRules.call('getLang');
            var marginLeftValue;
            var notificationLayOut = '#layout-1505891501864';
            var notificationClosedClass = 'ins-notification-center-closed';

            Insider.fns.onElementLoaded(notificationMainSelector, function () {
                Insider.dom('.ins-preview-wrapper-notification-center .ins-notification-content')
                    .attr('style', 'background-color: rgba(0, 0, 0, 0) !important;' +
                'background-image: none !important;border-width: 0px !important;border-style: none !important;' +
                'display:block !important;border-color: rgb(50, 50, 50) !important;border-radius: 0px !important;');

                Insider.dom(notificationMainSelector).insertAfter(loginSelector);

                Insider.dom(notificationMainSelector).addClass('ins-notification-new-style');

                Insider.dom(loginSelector).addClass('ins-style-OPT56467');

                getCampLang === 'ro_RO' ? Insider.dom('.link.wishlist:last').css('margin-left', '40px') :
                    Insider.dom('.link.wishlist:last').css('margin-left', '30px');

                Insider.dom('#rev_slider_1_1_wrapper').addClass('ins-style-slider-wrapper').css('z-index', '-1');

                Insider.dom(notificationLayOut).css('z-index', '10');

                getCampLang === 'sk_SK' || getCampLang === 'cs_CZ' ? marginLeftValue = 10 : marginLeftValue = 5;

                Insider.dom('head')
                    .append('<style class="ins-custom-style-OPT56467">' +
                        ' .ins-style-OPT56467 { margin-right: 10px !important; } ' +
                        '.ins-notification-new-style { top: auto !important; left: auto !important;' +
                        'margin-left: ' + marginLeftValue + 'px} </style>');
            }).listen();

            Insider.eventManager.once('click.ins:notification:center:clicked',
                '.ins-notification-center-button', function () {
                    if (Insider.dom(notificationLayOut).hasClass(notificationClosedClass)) {
                        Insider.dom(notificationLayOut).removeClass(notificationClosedClass);
                    } else {
                        Insider.dom(notificationLayOut).addClass(notificationClosedClass);
                    }
                });
        }
    }, 4750);
}).listen();
/* OPT-57749 END */
/* OPT-62549 START */
(function (self) {
    var selectors = {
        notificationContent: '.ins-notification-content.ins-notification-content-notification-center',
        notificationWrapper: '.ins-preview-wrapper.ins-preview-wrapper-notification-center',
        hidedElement: '.header.content > ul > li.authorization-link > a > span',
        appendToLoggedIn: '.customer-welcome',
        appendToLoggedOut: '.authorization-link-login',
        contentWrapper: '.ins-content-wrapper.ins-content-wrapper-notification-center'
    };
    var notificationContentStyle = 'background-color: rgba(0, 0, 0, 0) !important; background-image: none !important;' +
        'border-width: 0px !important;border-style: none !important; display: block !important;' +
        'border-color: rgb(50, 50, 50) !important;border-radius: 0px !important;';
    var notificationWrapperStyle = 'display: block; visibility: visible; position: absolute;';

    self.init = function () {
        self.notificationCenterSettings();
    };

    self.notificationCenterSettings = function () {
        Insider.fns.onElementLoaded(selectors.notificationWrapper, function () {
            setTimeout(function () {
                if (Insider.systemRules.call('isUserLoggedIn') && (Insider.systemRules.call('isOnCategoryPage') ||
                        Insider.systemRules.call('isOnProductPage'))) {
                    switch (Insider.fns.parseURL().host) {
                        case '4fstore.ru':
                            Insider.dom(selectors.notificationWrapper).insertAfter(selectors.appendToLoggedIn);

                            Insider.dom(selectors.notificationContent).attr('style',
                                notificationContentStyle + 'margin-left:6.5rem !important');
                            Insider.dom(selectors.notificationWrapper).attr('style',
                                notificationWrapperStyle + 'margin-left: 5rem;');

                            Insider.dom(selectors.hidedElement).hide();
                            break;
                        case '4fstore.com':
                            Insider.dom(selectors.notificationWrapper).insertAfter(selectors.appendToLoggedIn);

                            Insider.dom(selectors.notificationContent).attr('style',
                                notificationContentStyle + 'margin-left:9rem !important');

                            Insider.dom(selectors.hidedElement).hide();
                            break;
                        case '4fstore.cz':
                            Insider.dom(selectors.notificationWrapper).insertAfter(selectors.appendToLoggedIn);

                            Insider.dom(selectors.notificationContent).attr('style',
                                notificationContentStyle + 'margin-left:6.5rem !important');
                            Insider.dom(selectors.notificationWrapper).attr('style',
                                notificationWrapperStyle);

                            Insider.dom(selectors.hidedElement).hide();
                            break;
                        case '4fstore.de':
                            Insider.dom(selectors.notificationWrapper).insertAfter(selectors.appendToLoggedIn);

                            Insider.dom(selectors.notificationContent).attr('style',
                                notificationContentStyle + 'margin-left:7.5rem !important');

                            Insider.dom(selectors.hidedElement).hide();
                            break;
                        case '4fstore.sk':
                            Insider.dom(selectors.notificationWrapper).insertAfter(selectors.appendToLoggedIn);

                            Insider.dom(selectors.notificationContent).attr('style',
                                notificationContentStyle + 'margin-left:16.5rem !important');
                            Insider.dom(selectors.notificationWrapper).attr('style',
                                notificationWrapperStyle + 'margin-left:1rem');

                            Insider.dom(selectors.hidedElement).hide();
                            break;
                        case '4fstore.ro':
                            Insider.dom(selectors.notificationWrapper).insertAfter(selectors.appendToLoggedIn);

                            Insider.dom(selectors.notificationContent).attr('style',
                                notificationContentStyle + 'margin-left:7.5rem !important');
                            Insider.dom(selectors.notificationWrapper).attr('style',
                                notificationWrapperStyle);

                            Insider.dom(selectors.hidedElement).hide();
                            break;
                        case '4fstore.lt':
                            Insider.dom(selectors.notificationWrapper).insertAfter(selectors.appendToLoggedIn);

                            Insider.dom(selectors.notificationContent).attr('style',
                                notificationContentStyle + 'margin-left:9.5rem !important');
                            Insider.dom(selectors.notificationWrapper).attr('style',
                                notificationWrapperStyle);

                            Insider.dom(selectors.hidedElement).hide();
                            break;
                        case '4fstore.lv':
                            Insider.dom(selectors.notificationWrapper).insertAfter(selectors.appendToLoggedIn);

                            Insider.dom(selectors.notificationContent).attr('style',
                                notificationContentStyle + 'margin-left:7.5rem !important');
                            Insider.dom(selectors.notificationWrapper).attr('style',
                                notificationWrapperStyle);

                            Insider.dom(selectors.hidedElement).hide();
                            break;
                    }
                } else if (Insider.systemRules.call('isOnCategoryPage') ||
                Insider.systemRules.call('isOnProductPage')) {
                    switch (Insider.fns.parseURL().host) {
                        case '4fstore.cz':
                            Insider.dom(selectors.notificationWrapper).insertAfter(selectors.appendToLoggedOut);

                            Insider.dom(selectors.notificationContent).attr('style',
                                notificationContentStyle + 'margin-left:5.7rem !important');
                            Insider.dom(selectors.notificationWrapper).attr('style',
                                notificationWrapperStyle);
                            Insider.dom(selectors.contentWrapper).attr('style',
                                'margin-left:4.5rem !important;');
                            break;
                        case '4fstore.de':
                            Insider.dom(selectors.notificationContent).attr('style',
                                notificationContentStyle + 'margin-left: 8rem !important;');
                            break;
                        case '4fstore.sk':
                            Insider.dom(selectors.contentWrapper).attr('style', 'margin-left:4.5rem !important;');
                            break;
                        case '4fstore.ro':
                            Insider.dom(selectors.notificationWrapper).insertAfter(selectors.appendToLoggedOut);

                            Insider.dom(selectors.notificationContent).attr('style', notificationContentStyle +
                                'margin-left:8.7rem !important');
                            Insider.dom(selectors.notificationWrapper).attr('style', notificationWrapperStyle);
                            break;
                        case '4fstore.ru':
                            Insider.dom(selectors.notificationWrapper).insertAfter(selectors.appendToLoggedOut);

                            Insider.dom(selectors.notificationContent).attr('style',
                                notificationContentStyle + 'margin-left:5.5rem !important');
                            Insider.dom(selectors.notificationWrapper).attr('style', notificationWrapperStyle);
                            break;
                        case '4fstore.lt':
                            Insider.dom(selectors.notificationWrapper).insertAfter(selectors.appendToLoggedOut);

                            Insider.dom(selectors.notificationContent).attr('style',
                                notificationContentStyle + 'margin-left:5rem !important');
                            Insider.dom(selectors.notificationWrapper).attr('style', notificationWrapperStyle);
                            Insider.dom(selectors.contentWrapper).attr('style', 'margin-left:4.5rem !important;');
                            break;
                        case '4fstore.lv':
                            Insider.dom(selectors.notificationWrapper).insertAfter(selectors.appendToLoggedOut);
                            /* OPT-63129 Start */
                            Insider.dom(selectors.notificationContent).attr('style',
                                notificationContentStyle + 'margin-left:5.3rem !important');
                            Insider.dom(selectors.notificationWrapper).attr('style', notificationWrapperStyle);
                            Insider.dom(selectors.contentWrapper).attr('style', 'margin-left:4.5rem !important;');
                            break;
                            /* OPT-63129 End */
                    }
                }
            }, 450);
        }).listen();
    };
    self.init();
})({});
/* OPT-62549 END */
/* OPT-62549 START */
if (Insider.systemRules.call('isUserLoggedIn')) {
    Insider.dom('.ins-preview-wrapper.ins-preview-wrapper-notification-center').insertAfter('.customer-welcome');
    Insider.dom('.ins-notification-content.ins-notification-content-notification-center').attr('style',
        'background-color: rgba(0, 0, 0, 0) !important; background-image: none !important;' +
        'border-width: 0px !important;border-style: none !important; display: block !important;' +
        'border-color: rgb(50, 50, 50) !important;border-radius: 0px !important;margin-left:4rem !important');
}
/* OPT-62549 END */
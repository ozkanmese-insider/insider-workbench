/* OPT-54249 START */
if (Insider.dom('.mobile-menu').hasClass('open')) {
    Insider.dom('.header').hide();
}

var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutationRecord) {
        var $menu = Insider.dom(mutationRecord.target);

        if ($menu.hasClass('mobile-menu') && $menu.hasClass('open')) {
            Insider.dom('.header').hide();
        } else if ($menu.hasClass('mobile-menu')) {
            Insider.dom('.header').show();
        }
    });
});

observer.observe(Insider.dom('.mobile-menu').nodes[0], {
    attributes: true,
    attributeFilter: ['class']
});
/* OPT-54249 END */
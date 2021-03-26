/* OPT-56111 start */
(function (self) {
    var builderId = Insider.browser.isMobile() ? 11 : 12;
    var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);
    var mainSelector = 'ins-free-shipping-badge';

    self.init = function () {
        if (!Insider.campaign.info.isControlGroup(variationId)) {
            self.reset();
            self.checkUrls();
        }
    };

    self.reset = function () {
        Insider.dom('.' + mainSelector).remove();
    };

    self.checkUrls = function () {
        var productUrls = ['https://i-sleep.ro/mattresses/galaxy', 'https://i-sleep.ro/mattresses/ortorelax',
            'https://i-sleep.ro/trinity/', 'https://i-sleep.ro/vitalcare/', 'https://i-sleep.ro/baby-puzzle/',
            'https://i-sleep.ro/body-rest/', 'https://i-sleep.ro/coolcomfort/', 'https://i-sleep.ro/cosmopolitan/',
            'https://i-sleep.ro/mattresses/duosense', 'https://i-sleep.ro/mattresses/silver-plus',
            'https://i-sleep.ro/cool-comfort/', 'https://i-sleep.ro/vital-care/', 'https://i-sleep.ro/maxima/',
            'https://i-sleep.ro/memogel/'
        ];

        Insider.dom('.image > a').nodes.forEach(function (element, index) {
            if (productUrls.indexOf(element.href) > -1) {
                Insider.dom('.custom-fields:odd').nodes[index].innerHTML += self.badgeHTML();
            }
        });
    };

    self.badgeHTML = function () {
        return (
            '<div class="' + mainSelector + ' sp-custom-' + variationId + '-1">&nbsp;Livrare GRATUITĂ&nbsp;</div>'
        );
    };

    self.init();
})({});

true;
/* OPT-56111 end */
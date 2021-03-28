/* OPT-56111 start */
(function (self) {
    var builderId = Insider.browser.isMobile() ? 11 : 12;
    var goalId = Insider.browser.isMobile() ? 7 : 6;
    var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);
    var mainSelector = 'ins-free-shipping-badge';
    var productUrls = ['https://i-sleep.ro/mattresses/galaxy', 'https://i-sleep.ro/mattresses/ortorelax',
        'https://i-sleep.ro/mattresses/trinity', 'https://i-sleep.ro/mattresses/vitalcare',
        'https://i-sleep.ro/mattresses/baby-puzzle', 'https://i-sleep.ro/mattresses/body-rest',
        'https://i-sleep.ro/mattresses/coolcomfort', 'https://i-sleep.ro/mattresses/cosmopolitan',
        'https://i-sleep.ro/mattresses/duosense', 'https://i-sleep.ro/mattresses/silver-plus',
        'https://i-sleep.ro/pillows/cool-comfort', 'https://i-sleep.ro/pillows/vital-care',
        'https://i-sleep.ro/pillows/maxima', 'https://i-sleep.ro/pillows/maxima'];

    self.init = function () {
        if (!Insider.campaign.info.isControlGroup(variationId)) {
            self.reset();
            self.checkUrls();
        }

        self.sendCustomGoal();
    };

    self.reset = function () {
        Insider.dom('.' + mainSelector).remove();
    };

    self.checkUrls = function () {
        if (Insider.fns.hasParameter('i-sleep.ro/pillows')) {
            Insider.dom('.image > a').nodes.forEach(function (element, index) {
                if (productUrls.indexOf(element.href) > -1) {
                    Insider.dom('.custom-fields').nodes[index].innerHTML += self.badgeHTML();
                }
            });
        }

        if (Insider.fns.hasParameter('i-sleep.ro/mattresses')) {
            Insider.dom('.image > a').nodes.forEach(function (element, index) {
                if (productUrls.indexOf(element.href) > -1) {
                    Insider.dom('.custom-fields:odd').nodes[index].innerHTML += self.badgeHTML();
                }
            });
        }
    };

    self.badgeHTML = function () {
        return (
            '<div class="' + mainSelector + ' sp-custom-' + variationId + '-1">&nbsp;Livrare GRATUITĂ&nbsp;</div>'
        );
    };

    self.sendCustomGoal = function () {
        var addToCartButton = Insider.dom('#button-cart');

        productUrls.forEach(function (url) {
            if (url.indexOf(location.href) > -1) {
                Insider.fns.onElementLoaded(addToCartButton, function () {
                    Insider.eventManager.once('click.ins:user:clicked:opt-56111', addToCartButton, function () {
                        Insider.__external.sendCustomGoal(builderId, goalId, false);
                    });
                }).listen();
            }
        });

    };

    self.init();
})({});

true;
/* OPT-56111 end */
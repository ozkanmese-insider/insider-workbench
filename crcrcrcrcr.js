/* OPT-58247 Start */
(function (self) {
    var isDesktop = Insider.browser.isDesktop();
    var builderId = isDesktop ? 2381 : 2382;
    var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);
    var productCategories = Insider.systemRules.call('getProductCategories');
    var isOnProductPage = Insider.systemRules.call('isOnProductPage');

    var tooltipClasses = {
        container: 'ins-tooltip-container-' + variationId,
        text: 'ins-tooltip-text-' + variationId,
        style: 'ins-tooltip-style-' + variationId,
        closeButton: 'ins-tooltip-close-button-' + variationId,
    };

    var tooltipSelectors = {
        container: '.' + tooltipClasses.container,
        text: '.' + tooltipClasses.text,
        style: '.' + tooltipClasses.style,
        closeButton: '.' + tooltipClasses.closeButton,
        chatIcon: '#mm-fif'
    };

    self.init = function () {
        Insider.campaign.custom.show(variationId);

        if (!Insider.campaign.custom.isControlGroup(variationId)) {
            self.reset();
            self.buildCSS();
            self.buildHTML();
        }

        self.setEvents();
    };

    self.reset = function () {
        Insider.dom(tooltipSelectors.container + ',' + tooltipSelectors.style).remove();
    };

    self.buildCSS = function () {
        var tooltipStyle =
            '<style class="' + tooltipClasses.style + '">' +
                tooltipSelectors.container + ' {' +
                '   box-shadow: 3px 3px 6px 0px #888888;' +
                '   padding: 6px;' +
                '   max-width: 183px;' +
                '   height: 45px;' +
                '   position: fixed;' +
                '   bottom: ' + (isOnProductPage ? 73 : 128) + 'px;' +
                '   right: ' + (isOnProductPage ? 11 : 26) + 'px;' +
                '   z-index: 1;' +
                '   background-color: #2b80cff5;' +
                '   display: -webkit-box;' +
                '   border-radius: 8px 8px 0 8px;' +
                '   opacity: 0.94;' +
                '}' +
                tooltipSelectors.text + ' {' +
                '   margin-left: -11px;' +
                '   z-index: 1;' +
                '   opacity: 1;' +
                '   color: white;' +
                '   font-size: 12px;' +
                '   font-weight: 200;' +
                '   max-width: 196px;' +
                '   text-align: left;' +
                '}' +
                tooltipSelectors.closeButton + ' {' +
                '   position: relative;' +
                '   top: -12px;' +
                '   right: -161px;' +
                '   font-size: 20px;' +
                '   color: white;' +
                '   }' +
                '}' +
            '</style>';

        Insider.dom('head').append(tooltipStyle);
    };

    self.buildHTML = function () {
        var toolTipBoxHTML =
            '<div class="' + tooltipClasses.container  + '">' +
                '<a class="' + tooltipClasses.closeButton + '">×</a>' +
                '<div class="' + tooltipClasses.text + ' sp-custom-' + variationId + '-1">' +
                    'Dúvidas sobre esse produto? Fale com a gente ' + String.fromCodePoint(0x1F44B) +
                '</div>' +
            '</div>';

        Insider.dom(tooltipSelectors.chatIcon).before(toolTipBoxHTML);
    };

    self.setEvents = function () {
        Insider.eventManager.once('click.close:button:' + variationId, tooltipSelectors.closeButton, function () {
            self.closeCallOutContainer();
        });

        Insider.eventManager.once('click.call:out:container:' + variationId, tooltipSelectors.text, function () {
            window.parent.window.MMChatClient.events.openChat();

            self.closeCallOutContainer();
        });

        document.querySelector(tooltipSelectors.chatIcon).contentWindow.document.body.querySelector('.float-button').
            addEventListener('click', function () {
                self.closeCallOutContainer();

                Insider.fns.isFunction(Insider.__external.sendCustomGoal) &&
                Insider.__external.sendCustomGoal(builderId, 317, true);
            });
    };

    self.closeCallOutContainer = function () {
        Insider.dom(tooltipSelectors.container).css('display', 'none');
    };

    if (Insider.storage.localStorage.get('sp-camp-' + variationId) === null &&
        ((Insider.dom('#search-title').text().match(/sofá|materiais de construção/i) !== null &&
        Insider.fns.hasParameter('busca')) ||
        (isOnProductPage && (productCategories.includes('Sofás') ||
        productCategories.includes('Materiais de Construção'))))) {
        setTimeout(self.init, 6000);
    }
})({});

false;
/* OPT-58247 End */
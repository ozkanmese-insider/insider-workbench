/* OPT-62959 START */
(function (self) {
    var builderId = 969;
    var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);
    var classes = {
        customStyle: 'ins-style-' + variationId,
        wrapper: 'ins-preview-wrapper-' + variationId,
        modalContent: 'ins-modal-content-' + variationId,
        close: 'ins-close-' + variationId,
        container: 'ins-container-' + variationId,
        button1: 'ins-button1-' + variationId,
        button2: 'ins-button2-' + variationId,
        overlay: 'ins-overlay-' + variationId
    };

    self.init = function () {
        if (!Insider.campaign.isControlGroup(variationId)) {
            self.reset();
            self.setBannerHtml();
            self.setCss();
            self.setEvents();
        }
    };

    self.reset = function () {
        Insider.dom('.' + classes.overlay + ', .' + classes.wrapper + ' , .' + classes.customStyle).remove();
    };

    self.setBannerHtml = function () {
        var banner =
            '<div class="' + classes.overlay + '"></div>' +
            '<div class="' + classes.wrapper + '"' +
            '<div class="' + classes.modalContent + '">' +
            '<div class="' + classes.container + '">' +
            '<img src="https://image.useinsider.com/flyadeal/defaultImageLibrary/Screenshot_3-1623875382.png"' +
            ' style="width:450px">' +
            '<button class="' + classes.button1 + '"></button>' +
            '<button class="' + classes.button2 + '"></button>' +
            '</div>' +
            '</div>' +
            '</div>';

        Insider.dom(banner).appendTo('body');
    };

    self.setCss = function () {
        Insider.dom('head').append('<style class="' + classes.customStyle + '">' +
            '.' + classes.wrapper + '{display: block;position: fixed;z-index: 1000;width:450px;left: 35%; top: 30%; overflow: auto; background - color: rgb(0, 0, 0); background - color: rgba(0, 0, 0, 0.4);}' +
            '.' + classes.modalContent + '{background-color: #fefefe; margin:0 auto; padding: 20px; border: 1px solid #888;}' +
            '.' + classes.container + '{color: #000; text-decoration: none;}' +
            '.' + classes.button1 + '{position: absolute; opacity:0; width:30%;height:25px; top: 93%; left: 20%; transform: translate(-50%, -50%); -ms-transform: translate(-50%, -50%); background-color: #555; color: white; font-size: 12px; padding: 6px 24px; border: none; cursor: pointer; border-radius: 5px; text-align: center;}' +
            '.' + classes.button2 + '{position: absolute; opacity:0; width:38%;height:25px; top: 93%; left: 76%; transform: translate(-50%, -50%); -ms-transform: translate(-50%, -50%); background-color: #555; color: white; font-size: 12px; padding: 6px 24px; border: none; cursor: pointer; border-radius: 5px; text-align: center;}' +
            '.' + classes.overlay + '{z-index: 99; width: 100%; top: 0; left: 0; height: 100%; position: fixed; background-color: rgba(0, 0, 0, 0.5);}');
    };

    self.setEvents = function () {
        Insider.eventManager.once('click.close:button:' + variationId,
            '.' + classes.button1 + ', .' + classes.overlay,
            function () {
                self.reset();
            });
        Insider.eventManager.once('click.update:fare:button:1' + variationId,
            '.' + classes.button2 + ', .' + classes.overlay,
            function () {
                self.reset();
                Insider.dom('.journey-select_modifier-edit_button').click();

                Insider.__external.sendCustomGoal(969, 119, true);
            });
    };

    self.checkConditionsToShow = function () {
        if (Insider.dom('.searchresult_date_description_return').exists()) {
            if (Insider.dom('.journey_price_fare_name-text:eq(0)').text().trim() === 'fly' &&
                Insider.dom('.journey_price_fare_name-text:eq(1)').text().trim() === 'fly') {
                self.init();
            }
        } else {
            if (Insider.dom('.journey_price_fare_name-text:eq(0)').text().trim() === 'fly') {
                self.init();
            }
        }

    };

    self.checkConditionsToShow();
})({});
true;
/* OPT-62959 END */
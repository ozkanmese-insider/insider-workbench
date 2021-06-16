(function (self) {
    var builderId = 490;
    var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);
    var isControlGroup = Insider.campaign.isControlGroup(variationId);
    var classes = {
        wrapper: 'ins-preview-wrapper' + variationId,
        anchorsClass: 'ins-anchors-class-' + variationId,
        phone: 'ins-phone-icon-' + variationId,
        location: 'ins-location-icon' + variationId,
        chat: 'ins-chat-icon-' + variationId
    };

    self.init = function () {
        if (!isControlGroup) {
            self.reset();
            self.buildHtml();
            self.setEvents();
        }
    };
    self.reset = function () {
        Insider.dom('.' + classes.wrapper).remove();
    };

    self.buildHtml = function () {
        var iconBar =
            '<div class="' + classes.wrapper + '">' +
            '<a href="https://www.honda.ae/cars/" class="' + classes.anchorsClass + '">' +
            '<i class="' + classes.phone + '"></i></a>' +
            '<a href="https://www.honda.ae/cars/" class="' + classes.anchorsClass + '">' +
            '<i class="' + classes.location + '"></i></a>' +
            '<a href="https://www.honda.ae/cars/" class="' + classes.anchorsClass + '">' +
            '<i class="' + classes.chat + '"></i></a>' +
            '</div>';

        self.setPartnersNavigationBarStyle();

        Insider.dom('.actionbar-item.number.visible-phone').append(iconBar);
    };

    self.setPartnersNavigationBarStyle = function () {
        /* display non */
    };

    self.setEvents = function () {
        Insider.eventManager.once('click:phone:icon:' + variationId, '.' + classes.phone, function () {
            Insider.__external.sendCustomGoal(builderId, goalId, false);
        });

        Insider.eventManager.once('click:location:icon:' + variationId, '.' + classes.location, function () {
            Insider.__external.sendCustomGoal(builderId, goalId, false);
        });

        Insider.eventManager.once('click:chat:icon:' + variationId, '.' + classes.chat, function () {
            Insider.__external.sendCustomGoal(builderId, goalId, false);
        });
    };

    self.init();
})({});
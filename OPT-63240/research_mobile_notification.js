/* OPT-63146 END */
(function (self) {
    var builderId = 174;
    var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);
    var storageName = 'ins-notification-count-63240';
    var classes = {
        wrapper: 'ins-notification-center-wrapper-' + variationId,
        arrow: 'ins-notification-center-arrow-' + variationId,
        header: 'ins-notification-center-header-container-' + variationId,
        body: 'ins-notification-center-body-' + variationId,
        notificationBell: 'ins-notification-bell-' + variationId,
        notification: 'ins-notification-' + variationId,
        notificationInfoWrapper: 'ins-notification-info-wrapper-' + variationId,
        notificationUrl: 'ins-notification-url-' + variationId,
        notificationImage: 'ins-notification-image-' + variationId,
        notificationNameWrapper: 'ins-notification-name-wrapper-' + variationId,
        notificationName: 'ins-notification-name-' + variationId,
        notificationCount: 'ins-notification-count-' + variationId,
        customStyle: 'ins-style-' + variationId,
        defaultGoal: 'sp-custom-' + variationId + '-1',
    };
    var notifications = [{
        lang: 'pl_PL',
        url: 'https://4f.com.pl/',
        img: 'https://image.useinsider.com/4f/444/YxKdlFRPmZgavsCYFPFk1623669281.png',
        name: '12werwerwerwerwrwerwwerwerwerwerwerwerwerwerwer',
        content: 'denemednededmemdednedned'
    },
    {
        lang: 'pl_PL',
        url: 'https://4f.com.pl/',
        img: 'https://image.useinsider.com/4f/444/YxKdlFRPmZgavsCYFPFk1623669281.png',
        name: '12werwerwerwerwrwerwwerwerwerwerwerwerwerwerwer',
        content: 'denemednededmemdednedned'
    }];

    self.init = function () {
        if (!Insider.campaign.isControlGroup(variationId) && !Insider.systemRules.call('isOnMainPage') &&
            !Insider.systemRules.call('isOnCartPage')) {
            self.reset();
            self.buildNotificationCenter();
            self.setCss();
            self.setEvents();
            self.setNotificationCount();
        }
    };

    self.reset = function () {
        Insider.dom('.' + classes.notificationBell + ', .' + classes.wrapper + ' , .' + classes.customStyle).remove();
    };

    self.buildNotificationCenter = function () {
        var buildHtml =
            '<div class="' + classes.wrapper + '">' +
            '   <div class="' + classes.arrow + '"></div>' +
            '   <div class="' + classes.header + '">' +
            'AKTUALNE OFERTY SPECJALNE</div>' +
            '   <div class="' + classes.body + ' ' + classes.defaultGoal + '">' +
            self.setNotificaticationItemsHtml() +
            '   </div>' +
            '</div>';

        Insider.dom('#search_mini_form > div.field.search').after('<div class="' + classes.notificationBell + '">' +
            '<img src="https://image.useinsider.com/4f/defaultImageLibrary/icon_bell5-1616151742.png"></div>');

        Insider.dom('.' + classes.notificationBell).after(buildHtml);
        Insider.dom('.' + classes.wrapper).hide();
    };

    self.setNotificaticationItemsHtml = function () {
        var notificationHtml = '';

        notifications.forEach(function (notification) {
            if (notification.lang === Insider.systemRules.call('getLang')) {
                notificationHtml +=
                    '<div class="' + classes.notification + '">' +
                    '   <a href="' + notification.url + '" class="' + classes.notificationUrl + ' ' +
                    classes.defaultGoal + '">' +
                    '       <div class="' + classes.notificationInfoWrapper + '">' +
                    '           <div class="' + classes.notificationImage + '" style="background-image: url(' +
                    notification.img + ')"></div>' +
                    '           <div class="' + classes.notificationNameWrapper + '">' +
                    '               <p class="' + classes.notificationName + '">' + notification.name + '</p>' +
                    '               <p class="' + classes.notificationContent + '">' + notification.content + '</p>' +
                    '           </div>' +
                    '       </div>' +
                    '   </a>' +
                    '</div>';
            }
        });

        return notificationHtml;
    };

    self.setNotificationCount = function () {
        Insider.storage.localStorage.set({
            name: storageName,
            value: Insider.dom('.' + classes.notification).nodes.length
        });

        Insider.dom('.' + classes.notificationBell).prepend('<div class="' + classes.notificationCount + '">' +
            Insider.storage.localStorage.get(storageName) + '</div>');
    };

    self.setCss = function () {
        Insider.dom('head').append('<style class="' + classes.customStyle + '">' +
            '.' + classes.wrapper + ' {border-bottom: 1px solid #dadada;width: 86%; position: absolute;right: 4%; z-index: 999; background: white;display: flex; justify-content: center; align-items: flex-start; flex-wrap: wrap;} ' +
            '.' + classes.header + '{border-bottom: 1px solid #dadada; padding: 7px; text-align: center;background:black;color:white;width:100%;font-size:14px}' +
            '.' + classes.body + '{padding: 10px 10px 10px 10px; overflow-y: scroll; min-height: 100px; max-height: 400px;}' +
            '.' + classes.arrow + '{content: ""; width: 0; height: 0; right: 83px; border-style: solid; border-width: 0 10px 10px 10px;' +
            'border-color: transparent transparent black transparent; z-index: 2147483648; margin-top: -10px; position: absolute;}' +
            '.' + classes.notificationInfoWrapper + '{display: flex !important;align-items: flex-start;}' +
            '.' + classes.notification + '{margin-top: 15px;display:flex !important;}' +
            '.' + classes.notificationBell + '{margin-top:-48px !important;margin-left: -70%;width:45px !important;height:45px !important;}' +
            '.' + classes.notificationImage + '{background-repeat: no-repeat; min-width: 90px; height: 90px; background-position: 100% 100%;' +
            'background-size: contain;}' +
            '.' + classes.notificationNameWrapper + '{line-height: 1.3; margin-left: 10px;padding-top: 0px;font-weight: bold;}' +
            '.' + classes.notificationName + '{color: #4a4a4a !important;overflow-wrap: anywhere;font-size:12px;font-weight: bold}' +
            '.' + classes.notificationContent + '{color: #4a4a4a !important;overflow-wrap: anywhere;font-size:12px;font-weight:normal;}' +
            '.' + classes.notificationCount + '{position: absolute; background-color: red; border-radius: 45%; padding: 2px 3px; font-size: 8px; margin-left: 24px; color: white; margin-top: 6px;}' +
            '</style>');
    };

    self.setEvents = function () {
        Insider.eventManager.once('click.notification:' + variationId, '.' + classes.notificationBell,
            function () {
                if (Insider.dom('.' + classes.wrapper).attr('style') === 'display: none;') {
                    Insider.dom('.' + classes.wrapper).show();
                } else {
                    Insider.dom('.' + classes.wrapper).hide();
                }

                Insider.dom('.' + classes.notificationCount).hide();
            });

        Insider.eventManager.once('click.notification:1' + variationId, '.' + classes.notification,
            function () {
                Insider.__external.sendCustomGoal(174, 2, false);
            });
    };

    self.init();
})({});
true;
/* OPT-63146 END */

/* OPT-63146 END */
Insider.__external.sendCustomGoal = function (builderId, goalId, checkGoalExistence) {
    var goalOfCamp = Insider.goalBuilder.getGoalBuildersByBuilderId(builderId)[goalId];
    var variationId = Insider.campaign.userSegment.get()[builderId];
    var storageNameOfGoal = 'sp-goal-' + variationId + '-' + goalId;

    if (typeof goalOfCamp === 'undefined' ||
        (checkGoalExistence && Insider.storage.get(storageNameOfGoal, 'localStorage', true) !== null)) {
        return false;
    }

    goalOfCamp.goalList[0]['selectorString'] = 'true';

    Insider.goalBuilder.addGoalTracking();
};
/* OPT-63146 END */
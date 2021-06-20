/* OPT-50432 START */
Insider.__external.BannerManagementOPT50432 = function (currentData) {
    var isVisible = false;
    var self = {};
    var optNumber = 50432;
    var isMobile = Insider.browser.isMobile();
    var storageName = 'ins-default-attributes';
    var lastVisitedProductURL = (Insider.storage.localStorage.get(storageName) || {})
        .last_visited_product_url || '';
    var bannerCampaignData = currentData;
    var classNames = {
        addedBanner: 'ins-added-banner-' + optNumber,
        carouselAdditionalClass: 'ins-css-for-carousel-' + optNumber,
        eventHelper: 'ins-eventhelper-' + optNumber,
        styleHelper: 'ins-style-' + optNumber
    };
    var carouselSelector = '#carousel';

    self.init = function () {
        self.manageData();
    };

    self.manageData = function () {
        var platform = isMobile ? 'mobile' : 'desktop';

        isVisible = Object.keys(bannerCampaignData).some(function (currentValue) {
            if (lastVisitedProductURL.indexOf(currentValue) > -1) {

                self.setCampaign(bannerCampaignData[currentValue][platform]);

                return true;
            }
        });
    };

    self.setCampaign = function (data) {
        var variationId = Insider.campaign.userSegment.segments[data.builderId];
        var isControlGroup = Insider.campaign.isControlGroup(variationId);
        var defaultGoal = 'sp-custom-' + variationId + '-1';

        if (!isControlGroup) {
            self.setBanner(data, defaultGoal);
        }

        Insider.campaign.custom.show(variationId);
    };

    self.setBanner = function (data, defaultGoal) {
        var destinationLink = data.redirectionLink ? data.redirectionLink : lastVisitedProductURL;

        if (Insider.dom(carouselSelector).exists() && !Insider.dom('.' + classNames.addedBanner).exists()) {
            Insider.dom('<div style="margin-top: -60px;" class="' + defaultGoal + '"><img class="' + classNames.addedBanner + '" ' +
                    ' src="' + data.image + '" /></div>')
                .insertBefore(carouselSelector);

            Insider.dom(carouselSelector).addClass(classNames.carouselAdditionalClass);
        } else if (Insider.dom('.' + classNames.addedBanner).exists()) {
            Insider.dom('.' + classNames.addedBanner).attr('src', data.image);

            Insider.dom('.' + classNames.addedBanner).closest('div').attr({
                class: defaultGoal
            });
        }

        self.setStyle();
        self.setEvent(destinationLink, defaultGoal);
    };

    self.setStyle = function () {
        var style = '.' + classNames.carouselAdditionalClass + '{ display:none; }' +
            '.' + classNames.addedBanner + ' { width:100%; }';

        Insider.dom('.' + classNames.styleHelper).remove();
        Insider.dom('<style>').addClass(classNames.styleHelper).html(style).appendTo('head');
    };

    self.setEvent = function (destinationLink, defaultGoal) {
        Insider.eventManager.once('click.ins:redirection:' + optNumber, '.' + defaultGoal, function () {
            setTimeout(function () {
                window.location.href = destinationLink;
            }, 700);
        });
    };

    self.init();

    return isVisible;
};

true;
/* OPT-50432 END */
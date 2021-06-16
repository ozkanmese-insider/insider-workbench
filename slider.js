/* OPT-60282 START */
(function (self) {
    var isMobile = Insider.browser.isMobile();
    var isDefinedCustomGoal = Insider.fns.isFunction(Insider.__external.sendCustomGoal);
    var builderId = isMobile ? 407 : 406;
    var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);

    var campaignClass = {
        style: 'ins-custom-announcement-' + variationId,
        nextButton: 'ins-next-button-' + variationId,
        nextButtonIcon: 'ins-next-button-icon' + variationId,
        backButton: 'ins-back-button-' + variationId,
        backButtonIcon: 'ins-back-button-icon-' + variationId,
        wrapper: 'ins-wrapper-' + variationId,
        content: 'ins-content-' + variationId,
        mainContainer: 'ins-main-container-' + variationId,
        sliderWrapper: 'ins-slider-wrapper-' + variationId,
        sliderBody: 'ins-slider-body-' + variationId,
        pageWrapper: 'ins-page-wrapper-' + variationId,
        imageContainer: 'ins-image-container-' + variationId,
        imageLink: 'ins-image-link-' + variationId,
        image: 'ins-image-' + variationId,
        bottomContainer: 'ins-bottom-container-' + variationId,
        footerLeftContainer: 'ins-footer-left-' + variationId,
        footerMiddleContainer: 'ins-footer-middle-' + variationId,
        footerRightContainer: 'ins-footer-right-' + variationId,
        paginationContainer: 'ins-pagination-container-' + variationId,
        paginationDot: 'ins-pagination-dot-' + variationId,
        goal: 'sp-custom-' + variationId + '-1',
        active: 'ins-active-' + variationId
    };

    var campaignSelectors = Object.keys(campaignClass).reduce(function (accumulate, nextItem) {
        accumulate[nextItem] = '.' + campaignClass[nextItem];

        return accumulate;
    }, {});

    var campaignInformation = {
        slider: {
            desktop: [{
                imageUrl: 'https://image.useinsider.com/lcwaikikima/defaultImageLibrary/newseason-1620999546.jpeg',
                hrefLink: 'https://www.lcwaikiki.ma/en/new-season-ma-insdr-2021/'
            },
            {
                imageUrl: 'https://image.useinsider.com/lcwaikikima/defaultImageLibrary/newarrival-1620999535.jpeg',
                hrefLink: 'https://www.lcwaikiki.ma/en/new-arrivals-ma-insdr-2021/'
            },
            {
                imageUrl: 'https://image.useinsider.com/lcwaikikima/defaultImageLibrary/saveus70-1620999561.jpeg',
                hrefLink: 'https://www.lcwaikiki.ma/en/discounted-ma-insdr-2021/'
            }],

            mobile: [{
                imageUrl: 'https://image.useinsider.com/lcwaikikima/defaultImageLibrary/newseasonmobile-1621022866.jpeg',
                hrefLink: 'https://www.lcwaikiki.ma/en/new-season-ma-insdr-2021/'
            },
            {
                imageUrl: 'https://image.useinsider.com/lcwaikikima/defaultImageLibrary/newarrivalmobile-1621022883.jpeg',
                hrefLink: 'https://www.lcwaikiki.ma/en/new-arrivals-ma-insdr-2021/'
            },
            {
                imageUrl: 'https://image.useinsider.com/lcwaikikima/defaultImageLibrary/saveus70mobile-1621022850.jpeg',
                hrefLink: 'https://www.lcwaikiki.ma/en/discounted-ma-insdr-2021/'
            }]
        },

        pageSettings: {
            width: 1000,
            height: 80,
        },

        arrowSettings: {
            containerMargin: -70,
            containerWidth: 33,
            containerHeight: 33,
            containerPadding: 8,
            iconWidth: 10,
            iconHeight: 10
        },

        goalIds: {
            campaignClick: 33,
            bannerClick: 34
        }
    };

    self.init = function () {
        if (!Insider.campaign.isControlGroup(variationId)) {
            self.reset();
            self.setDeviceDifference();

            var pageInformation = self.createSliderPagesInformation();

            self.buildHTML(pageInformation);
            self.buildCss(pageInformation);
            self.setEvents();
            self.setVisibleToWrapperWithDelay(1000);
        }

        return true;
    };

    self.reset = function () {
        Insider.dom(campaignSelectors.wrapper + ',' + campaignSelectors.style).remove();
    };

    self.setDeviceDifference = function () {
        if (isMobile) {
            campaignInformation.pageSettings.width = window.innerWidth - (window.innerWidth / 4) - 10;
            campaignInformation.pageSettings.height = 75;
            campaignInformation.arrowSettings.containerMargin = -75;
            campaignInformation.arrowSettings.containerWidth = 20;
            campaignInformation.arrowSettings.containerHeight = 20;
            campaignInformation.arrowSettings.containerPadding = 0;
            campaignInformation.arrowSettings.iconHeight = 8;
            campaignInformation.arrowSettings.iconWidth = 8;
            campaignInformation.slider = campaignInformation.slider.mobile;
        } else {
            campaignInformation.slider = campaignInformation.slider.desktop;
        }
    };

    self.buildCss = function (pageInformation) {
        var css =
            campaignSelectors.wrapper + ' {' +
            '    width: 100%;' +
            '    height: 100%;' +
            '    display:none;' +
            '    margin-top: 25px;' +
            '}' +
            '' +
            campaignSelectors.content + ' {' +
            '    width: inherit;' +
            '    height: inherit' +
            '    overflow: hidden;' +
            '    margin: 0px auto;' +
            '}' +
            '' +
            campaignSelectors.mainContainer + ' {' +
            '    width: inherit;' +
            '    height: inherit' +
            '}' +
            '' +
            campaignSelectors.sliderWrapper + ' {' +
            '    width: ' + campaignInformation.pageSettings.width + 'px;' +
            '    height: inherit;' +
            '    overflow: hidden;' +
            '    margin: 0px auto;' +
            '}' +
            '' +
            campaignSelectors.sliderBody + ' {' +
            '    width: ' + (campaignInformation.pageSettings.width * campaignInformation.slider.length) + 'px;' +
            '    padding: 0 !important;' +
            '    transition: 1000ms transform;' +
            '    list-style: none;' +
            '    margin: 0px;' +
            '    display: inline-flex;;' +
            '}' +
            '' +
            campaignSelectors.pageWrapper + ' {' +
            '    width: ' + campaignInformation.pageSettings.width + 'px;' +
            '    height: ' + campaignInformation.pageSettings.height + 'px;' +
            '    cursor:pointer;' +
            '}' +
            '' +
            campaignSelectors.image + ' {' +
            '     background-size: 100% 100%;' +
            '}' +
            '' +
            campaignSelectors.bottomContainer + ' {' +
            '    width: inherit;' +
            '    height: inherit;' +
            '    display: flex;' +
            '    color: black;' +
            '    justify-content: center;' +
            '    align-items: center;' +
            '    text-align: center;' +
            '    height: 25px;' +
            '}' +
            '' +
            campaignSelectors.footerLeftContainer + ' {' +
            '    text-align: center;' +
            '    margin-left: 10px;' +
            '    left: 0;' +
            '    position: inherit;' +
            '}' +
            '' +
            campaignSelectors.footerMiddleContainer + ' {' +
            '    text-align: center;' +
            '    margin: 0px auto;' +
            '}' +
            '' +
            campaignSelectors.footerRightContainer + ' {' +
            '    text-align: center;' +
            '    margin-right: 10px;' +
            '    right: 0;' +
            '    position: inherit;' +
            '}' +
            '' +
            campaignSelectors.paginationContainer + ' {' +
            '    text-align: center;' +
            '    display: flex;' +
            '    padding: 0px;' +
            '    margin: 0px;' +
            '}' +
            '' +
            '' +
            campaignSelectors.backButton + ' {' +
            '}' +
            '' +
            campaignSelectors.nextButton + ' {' +

            '}' +
            '' +
            campaignSelectors.backButton + ',' +
            campaignSelectors.nextButton + ' {' +
            '   padding: ' + campaignInformation.arrowSettings.containerPadding + 'px;' +
            '   background-color: #004b9c;' +
            '   border-radius: 50%;' +
            '   width: ' + campaignInformation.arrowSettings.containerWidth + 'px;' +
            '   height: ' + campaignInformation.arrowSettings.containerHeight + 'px;' +
            '   text-align: center;' +
            '   justify-content: center;' +
            '   align-items: center;' +
            '   margin-top: ' + campaignInformation.arrowSettings.containerMargin + 'px;' +
            '}' +
            '' +
            campaignSelectors.backButtonIcon + ',' +
            campaignSelectors.nextButtonIcon + ' {' +
            '    cursor: pointer;' +
            '    border: solid white;' +
            '    border-width: 0 3px 3px 0;' +
            '    display: inline-block;' +
            '    width: ' + campaignInformation.arrowSettings.iconWidth + 'px;' +
            '    height: ' + campaignInformation.arrowSettings.iconHeight + 'px;' +
            '    padding: 0px;' +
            '}' +
            '' +
            campaignSelectors.nextButtonIcon + ' {' +
            '   transform: rotate(-45deg);' +
            '   -webkit-transform: rotate(-45deg);' +
            '    margin-left: -2px;' +
            '}' +
            '' +
            campaignSelectors.backButtonIcon + ' {' +
            '   transform: rotate(135deg);' +
            '   -webkit-transform: rotate(135deg);' +
            '    margin-right: -2px;' +
            '}' +
            '' +
            campaignSelectors.wrapper + '[data-slider="0"] ' + campaignSelectors.backButton + ',' +
            campaignSelectors.wrapper + '[data-slider="' + (campaignInformation.slider.length - 1) + '"] ' + campaignSelectors.nextButton +
            '{' +
            '    visibility: hidden;' +
            '}' +
            '' +
            campaignSelectors.paginationDot + ' {' +
            '    width: 6px;' +
            '    height: 6px;' +
            '    left: 1px;' +
            '    top: 1px;' +
            '    background: #91949F;' +
            '    opacity: 0.5;' +
            '    border-radius: 50%;' +
            '    margin: 6px 4px 4px 4px;' +
            '    -webkit-border-radius: 100%;' +
            '}' +
            '' +

            pageInformation.dotStyleSelector + '{' +
            '    opacity: 1;' +
            '    width: 8px;' +
            '    height: 8px;' +
            '    left: 27px;' +
            '    top: 0px;' +
            '    background: #0A2ECC;' +
            '    margin: 5px 4px 4px 4px;' +
            '}' +
            '' +
            campaignSelectors.active + '{' +
            '    display: block !important;' +
            '} ';

        Insider.dom('body')
            .append('<style type="text/css" class="' + campaignClass.style + '">' + css + '</style>');
    };

    self.buildHTML = function (pagesInformation) {
        var html = '<div class="' + campaignClass.wrapper + ' ' + campaignClass.goal + '" data-slider="0">' +
            '<div class="' + campaignClass.content + '">' +
            '<div class="' + campaignClass.mainContainer + '">' +
            '<div class="' + campaignClass.sliderWrapper + '" >' +
            '<ul class="' + campaignClass.sliderBody + '">' +
            (pagesInformation.pagesHTML) +
            '</ul>' +
            '</div>' +
            '</div>' +
            '<div class="' + campaignClass.bottomContainer + '">' +
            '<div class="' + campaignClass.footerLeftContainer + ' ' + campaignClass.goal + '">' +
            '<div class="' + campaignClass.backButton + '">' +
            '<div class="' + campaignClass.backButtonIcon + '"></div>' +
            '</div>' +
            '</div>' +
            '<div class="' + campaignClass.footerMiddleContainer + '">' +
            (pagesInformation.paginationHTML) +
            '</div>' +
            '<div class="' + campaignClass.footerRightContainer + ' ' + campaignClass.goal + '">' +
            '<div class="' + campaignClass.nextButton + '">' +
            '<div class="' + campaignClass.nextButtonIcon + '"></div>' +
            '</div>' +
            '</div>' +
            '</div><div>';

        Insider.dom('.home__big__image').before(html);
    };

    self.createSliderPagesInformation = function () {
        var pagesInformation = {
            pagesHTML: '',
            paginationHTML: '<div class="' + campaignClass.paginationContainer + ' ' + campaignClass.goal + ' ">',
            dotStyleSelector: ''
        };

        campaignInformation.slider.forEach(function (information, index) {
            pagesInformation.pagesHTML += '<li class="' + campaignClass.pageWrapper + ' ' + campaignClass.goal + '">' +
                '<div class="' + campaignClass.imageContainer + '">' +
                '<div class="' + campaignClass.imageLink + '" href="' + information.hrefLink + '">' +
                '<img class="' + campaignClass.image + '"  src="' + information.imageUrl + '"/>' +
                '</div>' +
                '</div>' +
                '</li>';

            pagesInformation.paginationHTML += '<div class="' + campaignClass.paginationDot +
                '" data-slider="' + (index) + '"></div>';

            pagesInformation.dotStyleSelector += campaignSelectors.wrapper + '[data-slider="' + index + '"] ' +
                campaignSelectors.paginationDot + '[data-slider="' + index + '"]';

            pagesInformation.dotStyleSelector += (campaignInformation.slider.length - 1 !== index ? ',' : '');
        });

        pagesInformation.paginationHTML += '</div>';

        return pagesInformation;
    };

    self.setEvents = function () {
        Insider.eventManager
            .off('click.ins:next:button:' + variationId, campaignSelectors.wrapper + ' ' +
                campaignSelectors.nextButton)
            .on('click.ins:next:button:' + variationId,
                campaignSelectors.wrapper + ' ' + campaignSelectors.nextButton,
                function (event) {
                    self.moveSlider('Right', event);
                });

        Insider.eventManager
            .off('click.ins:back:button:' + variationId, campaignSelectors.wrapper + ' ' +
                campaignSelectors.backButton)
            .on('click.ins:back:button:' + variationId,
                campaignSelectors.wrapper + ' ' + campaignSelectors.backButton,
                function (event) {
                    self.moveSlider('Left', event);
                });

        Insider.eventManager
            .off('click.ins:dot:button:' + variationId, campaignSelectors.wrapper + ' ' +
                campaignSelectors.paginationDot)
            .on('click.ins:dot:button:' + variationId,
                campaignSelectors.wrapper + ' ' + campaignSelectors.paginationDot,
                function (event) {
                    self.moveSlider('Dot', event);
                });

        Insider.eventManager
            .off('click.ins:banner:image:' + variationId, campaignSelectors.wrapper + ' ' +
                campaignSelectors.imageLink)
            .on('click.ins:banner:image:' + variationId,
                campaignSelectors.wrapper + ' ' + campaignSelectors.imageLink,
                function (event) {
                    if (isDefinedCustomGoal) {
                        Insider.__external.sendCustomGoal(builderId, campaignInformation.goalIds.bannerClick);
                        Insider.__external.sendCustomGoal(builderId, campaignInformation.goalIds.campaignClick);
                    }

                    setTimeout(function () {
                        window.location.href = Insider.dom(event.target).parent(campaignSelectors.imageLink)
                            .attr('href') || '';
                    }, 500);
                });

        if (isMobile) {
            self.setTouchEvents();
        }
    };

    self.moveSlider = function (destinationRotate, event) {
        var $wrapper = Insider.dom(event.target).parents(campaignSelectors.wrapper);
        var sliderCount = Number($wrapper.attr('data-slider') || 0);

        if (destinationRotate === 'Right') {
            sliderCount++;
        } else if (destinationRotate === 'Left') {
            sliderCount--;
        } else if (destinationRotate === 'Dot') {
            sliderCount = Number(Insider.dom(event.target).attr('data-slider') || 0);
        }

        if (sliderCount === campaignInformation.slider.length) {
            sliderCount = 0;
        } else if (sliderCount < 0) {
            sliderCount = campaignInformation.slider.length - 1;
        }

        $wrapper.attr('data-slider', sliderCount);

        Insider.dom(campaignSelectors.sliderBody, $wrapper)
            .attr('style', 'transform: translateX(-' + (campaignInformation.pageSettings.width * sliderCount) + 'px);');

        if (isMobile) {
            $wrapper.trigger('click');
        }

        isDefinedCustomGoal &&
            Insider.__external.sendCustomGoal(builderId, campaignInformation.goalIds.campaignClick);
    };

    self.setTouchEvents = function () {
        var xDown = null;
        var yDown = null;
        var handleTouchStart;
        var handleTouchMove;

        handleTouchStart = function (event) {
            xDown = event.originalEvent.touches[0].clientX;
            yDown = event.originalEvent.touches[0].clientY;
        };

        handleTouchMove = function (event) {
            if (!xDown || !yDown) {
                return;
            }

            var xUp = event.originalEvent.touches[0].clientX;
            var yUp = event.originalEvent.touches[0].clientY;
            var xDiff = xDown - xUp;
            var yDiff = yDown - yUp;

            if (Math.abs(xDiff) > Math.abs(yDiff)) {
                if (xDiff > 0) {
                    self.moveSlider('Right', event);
                } else {
                    self.moveSlider('Left', event);
                }
            }

            xDown = null;
            yDown = null;
        };

        if (typeof jQuery === 'function') {
            jQuery(campaignSelectors.wrapper).off('touchstart').on('touchstart', handleTouchStart);
            jQuery(campaignSelectors.wrapper).off('touchmove').on('touchmove', handleTouchMove);
        }
    };

    self.setVisibleToWrapperWithDelay = function (delayTime) {
        setTimeout(function () {
            Insider.dom(campaignSelectors.wrapper).addClass(campaignClass.active);
        }, delayTime);
    };

    return self.init();
})({});
/* OPT-60282 END */
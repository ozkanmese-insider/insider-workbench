/* OPT-56656 Start */
Insider.__external.changeBannerConfig56656 = function (config) {
    var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(config.builderId);
    var slidesSelector = '.hero-banner-comp .slick-slide';
    var $slides = Insider.dom(slidesSelector);
    var selectedSlides = [$slides.eq(config.order), $slides.eq(config.order + 5)];

    config.order === 5 && selectedSlides.push($slides.eq(0));

    selectedSlides.forEach(function (slide) {
        slide.find('.herobanner-item').addClass('sp-custom-' + variationId + '-1');
        slide.find('img:eq(0)').attr('style', 'visibility: hidden;');
        slide.find('a').attr('href', config.url);
        slide.find('h2 span').html(config.title);
        slide.find('p').html(config.desc);
        slide.find('button').attr('data-hover', config.cta);
        slide.find('button').attr('href', config.url);
        slide.find('button span').html(config.cta);
    });

    var imageReplacementStyle =
        '<style class="ins-banner-config-style-' + variationId + '">' +
        '.sp-custom-' + variationId + '-1' +
        '{background: url("' + config.image + '") no-repeat center;}' +
        '<style>';

    Insider.dom('head').append(imageReplacementStyle);
};

true;
/* OPT-56656 End */

/* OPT-57192 START*/
(function (self) {
    var selectors = {
        email: '.row.ng-scope .email-input input[name=email',
        checkbox: '.InputGroup--stacked .terms-input input[name=tcAccept]',
        signUpButton: '.Welcome-back-form[name=unlockSingupForm] .btn',
    };

    var checkWebsite = Insider.fns.parseURL().pathname.indexOf('/95777') > -1 ? 'kualalumpur' :
        Insider.fns.parseURL().pathname.indexOf('/110653') > -1 ? 'okinawa' : '';

    self.init = function () {
        if (checkWebsite === 'kualalumpur' || checkWebsite === 'okinawa') {
            self.setEvents();
        }
    };

    self.setEvents = function () {
        Insider.eventManager.once('click.ins:signup:57192', selectors.signUpButton, function () {
            var submitFormControl = Insider.dom(selectors.email).val() !== '' &&
                Insider.dom(selectors.checkbox).prop('checked');

            if (submitFormControl) {
                self.sendLeadCollection();
            }
        });

    };

    self.sendLeadCollection = function () {
        Insider.request.post({
            url: 'https://unification.useinsider.com/api/attribute/v1/update',
            data: JSON.stringify({
                partner: Insider.partner.name,
                source: 'web',
                users: [{
                    identifiers: {
                        em: Insider.dom(selectors.email).val()
                    },
                    attributes: {
                        lid: checkWebsite === 'kualalumpur' ? [4] : [5],
                        eo: true,
                        gdpr: true,
                        co: ''
                    },
                    append: true
                }]
            })
        });
    };

    self.init();
})({});
/* OPT-57192 END*/
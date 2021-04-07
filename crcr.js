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
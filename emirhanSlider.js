/* OPT-60920 START */
(function (self) {
    var builderId = 87;
    var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);
    var isControlGroup = Insider.campaign.isControlGroup(variationId);
    var wrapper = 'ins-banner-' + variationId;
    var goalIDs = [41, 42, 43, 44, 45];
    var images = [
        'https://image.useinsider.com/krackes/defaultImageLibrary/carrusel-marcas-birkenstock%20%282%29-1622638238.jpeg',
        'https://image.useinsider.com/krackes/defaultImageLibrary/carrusel-marcas-converse%20%281%29-1622638256.jpeg',
        'https://image.useinsider.com/krackes/defaultImageLibrary/carrusel-marcas-teva%20%281%29-1622638269.jpeg',
        'https://image.useinsider.com/krackes/defaultImageLibrary/carrusel-marcas-havaianas%20%281%29-1622638280.jpeg',
        'https://image.useinsider.com/krackes/defaultImageLibrary/carrusel-marcas-vans%20%281%29-1622638290.jpeg',
    ];
    var links = [
        'https://www.krackonline.com/es/marca/birkenstock',
        'https://www.krackonline.com/es/marca/converse',
        'https://www.krackonline.com/es/marca/teva',
        'https://www.krackonline.com/es/marca/havaianas',
        'https://www.krackonline.com/es/marca/vans'
    ];

    self.init = function () {
        if (!isControlGroup) {
            self.reset();
            self.appendHTML();
            self.sendCustomGoal();
        }
    };

    self.reset = function () {
        Insider.dom(wrapper).remove();
    };

    self.appendHTML = function () {
        var sliders = self.buildHtml();

        Insider.dom('.vc_custom_1612452082515').first().append('<div class="' + wrapper + '">' + sliders + '</div>');
    };

    self.buildHtml = function () {
        var buildHtml = '';

        images.forEach(function (element, index) {
            buildHtml +=
                '<div class="ins-banner-div-' + variationId + '" data-index="' + index + '">' +
                '<a href="' + links[index] + '">' +
                '<div class="ins-banner-a-div-' + variationId + '">' +
                '<img src="' + element + '" class="ins-banner-img-' + variationId + '">' +
                '</div>' +
                '</a>' +
                '</div>';
        });

        return buildHtml;
    };

    self.sendCustomGoal = function () {
        Insider.eventManager.once('click.home:page:slider:' + variationId, '.ins-banner-div-' + variationId,
            function () {
                Insider.__external.sendCustomGoal(
                    builderId,
                    goalIDs[Insider.dom(this).attr('data-index')],
                    true
                );
            });
    };

    self.init();
})({});

true;
/* OPT-60920 END */

.ins-banner-c27 {
    overflow: scroll hidden;
    display: flex;
    z-index: 1;
}

.ins-banner-div-c27 {
    width: 70vw;
    flex-shrink: 0;
    -webkit-box-flex: 0;
    flex-grow: 0;
    margin: 15px 0;
}

.ins-banner-a-div-c27 {
    width: 100%;
    /* background-color: rgb(244, 244, 245); OPT-61951 */
}

.ins-banner-img-c27 {
    padding: 10px;
    object-fit: contain;
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    border-radius: 15px;
}

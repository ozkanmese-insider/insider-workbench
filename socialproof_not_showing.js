Insider.__external.changeLocationConfig = function (options) {
    var activeVariationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(options.builderId);/* OPT56639 */
    var isControlGroup = Insider.campaign.isControlGroup(activeVariationId);/* OPT56639 */

    if (!activeVariationId) {
        return false;
    }

    function changeLocation(variationId) {
        var locationConfig = ((Insider.campaign.get(variationId) || {}).pageSettings || {}).locationConfig || {};

        if (options.selectedElement) {
            locationConfig.selectedElement = options.selectedElement;
        }

        if (options.insertAction) {
            locationConfig.insertAction = options.insertAction;
        }
    }

    /* OPT56639 */
    if (!isControlGroup) {
        changeLocation(Insider.campaign.getFirstVariationByBuilderId(options.builderId).variationId);
        changeLocation(activeVariationId);
    } else {
        changeLocation(activeVariationId);
    }
    /* OPT56639 */

    return true;
};

Insider.__external.changeLocationConfig({
    builderId: 6,
    selectedElement: '.b-product-add_to_cart',
    insertAction: 'before'
});

true;

Insider.__external.changeLocationConfig = function (options) {
    var activeVariationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(options.builderId);/* OPT56639 */
    var isControlGroup = Insider.campaign.isControlGroup(activeVariationId);/* OPT56639 */

    if (!activeVariationId) {
        return false;
    }

    function changeLocation(variationId) {
        var locationConfig = ((Insider.campaign.get(variationId) || {}).pageSettings || {}).locationConfig || {};

        if (options.selectedElement) {
            locationConfig.selectedElement = options.selectedElement;
        }

        if (options.insertAction) {
            locationConfig.insertAction = options.insertAction;
        }
    }

    /* OPT56639 */
    if (!isControlGroup) {
        changeLocation(Insider.campaign.getFirstVariationByBuilderId(options.builderId).variationId);
    }
    changeLocation(activeVariationId);
    /* OPT56639 */

    return true;
};

Insider.__external.changeLocationConfig({
    builderId: 6,
    selectedElement: '.b-product-add_to_cart',
    insertAction: 'before'
});

true;
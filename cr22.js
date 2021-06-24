/* OPT-61942 Start */
Insider.__external.isPurchasedProductsFromSpecificCategoryIO = function (specificCategory) {
    if (Insider.systemRules.call('isOnAfterPaymentPage')) {
        var ruleStatus = false;

        var getUserPurchasedStorageData = ((window.insider_object || {}).transaction || {}).line_items || [];

        ruleStatus = getUserPurchasedStorageData.some(function (items) {
            return (((items || {}).product || {}).taxonomy || []).some(function (category) {
                return category === specificCategory;
            });
        });

        return ruleStatus;
    }
};
/* OPT-61942 End */

!Insider.dom('.loan-amount.flex-row.p-4 > div.form-group.pt-2 > button').exists(); /* OPT-62315 */
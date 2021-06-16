/* OPT-59479 START */
var builderId = 342;
var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);

if (!Insider.campaign.isControlGroup(variationId)) {
    Insider.dom('.header-default').attr('style', 'position: unset');
    Insider.dom('#mnm-search-header-bar').attr('style', 'position: unset');

    Insider.eventManager.once('click.add:to:cart:' + variationId, '.btn-list-add-to-cart', function () {
        Insider.__external.sendCustomGoal(builderId, 78, false);
    });
}
true;
/* OPT-59479 END */

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
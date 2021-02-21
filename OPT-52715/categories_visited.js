/*OPT-52715*/
var storageName = 'ins-categories-visited-52715';

if (Insider.systemRules.call('isOnCategoryPage')) {
    var pathArray = window.location.href.split('/');
    var categoryName =  pathArray[3];
    var visitedArray = JSON.parse(Insider.storage.localStorage.get(storageName)) || [];
    var index = visitedArray.indexOf(categoryName);

    if (index > -1) {
        visitedArray.splice(index, 1);
    }

    visitedArray.push(categoryName);
    
    Insider.storage.set({
        name: storageName,
        value: JSON.stringify(visitedArray)
    });

    JSON.parse(Insider.storage.localStorage.get(storageName));
}

Insider.storage.localStorage.get(storageName) || '';
/**OPT-52715 */

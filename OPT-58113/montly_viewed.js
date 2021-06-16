/* var viewedArticleData = JSON.parse(spApi.storageData('ins-viewed-article-count') || '{}');
var now = new Date().getTime();
var oneMonthInMilliseconds = 1000 * 60 * 60 * 24 * 30;
var afterOneMonth = now + oneMonthInMilliseconds;

if (!viewedArticleData.expiresAt || viewedArticleData.expiresAt < now) {
    viewedArticleData = {
        viewCount: 0,
        expiresAt: afterOneMonth
    };
}

if (spApi.isOnProductPage()) {
    viewedArticleData.viewCount++;
    spApi.storageData('ins-viewed-article-count', viewedArticleData, {
        expires: 30
    });
}

viewedArticleData.viewCount;

/* OPT-58113 START */
/* var storageName = 'ins-viewed-article-count-58113';
var viewedArticleCount = Insider.storage.localStorage.get(storageName) || 0;

if (Insider.fns.hasParameter('/article/')) {
    Insider.storage.localStorage.set({
        name: storageName,
        value: viewedArticleCount + 1,
        expires: 30
    });
}

Insider.storage.get(storageName) || 0; */
/* OPT-58113 */
/* OPT-58113 START */
var dateArray = Insider.dateHelper.getDateString().split(' ');
var storageName = 'ins-viewed-article-count-581133';
var viewedArticleCount = Insider.storage.localStorage.get(storageName) || 0;

if (dateArray[3] === '01') {
    if (Insider.fns.hasParameter('/article/')) {
        viewedArticleCount = 0;
    }
} else {
    if (Insider.fns.hasParameter('/article/')) {
        viewedArticleCount = viewedArticleCount + 1;
    }
}

Insider.storage.localStorage.set({
    name: storageName,
    value: viewedArticleCount
});

Insider.storage.get(storageName) || 0;
/* OPT-58113 END */
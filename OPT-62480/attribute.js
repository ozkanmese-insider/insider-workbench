/* OPT-62480 START */
var storageName = 'ins-discount-seekers-62480';
var visitCount = Insider.storage.get(storageName) || 0;

if (Insider.fns.hasParameter('au/specials')) {
    visitCount++;

    Insider.storage.localStorage.set({
        name: storageName,
        value: visitCount,
        expires: Insider.dateHelper.addDay(30)
    });
}

Insider.storage.localStorage.get(storageName) >= 2 || false;
/* OPT-62480 END */
/* OPT-59972 START */
var storageName = 'ins-user-visited-s21-59972';
var count = Insider.storage.get(storageName) || 0;

if (Insider.fns.hasParameter('/galaxy-s21-ultra-5g/') || Insider.fns.hasParameter('/galaxy-s21-5g/')) {
    count = count + 1;

    Insider.storage.set({
        name: storageName,
        value: count,
        expires: 14
    });
}

Insider.storage.get(storageName) > 2;
/* OPT-59972 END */
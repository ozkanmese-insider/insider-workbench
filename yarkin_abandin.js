/* OPT-59630 START */
var storageName = 'ins-abandon-from-registration-59630';

if (Insider.fns.hasParameter('/create-account')) {
    Insider.storage.localStorage.set({
        name: storageName,
        value: true
    });

    Insider.eventManager.once('click.create:account:59630', '.justify-content-end.next-button-row > div',
        function () {
            Insider.storage.localStorage.set({
                name: storageName,
                value: false
            });
        });
}

Insider.storage.localStorage.get(storageName) || false;
/* OPT-59630 END */
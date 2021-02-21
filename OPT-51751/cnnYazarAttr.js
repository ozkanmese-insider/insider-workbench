Insider.__external.saveWriterStorage = function (pathName, storageName) { 
    var path = window.location.href;
    var flag = false;

    if (path.indexOf(pathName) > -1) {
        flag = true;
    }

    Insider.storage.set({
        name: storageName,
        value: flag
    });

    return Insider.storage.get(storageName) || '';
};

Insider.__external.saveWriterStorage = function (pathName, storageName) {
    Insider.storage.set({
        name: storageName,
        value: Insider.fns.hasParameter(pathName)
    });

    return Insider.storage.get(storageName) || ''; };

if (typeof Insider.__external.saveWriterStorage === 'function') {
    // deneme
}

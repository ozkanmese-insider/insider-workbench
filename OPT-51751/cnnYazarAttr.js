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
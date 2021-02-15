/* OPT-51751 START */

/** OPT-51751 END */
Insider.__external.saveWriterStorage('/yonca-ozge-calli/', 'ins-yonca-haber-okundu');

var deneme = function (pathName, storageName) { 
    var path = window.location.href;
    var flag = false;

    if (path.indexOf(pathName) > -1) {
        flag = true;
    }

    Insider.storage.set({
        name: storageName,
        value: flag
    });

    Insider.storage.get(storageName) || '';
}('/alper-tuydes/', 'ins-alper-haber-okundu');

deneme('/alper-tuydes/', 'ins-alper-haber-okundu');
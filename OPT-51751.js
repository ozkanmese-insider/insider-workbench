/* OPT-51751 START */
var pathArray = window.location.href.indexOf('/mustafa-gundogar/');
var flag;

if(pathArray > -1) {
    flag = true;
} else {
    flag = false;
}

Insider.storage.set({
    name: 'ins-mustafa-haber-okundu',
    value: flag
});

Insider.storage.get('ins-mustafa-haber-okundu') || '';
/** OPT-51751 END */
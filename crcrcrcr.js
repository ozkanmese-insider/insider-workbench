/* OPT-57939 START */
var storageName = 'ins-almost-out-of-stock-57939';
var nodeList = Insider.dom('.msg-block.msg-block-itemStatus span:first-child').nodes;
var counter = 0;

nodeList.forEach(function (element) {
    if (element.innerHTML === 'ONLY 1 LEFT') {
        counter++;
    }
});

Insider.storage.localStorage.setItem({
    name: storageName,
    value: counter
});

Insider.storage.localStorage.get(storageName);
/* OPT-57939 END */
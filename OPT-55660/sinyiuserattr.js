/*OPT-55666 START*/
(function (self) {
    var isTradeInfoStorageName = 'ins-tradeInfo-55666';

    self.init = function () {
        self.setEvents();
    };

    self.setEvents = function () {
        var pageCaseSelector = '';

        if (Insider.systemRules.call('isOnCategoryPage')) {
            pageCaseSelector = '.buy-search-btn.d-lg-inline-block';
        } else if (Insider.systemRules.call('isOnProductPage')) {
            pageCaseSelector = '#buyContentTrade div span:last';
        }

        Insider.eventManager.once('click.ins:searched:before:opt55666', '.pagination > li , ' + pageCaseSelector,
            function () {
                self.setStorage();
            });
    };

    self.setStorage = function () {
        Insider.storage.set({
            name: isTradeInfoStorageName,
            value: true,
            expires: 365
        });
    };

    self.init();
})({});
/*OPT-55666 END*/
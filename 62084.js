/* OPT-57310 Start */
(function (self) {
    var builderId = 14;
    var variationId = Insider.campaign.userSegment.segments[builderId];
    var storageName = 'ins-form-control-storage-opt57310';
    var formInformation = [
        {
            formEntranceUrl: '/book-a-test-drive-i-pace',
            formCompleteUrl: '/test-surusu-ipace-tesekkurler',
            formEntrance: false,
            formComplete: false
        },
        {
            formEntranceUrl: '/book-a-test-drive-f-pace',
            formCompleteUrl: '/test-surusu-fpace-tesekkurler',
            formEntrance: false,
            formComplete: false
        },
        {
            formEntranceUrl: '/keep-me-informed-fpace',
            formCompleteUrl: '/kmi-tesekkurler-fpace',
            formEntrance: false,
            formComplete: false
        },
        {
            formEntranceUrl: '/keep-me-informed-epace',
            formCompleteUrl: '/kmi-tesekkurler-epace',
            formEntrance: false,
            formComplete: false
        },
        {
            formEntranceUrl: 'keep-me-informed-ipace',
            formCompleteUrl: '/kmi-tesekkurler-ipace',
            formEntrance: false,
            formComplete: false
        },
        {
            formEntranceUrl: 'keep-me-informed-ftype',
            formCompleteUrl: '/kmi-tesekkurler-ftype',
            formEntrance: false,
            formComplete: false
        },
        {
            formEntranceUrl: '/keep-me-informed-xe',
            formCompleteUrl: '/kmi-tesekkurler-xe',
            formEntrance: false,
            formComplete: false
        },
        {
            formEntranceUrl: '/keep-me-informed-xf',
            formCompleteUrl: '/kmi-tesekkurler-xf',
            formEntrance: false,
            formComplete: false
        },
        {
            formEntranceUrl: '/keep-me-informed-xj',
            formCompleteUrl: '/kmi-tesekkurler-xj',
            formEntrance: false,
            formComplete: false
        },
        {
            formEntranceUrl: '/book-a-test-drive-e-pace',
            formCompleteUrl: '/test-surusu-epace-tesekkurler',
            formEntrance: false,
            formComplete: false
        },
        {
            formEntranceUrl: '/online-chat',
            formCompleteUrl: '/online-chat-erisim',
            formEntrance: false,
            formComplete: false
        },
        {
            formEntranceUrl: '/contact-us-form',
            formCompleteUrl: '/iletisim-formu-tesekkurler',
            formEntrance: false,
            formComplete: false
        },
        {
            formEntranceUrl: '/owners-servicing-maintenance-book-service-online',
            formCompleteUrl: '/online-servis-formu-tesekkurler',
            formEntrance: false,
            formComplete: false
        },
        {
            formEntranceUrl: '/keep-me-informed',
            formCompleteUrl: 'https://www.jaguar-turkiye.com/tesekkurler',
            formEntrance: false,
            formComplete: false
        }
    ];

    Insider.storage.session.get(storageName) === null && Insider.storage.session.set({
        name: storageName,
        value: formInformation
    }); /* OPT-62084 */

    var formAbandonedStorage = Insider.storage.session.get(storageName); /* OPT-62084 */

    self.init = function () {
        if (Insider.systemRules.call('isOnCartPage')) {
            Insider.storage.localStorage.remove('sp-camp-' + variationId);

            self.checkCurrentPage({
                url: 'formEntranceUrl',
                value: 'formEntrance'
            });

            Insider.eventManager.once('mouseout.mouse:left:window:' + variationId, window, function (mouseEvent) {
                if (!mouseEvent.toElement && !mouseEvent.relatedTarget && mouseEvent.clientY < 0) {
                    formAbandonedStorage = Insider.storage.session.get(storageName); /* OPT-62084 */

                    formAbandonedStorage.some(function (form) {
                        if (window.location.href.indexOf(form.formEntranceUrl) > -1) {
                            if (form.formEntrance === true && form.formComplete === false) {
                                Insider.campaign.info.show(variationId);
                            }
                        }
                    });
                }
            });
        }

        if (Insider.systemRules.call('isOnAfterPaymentPage')) {
            self.checkCurrentPage({
                url: 'formCompleteUrl',
                value: 'formComplete'
            });
        }
    };

    self.checkCurrentPage = function (config) {
        formAbandonedStorage.some(function (form) {
            if (window.location.href.indexOf(form[config.url]) > -1) {
                form[config.value] = true;

                self.setFormAbandonedStorage();

                return;
            }
        });
    };

    self.setFormAbandonedStorage = function () {
        Insider.storage.session.set({
            name: storageName,
            value: formAbandonedStorage
        }); /* OPT-62084 */
    };

    self.init();
})({});

false;
/* OPT-57310 End */




















/* OPT-57310 Start */
(function (self) {
    var builderId = 14;
    var variationId = Insider.campaign.userSegment.segments[builderId];
    var storageName = 'ins-form-control-storage-opt57310';
    var formInformation = [
        {
            formEntranceUrl: '/book-a-test-drive-i-pace',
            formCompleteUrl: '/test-surusu-ipace-tesekkurler',
            formEntrance: false,
            formComplete: false
        },
        {
            formEntranceUrl: '/book-a-test-drive-f-pace',
            formCompleteUrl: '/test-surusu-fpace-tesekkurler',
            formEntrance: false,
            formComplete: false
        },
        {
            formEntranceUrl: '/keep-me-informed-fpace',
            formCompleteUrl: '/kmi-tesekkurler-fpace',
            formEntrance: false,
            formComplete: false
        },
        {
            formEntranceUrl: '/keep-me-informed-epace',
            formCompleteUrl: '/kmi-tesekkurler-epace',
            formEntrance: false,
            formComplete: false
        },
        {
            formEntranceUrl: 'keep-me-informed-ipace',
            formCompleteUrl: '/kmi-tesekkurler-ipace',
            formEntrance: false,
            formComplete: false
        },
        {
            formEntranceUrl: 'keep-me-informed-ftype',
            formCompleteUrl: '/kmi-tesekkurler-ftype',
            formEntrance: false,
            formComplete: false
        },
        {
            formEntranceUrl: '/keep-me-informed-xe',
            formCompleteUrl: '/kmi-tesekkurler-xe',
            formEntrance: false,
            formComplete: false
        },
        {
            formEntranceUrl: '/keep-me-informed-xf',
            formCompleteUrl: '/kmi-tesekkurler-xf',
            formEntrance: false,
            formComplete: false
        },
        {
            formEntranceUrl: '/keep-me-informed-xj',
            formCompleteUrl: '/kmi-tesekkurler-xj',
            formEntrance: false,
            formComplete: false
        },
        {
            formEntranceUrl: '/book-a-test-drive-e-pace',
            formCompleteUrl: '/test-surusu-epace-tesekkurler',
            formEntrance: false,
            formComplete: false
        },
        {
            formEntranceUrl: '/online-chat',
            formCompleteUrl: '/online-chat-erisim',
            formEntrance: false,
            formComplete: false
        },
        {
            formEntranceUrl: '/contact-us-form',
            formCompleteUrl: '/iletisim-formu-tesekkurler',
            formEntrance: false,
            formComplete: false
        },
        {
            formEntranceUrl: '/owners-servicing-maintenance-book-service-online',
            formCompleteUrl: '/online-servis-formu-tesekkurler',
            formEntrance: false,
            formComplete: false
        },
        {
            formEntranceUrl: '/keep-me-informed',
            formCompleteUrl: 'https://www.jaguar-turkiye.com/tesekkurler',
            formEntrance: false,
            formComplete: false
        }
    ];

    Insider.storage.localStorage.get(storageName) === null && Insider.storage.set({
        name: storageName,
        value: formInformation,
        expires: Insider.dateHelper.addDay(365)
    }, 'localStorage', false);

    var formAbandonedStorage = Insider.storage.localStorage.get(storageName);

    self.init = function () {
        if (Insider.systemRules.call('isOnCartPage')) {
            Insider.storage.localStorage.remove('sp-camp-' + variationId);

            self.checkCurrentPage({
                url: 'formEntranceUrl',
                value: 'formEntrance'
            });

            Insider.eventManager.once('mouseout.mouse:left:window:' + variationId, window, function (mouseEvent) {
                if (!mouseEvent.toElement && !mouseEvent.relatedTarget && mouseEvent.clientY < 0) {
                    formAbandonedStorage = Insider.storage.localStorage.get(storageName);

                    formAbandonedStorage.some(function (form) {
                        if (window.location.href.indexOf(form.formEntranceUrl) > -1) {
                            if (form.formEntrance === true && form.formComplete === false) {
                                Insider.campaign.info.show(variationId);
                            }
                        }
                    });
                }
            });
        }

        if (Insider.systemRules.call('isOnAfterPaymentPage')) {
            self.checkCurrentPage({
                url: 'formCompleteUrl',
                value: 'formComplete'
            });
        }
    };

    self.checkCurrentPage = function (config) {
        formAbandonedStorage.some(function (form) {
            if (window.location.href.indexOf(form[config.url]) > -1) {
                form[config.value] = true;

                self.setFormAbandonedStorage();

                return;
            }
        });
    };

    self.setFormAbandonedStorage = function () {
        Insider.storage.set({
            name: storageName,
            value: formAbandonedStorage,
            expires: Insider.dateHelper.addDay(365)
        }, 'localStorage', false);
    };

    self.init();
})({});

false;
/* OPT-57310 End */
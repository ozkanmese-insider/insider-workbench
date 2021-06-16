/* OPT-59164 Start */
(function (self) {
    var builderId = 18;
    var variationId = Insider.campaign.userSegment.segments[builderId];
    var storageName = 'ins-form-control-storage-opt59164';
    var formInformation = [
        {
            formEntranceUrl: '/book-a-test-drive-range-rover',
            formCompleteUrl: '/test-surusu-tesekkurler-range-rover',
            formEntrance: false,
            formComplete: false
        },
        {
            formEntranceUrl: '/book-a-test-drive-range-rover-sport',
            formCompleteUrl: '/test-surusu-tesekkurler-range-rover-sport',
            formEntrance: false,
            formComplete: false
        },
        {
            formEntranceUrl: '/book-a-test-drive-range-rover-velar',
            formCompleteUrl: '/test-surusu-tesekkurler-range-rover-velar',
            formEntrance: false,
            formComplete: false
        },
        {
            formEntranceUrl: '/book-a-test-drive-range-rover-evoque',
            formCompleteUrl: '/test-surusu-tesekkurler-range-rover-evoque',
            formEntrance: false,
            formComplete: false
        },
        {
            formEntranceUrl: '/book-a-test-drive-discovery',
            formCompleteUrl: '/test-surusu-tesekkurler-discovery',
            formEntrance: false,
            formComplete: false
        },
        {
            formEntranceUrl: '/book-a-test-drive-discovery-sport',
            formCompleteUrl: '/test-surusu-tesekkurler-discovery-sport',
            formEntrance: false,
            formComplete: false
        },
        {
            formEntranceUrl: '/contact-form',
            formCompleteUrl: '/tesekkurler',
            formEntrance: false,
            formComplete: false
        },
        {
            formEntranceUrl: '/ownership-service-and-maintenance-book-service-online',
            formCompleteUrl: '/online-servis-tesekkurler',
            formEntrance: false,
            formComplete: false
        },
        {
            formEntranceUrl: '/keep-me-informed-range-rover-evoque',
            formCompleteUrl: '/kmi-tesekkurler-range-rover-evoque',
            formEntrance: false,
            formComplete: false
        },
        {
            formEntranceUrl: '/keep-me-informed-defender',
            formCompleteUrl: '/kmi-tesekkurler-land-rover-defender',
            formEntrance: false,
            formComplete: false
        },
        {
            formEntranceUrl: '/keep-me-informed-range-rover-velar',
            formCompleteUrl: '/kmi-tesekkurler-range-rover-velar',
            formEntrance: false,
            formComplete: false
        },
        {
            formEntranceUrl: '/keep-me-informed-range-rover',
            formCompleteUrl: '/kmi-tesekkurler-range-rover',
            formEntrance: false,
            formComplete: false
        },
        {
            formEntranceUrl: '/keep-me-informed-range-rover-sport',
            formCompleteUrl: '/kmi-tesekkurler-range-rover-sport',
            formEntrance: false,
            formComplete: false
        },
        {
            formEntranceUrl: '/keep-me-informed-discovery',
            formCompleteUrl: '/kmi-tesekkurler-discovery',
            formEntrance: false,
            formComplete: false
        },
        {
            formEntranceUrl: '/keep-me-informed-discovery-sport',
            formCompleteUrl: '/kmi-tesekkurler-discovery-sport',
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
            formEntranceUrl: '/keep-me-informed',
            formCompleteUrl: '/online-chat-erisim',
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
        if (Insider.systemRules.call('isOnCartPage') || Insider.fns.hasParameter('/contact-form') ||
            Insider.fns.hasParameter('/ownership-service-and-maintenance-book-service-online')) {
            Insider.storage.localStorage.remove('sp-camp-' + variationId);

            self.checkCurrentPage({
                url: 'formEntranceUrl',
                value: 'formEntrance'
            });

            Insider.utils.onFastScroll(function () {
                formAbandonedStorage = Insider.storage.localStorage.get(storageName);

                formAbandonedStorage.some(function (form) {
                    if (window.location.pathname === form.formEntranceUrl) {
                        if (form.formEntrance === true && form.formComplete === false) {
                            Insider.campaign.info.show(variationId);
                        }
                    }
                });
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
            if (window.location.pathname === (form[config.url])) {
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
/* OPT-59164 End */
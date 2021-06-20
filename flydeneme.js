/* OPT-60489 START */
var builderId = 973;
var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId);
var storageName = 'ins-flight-booking-page-60489';
var selectors = {
    selectFlight: '.booking-steps > li:nth-child(1)',
    passengerDetails: '.booking-steps > li:nth-child(2)',
    extraServices: '.booking-steps > li:nth-child(3)',
    seatSelections: '.booking-steps > li:nth-child(4)',
    payment: '.booking-steps > li:nth-child(5)',
};

if (!Insider.campaign.isControlGroup(variationId)) {
    if (Insider.fns.hasParameter('/booking/select/')) {
        Insider.storage.localStorage.set({
            name: storageName,
            value: window.location.href
        });
    }
    var conditions = {
        passengerDetails: Insider.dom(selectors.passengerDetails).hasClass('active'),
        extraServices: Insider.dom(selectors.extraServices).hasClass('active'),
        seatSelections: Insider.dom(selectors.seatSelections).hasClass('active'),
        payment: Insider.dom(selectors.payment).hasClass('active'),
    };

    var events = [];

    if (conditions.passengerDetails || conditions.extraServices || conditions.seatSelections || conditions.payment) {
        events.push({
            eventName: 'click.breadcrumb:select:flight',
            selector: selectors.selectFlight,
            link: (Insider.storage.localStorage.get(storageName) || '')
        });

        if (!conditions.passengerDetails) {
            events.push({
                eventName: 'click.breadcrumb:passenger:details',
                selector: selectors.passengerDetails,
                link: '/en/detail'
            });

            if (!conditions.extraServices) {
                events.push({
                    eventName: 'click.breadcrumb:extra:services',
                    selector: selectors.extraServices,
                    link: '/en/services'
                });

                if (!conditions.seatSelections) {
                    events.push({
                        eventName: 'click.breadcrumb:seat:selections',
                        selector: selectors.seatSelections,
                        link: '/en/seatmap/'
                    });
                    events.push({
                        eventName: 'click.breadcrumb:payment',
                        selector: selectors.payment,
                        link: '/en/payment'
                    });
                }
            }
        }
    }

    var defineEvents = function (eventParameter) {
        Insider.eventManager.once(eventParameter.eventName, eventParameter.selector, function () {
            window.location.href = eventParameter.link;
        });
    };

    events.forEach(function (item) {
        defineEvents(item);
    });
}

true;
/* OPT-60489 END */
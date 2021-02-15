var setLocation = '';
var path = window.location.href;

if (path.indexOf('https://www.vodafone.com.tr/evde-internet') >-1) {
    switch (location.href) {
        case 'https://www.vodafone.com.tr/evde-internet/home/address':
            setLocation = 'address';
            break;
        case 'https://www.vodafone.com.tr/evde-internet/home/tariffs':
            setLocation = 'tarifeler';
            break;
        case 'https://www.vodafone.com.tr/evde-internet/home/customer-info':
            setLocation = 'customer-info';
            break;
        case 'https://www.vodafone.com.tr/evde-internet/home/onay':
            setLocation = 'onay';
            break;
        case 'https://www.vodafone.com.tr/evde-internet/home':
            setLocation = 'home';
            break;
        default:
            setLocation = '';
            break;    
    }
}

Insider.storage.set({
    name: 'ins-last-step',
    value: setLocation
});

Insider.storage.get('ins-last-step') || '';
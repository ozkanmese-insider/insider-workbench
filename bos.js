/* OPT-54261 START */
var redirectInformation=[{
    conditionLink: 'https://www.cigna.co.th/our-plans/signaturecare', 
    redirectLink: 'https://www.cigna.co.th/our-plans/signaturecare/Generic'}];

if (redirectInformation.conditionLink === '/our-plans/signaturecare') {
    setTimeout(function () {
        window.location.href = redirectInformation.redirectLink; 
    }, 500);
}
/* OPT-54261 END */
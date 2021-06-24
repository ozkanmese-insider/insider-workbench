/* OPT-62315 START */
if (Insider.systemRules.call('isOnMainPage')) {
    Insider.storage.localStorage.set({
        name: 'ins-new-form-landed-62315',
        value: !Insider.dom('.loan-amount.flex-row.p-4 > div.form-group.pt-2 > button').exists()
    });
}
/* OPT-62315 END */

Insider.storage.localStorage.get('ins-new-form-landed-62315') || false;/* OPT-62315 */

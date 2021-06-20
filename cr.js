(function (self) {
    var isDesktop = Insider.browser.isDesktop();
    var formBuilderId = isDesktop ? 551 : 552;
    var formVariationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(formBuilderId);
    var leadBuilderId = 545;
    var leadVariationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(leadBuilderId);
    var storageName = 'recipient-id-' + formVariationId;
    var isCampaignJoined = (Insider.storage.localStorage.get('sp-camp-' + formVariationId) || { joined: false }).joined;

    self.init = function () {
        if (!isCampaignJoined) {
            if (!Insider.campaign.isControlGroup(formVariationId)) {
                self.setStorage();
                self.sendLead();
            }

            Insider.campaign.custom.show(formVariationId);
        }
    };

    self.setStorage = function () {
        var recipientId = Insider.fns.getParameter('recipientID');

        if (recipientId) {
            Insider.storage.set({
                name: storageName,
                value: recipientId,
                expires: 365
            });
        }
    };

    self.buildHTML = function () {
        var html = '<div class="ins-overlay-' + formVariationId + '">\n' +
        '</div>\n' +
        '<div class="ins-pop-up-' + formVariationId + '">\n' +
        '    <div class="ins-close-button">x</div>\n' +
        '    <div class="ins-image-wrapper">' +
        '    <img class="ins-top-image"\n' +
        '         src="https://image.useinsider.com/clarinsuk/defaultImageLibrary/EFE-Form-1621344417.jpeg" alt="">\n' +
        '    <div class="ins-heading"><div class="ins-heading-1">NEW</div>' +
        '    <div class="ins-heading-2">Extra-Firming</br>Energy</div></div>' +
        '    </div>' +
        '    <div class="ins-form-part-step-1">\n' +
        '        <div class="ins-header-text">Enter you details and tap submit to receive your FREE sample:</div>\n' +
        '        <form class="ins-form" autocomplete="off" action="">\n' +
        '            <div class="ins-form-row">\n' +
        '                <label for="ins-email">Email address*</label>\n' +
        '                <input class="ins-input" type="email" name="email" id="ins-email" required>\n' +
        '            </div>\n' +
        '            <div class="ins-merge-row">\n' +
        '                <div class="ins-form-row ins-merge-element ins-merge-element-first">\n' +
        '                    <label for="ins-first-name">First Name*</label>\n' +
        '                    <input class="ins-input" type="text" id="ins-first-name" required>\n' +
        '                </div>\n' +
        '                <div class="ins-form-row ins-merge-element">\n' +
        '                    <label for="ins-last-name">Last Name*</label>\n' +
        '                    <input class="ins-input" type="text" id="ins-last-name" required>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="ins-form-row">\n' +
        '                <label for="ins-address-line-1">Address line 1*</label>\n' +
        '                <input class="ins-input" type="text" id="ins-address-line-1" required>\n' +
        '            </div>\n' +
        '            <div class="ins-merge-row">\n' +
        '                <div class="ins-form-row ins-merge-element ins-merge-element-first">\n' +
        '                    <label for="ins-address-line-2">Address line 2</label>\n' +
        '                    <input class="ins-input" type="text" id="ins-address-line-2">\n' +
        '                </div>\n' +
        '                <div class="ins-form-row ins-merge-element">\n' +
        '                    <label for="ins-address-line-3">Address line 3</label>\n' +
        '                    <input class="ins-input" type="text" id="ins-address-line-3">\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="ins-form-row">\n' +
        '                <label for="ins-town-or-city">Town/City*</label>\n' +
        '                <input class="ins-input" type="text" id="ins-town-or-city" required>\n' +
        '            </div>\n' +
        '            <div class="ins-form-row">\n' +
        '                <label for="ins-postcode">Postcode*</label>\n' +
        '                <input class="ins-input" type="text" id="ins-postcode" required>\n' +
        '            </div>\n' +
        '            <div class="ins-form-bottom-row ins-checkbox-row">\n' +
        '                <input style="appearance: auto;width: unset;height: unset;opacity: unset;position: unset;margin-right: 15px;"\n' +
        '                       type="checkbox" id="ins-checkbox">\n' +
        '                <div>I want to opt-in to receive future free samples via post from Clarins***</div>\n' +
        '            </div>\n' +
        '            <div class="ins-form-bottom-row ins-checkbox-row">\n' +
        '                <input style="appearance: auto;width: unset;height: unset;opacity: unset;position: unset;margin-right: 15px;"\n' +
        '                       type="checkbox" id="ins-checkbox" required>\n' +
        '                <div>I agree to the <a href="https://www.clarins.co.uk/support.html?question=total-eye-lift-sampling"' +
        '                    style="text-decoration: underline;">sampling terms of use</a> to receive postal samples.**</div>\n' +
        '            </div>\n' +
        '            <span class="ins-required-text" style="font-weight: bold; display: block; margin: 10px 0px 0px 25px;">(required)</span>' +
        '            <div class="ins-form-bottom-row ins-submit-row">\n' +
        '                <input type="submit" class="sp-custom-' + formVariationId + '-1" id="ins-form-submit" value="SUBMIT DETAILS" required>\n' +
        '            </div>\n' +
        '        </form>\n' +
        '        <div class="ins-footer-warning">*Required fields</div>\n' +
        '        <div class="ins-footer">***The information is processed by Clarins and its service providers to process your sample\n' +
        '            delivery, for the\n' +
        '            purposes\n' +
        '            of customer relations management. In particular to provide you with personalised offers and/or to manage your membership to our Loyalty Program and to create your custom beauty program. The data is kept for three years from your last order or contact. You have\n' +
        '            the right to access, correct, delete and transfer information concerning you as well as the right to oppose\n' +
        '            to\n' +
        '            and\n' +
        '            restrict its processing. You may exercise this right by contacting us. To find out more, please consult our\n' +
        '            privacy\n' +
        '            policy by clicking <a href="https://www.clarins.co.uk/help-privacy-security/privacy_policy.html" style="text-decoration: underline;">here</a>\n' +
        '           <div class="ins-footer-continued" style="margin-top:10px;">' +
        '           **The information collected with this form will be processed by Insider, ' +
        '           <span id="ins-user-address">INSIDER SERVICES UK LIMITED, 120 Regent Street, London, W1B 5FE, United Kingdom</span>' +
        '           on behalf of Clarins UK, Clarins (U.K.) Limited, a company registered in England and Wales under company number 01580079, 10 Cavendish' +
        '           Place, London, W1G 9DN, to send you this Total Eye Lift sample and emails relating to this sample. The data' +
        '           is kept for three years after your last order or contact. You have a right to access, rectify and erase your' +
        '           personal data as well as a right to object and restrict processing by' +
        '           contacting us. For more details on our Privacy Policy, click ' +
        '           <a href="#" style="text-decoration: underline;">here</a></div>' +
        '        </div>\n' +
        '        </div>\n' +
        '    <div class="ins-form-part-step-2">\n' +
        '        Thank you for submitting your details. Please note, your samples will take up to 2 weeks to reach your door.\n' +
        '        <br>\n' +
        '        \n' +
        '       <div class="ins-form-bottom-row ins-submit-row">\n' +
        '           <a href="https://www.clarins.co.uk/bestsellers/" id="ins-form-submit-2">CONTINUE SHOPPING</a>' +
        '       </div>\n' +
        '    </div>\n' +
        '</div>';

        return html;
    };

    self.sendLead = function () {
        var config = {
            builderId: formBuilderId,
            html: self.buildHTML(),
            prepareData: self.prepareData
        };

        (Insider.__external.customLeadCollectionSender || Insider.fns.noop)(config);
    };

    self.prepareData = function (userInformation) {
        var leadData = {
            is_frameless: true,
            form_data: [{
                type: 'text',
                id: '1545222171109',
                text: '',
                options: [{
                    id: '1545222171109',
                    text: Insider.storage.get(storageName) || '',
                    type: 'text',
                    inputType: 'text'
                }],
                questionId: '1545222171109',
            },
            {
                type: 'text',
                id: '1545222181559',
                text: '',
                options: [{
                    id: '1545222181559',
                    text: userInformation.email,
                    type: 'text',
                    inputType: 'text'
                }],
                questionId: '1545222181559',
            },
            {
                type: 'text',
                id: '1621254177653',
                text: '',
                options: [{
                    id: '1621254177653',
                    text: userInformation.firstName,
                    type: 'text',
                    inputType: 'text'
                }],
                questionId: '1621254177653',
            },
            {
                type: 'text',
                id: '1621254179011',
                text: '',
                options: [{
                    id: '1621254179011',
                    text: userInformation.lastName,
                    type: 'text',
                    inputType: 'text'
                }],
                questionId: '1621254179011',
            },
            {
                type: 'text',
                id: '1621254182339',
                text: '',
                options: [{
                    id: '1621254182339',
                    text: userInformation.address || '',
                    type: 'text',
                    inputType: 'text'
                }],
                questionId: '1621254182339',
            },
            {
                type: 'text',
                id: '1621254186947',
                text: '',
                options: [{
                    id: '1621254186947',
                    text: userInformation.addressLine2 || '',
                    type: 'text',
                    inputType: 'text'
                }],
                questionId: '1621254186947',
            },
            {
                type: 'text',
                id: '1621254187927',
                text: '',
                options: [{
                    id: '1621254187927',
                    text: userInformation.addressLine3 || '',
                    type: 'text',
                    inputType: 'text'
                }],
                questionId: '1621254187927',
            },
            {
                type: 'text',
                id: '1621254188992',
                text: '',
                options: [{
                    id: '1621254188992',
                    text: userInformation.townCity || '',
                    type: 'text',
                    inputType: 'text'
                }],
                questionId: '1621254188992',
            },
            {
                type: 'text',
                id: '1621254189983',
                text: '',
                options: [
                    {
                        id: '1621254189983',
                        text: userInformation.postcode || '',
                        type: 'text',
                        inputType: 'email'
                    }
                ],
                questionId: '1621254189983',
            },
            {
                type: 'text',
                id: '1621259012741',
                text: '',
                options: [
                    {
                        id: '1621259012741',
                        text: isDesktop ? 'Desktop' : 'Mobile',
                        type: 'text',
                        inputType: 'text'
                    }
                ],
                questionId: '1621259012741',
            },
            {
                type: 'text',
                id: '1555415354531',
                text: '',
                options: [{
                    id: '1555415354531',
                    text: 'I want to opt-in to receive future free samples via post from Clarins.',
                    type: 'checkbox',
                    inputType: 'email-opt-in'
                }],
                questionId: '1555415354531',
            }],
            uid: Insider.getUserId(),
            campaign_id: leadVariationId,
            source: location.href,
        };

        if (userInformation.optIn) {
            leadData.form_data.push({
                type: 'text',
                id: '1621253827467',
                text: '',
                options: [{
                    id: '1621253827467',
                    text: 'I agree to the sampling terms of use to receive postal samples.',
                    type: 'checkbox',
                    inputType: 'gdpr-opt-in'
                }],
                questionId: '1621253827467',
            });
        }

        return leadData;
    };

    self.init();
})({});

false;
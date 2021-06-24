/* OPT-58716 Start */
(function (self) {
    var builderId = 764;
    var variationId = Insider.campaign.userSegment.getActiveVariationByBuilderId(builderId) || 0;
    var classes = {
        trigger: 'ins-feedback-trigger-' + variationId,
        overlay: 'ins-feedback-overlay-' + variationId,
        wrapper: 'ins-feedback-wrapper-' + variationId,
        container: 'ins-feedback-container-' + variationId,
        closeButton: 'ins-feedback-button-closeButton-' + variationId,
        scoreContainer: 'ins-feedback-score-container-' + variationId,
        opinionContainer: 'ins-feedback-opinion-container-' + variationId,
        contactContainer: 'ins-feedback-contact-container-' + variationId,
        buttonContainer: 'ins-feedback-button-container-' + variationId,
        scoreQuestion: 'ins-feedback-score-question-' + variationId,
        scoreNumbers: 'ins-feedback-score-numbers-' + variationId,
        scoreNumber: 'ins-feedback-score-number-' + variationId,
        scoreScale: 'ins-feedback-score-scale-' + variationId,
        opinionQuestion: 'ins-feedback-opinion-question-' + variationId,
        opinionInput: 'ins-feedback-opinion-input-' + variationId,
        contactQuestion: 'ins-feedback-contact-question-' + variationId,
        inputTitle: 'ins-feedback-input-title-' + variationId,
        inputContainer: 'ins-feedback-input-container-' + variationId,
        emailContainer: 'ins-feedback-email-container-' + variationId,
        emailImage: 'ins-feedback-email-image-' + variationId,
        emailInput: 'ins-feedback-email-input-' + variationId,
        phoneContainer: 'ins-feedback-phone-container-' + variationId,
        phoneImage: 'ins-feedback-phone-image-' + variationId,
        phoneInput: 'ins-feedback-phone-input-' + variationId,
        completeButton: 'ins-feedback-button-complete-' + variationId,
        abortButton: 'ins-feedback-button-abort-' + variationId,
        style: 'ins-feedback-style-' + variationId,
        active: 'ins-active-' + variationId,
        shake: 'ins-shake-' + variationId,
        warning: 'ins-warning-' + variationId,
        goal: 'sp-custom-' + variationId + '-1'
    };
    var selectors = {};
    var storageName = 'feedback-completed-' + variationId;
    var isFeedbackCompleted = Insider.storage.get(storageName);

    Object.keys(classes).forEach(function (key) {
        selectors[key] = '.' + classes[key];
    });

    self.init = function () {
        if (!isFeedbackCompleted && !Insider.campaign.isControlGroup(variationId)) {
            setTimeout(function () {
                self.reset();
                self.buildHTML();
                self.builderNumbers();
                self.buildCSS();
                self.setEvents();
            }, 2000);
        }
    };

    self.reset = function () {
        Insider.dom(selectors.trigger).remove();
        Insider.dom(selectors.overlay).remove();
        Insider.dom(selectors.style).remove();
    };

    self.buildHTML = function () {
        var scoreQuestion = '*PttAVM.com\'u ailenize, arkadaşlarınıza ve çevrenize önerir miydiniz?';
        var opinionQuestion = '*PttAVM.com hakkındaki değerli görüşlerinizi bizimle paylaşır mısınız?';
        var contactQuestion = '*İsteğe bağlı iletişim bilgilerinizi bizimle paylaşabilirsiniz.';
        var triggerButton = 'https://image.useinsider.com/epttavm/defaultImageLibrary/z2-1620397787.png';
        var emailIcon = 'https://image.useinsider.com/epttavm/defaultImageLibrary/Icon-Mail-1619701241.png';
        var phoneIcon = 'https://image.useinsider.com/epttavm/defaultImageLibrary/Icon-Phone-1619701236.png';
        var closeIcon = 'https://image.useinsider.com/epttavm/defaultImageLibrary/error%20%281%29-1619869897.png';

        var modalHTML =
        '<img src="' + triggerButton + '"' + ' class="' + classes.trigger + '" />' +
        '<div class="' + classes.overlay + '">' +
        '<div class="' + classes.wrapper + '">' +
            '<div class="' + classes.container + '">' +
                '<div class="' + classes.scoreContainer + '">' +
                    '<div class="' + classes.scoreQuestion + '">' + scoreQuestion + '</div>' +
                    '<div class="' + classes.scoreNumbers + '">' + '</div>' +
                    '<div class="' + classes.scoreScale + '">' +
                        '<div>' + 'Hiç Önermezdim' + '</div>' +
                        '<div>' + 'Kesinlikle Önerirdim' + '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="' + classes.opinionContainer + '">' +
                    '<div class="' + classes.opinionQuestion + '">' + opinionQuestion + '</div>' +
                    '<input type="text" class="' + classes.opinionInput + '" />' +
                '</div>' +
                '<div class="' + classes.contactContainer + '">' +
                    '<div class="' + classes.contactQuestion + '">' + contactQuestion + '</div>' +
                    '<div class="' + classes.emailContainer + '">' +
                        '<div class="' + classes.inputTitle + '">' + 'E-Mail' + '</div>' +
                        '<div class="' + classes.inputContainer + '">' +
                            '<div class="' + classes.emailImage + '">' + '<img src="' + emailIcon + '">' + '</div>' +
                            '<input type="text" placeholder="Mail adresinizi giriniz" class="' +
                            classes.emailInput + '" />' +
                        '</div>' +
                    '</div>' +
                    '<div class="' + classes.phoneContainer + '">' +
                        '<div class="' + classes.inputTitle + '">' + 'Telefon Numarası' + '</div>' +
                        '<div class="' + classes.inputContainer + '">' +
                            '<div class="' + classes.phoneImage + '">' + '<img src="' + phoneIcon + '">' + '</div>' +
                            '<input type="text" placeholder="Telefon numaranızı giriniz" class="' +
                            classes.phoneInput + '" />' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="' + classes.buttonContainer + '">' +
                    '<div class="' + classes.completeButton + '">' + 'Anketi Tamamla' + '</div>' +
                    '<div class="' + classes.abortButton + '">' + 'Alışverişe Devam Et' + '</div>' +
                '</div>' +
            '</div>' +
            '<img class="' + classes.closeButton + '" src="' + closeIcon + '" />' +
        '</div>' + '</div>';

        Insider.dom('body').append(modalHTML);
    };

    self.builderNumbers = function () {
        var numbersHTML = '';

        for (var index = 0; index <= 10; index++) {
            numbersHTML += '<div class="' + classes.scoreNumber + '">' + index + '</div>';
        }

        Insider.dom(selectors.scoreNumbers).append(numbersHTML);
    };

    self.buildCSS = function () {
        var style =
        selectors.trigger + '{' +
        'position: fixed;' +
        'top: 95%;' +
        'left: 5.5%;' +
        'transform: translate(-50%, -50%);' +
        'cursor: pointer;' +
        'user-select: none;' +
        'z-index: 98;' + '}' +
        selectors.overlay + '{' +
        'display: none;' +
        'position: fixed;' +
        'top: 0;' +
        'left: 0;' +
        'height: 100%;' +
        'width: 100%;' +
        'background-color: rgba(0,0,0,0.4);' +
        'user-select: none;' +
        'z-index: 9999;' + '}' +
        selectors.wrapper + '{' +
        'position: absolute;' +
        'top: 50%;' +
        'left: 50%;' +
        'font-size: 14px;' +
        'font-weight: 600;' +
        'transform: translate(-50%, -50%);' +
        'height: 610px;' +
        'width: 560px;' +
        'background-color: #FFFFFF;' +
        'z-index: 10000;' +
        'border-radius: 15px;' +
        'box-shadow: 0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%) !important' + '}' +
        selectors.container + '{' +
        'padding: 50px;' + '}' +
        selectors.scoreNumbers + '{' +
        'display: flex;' +
        'justify-content: center;' +
        'margin-top: 15px;' + '}' +
        selectors.scoreNumber + '{' +
        'display: flex;' +
        'justify-content: center;' +
        'align-items: center;' +
        'width: 30px;' +
        'height: 30px;' +
        'color: #00A6CE;' +
        'border: 2px solid #00A6CE;' +
        'border-radius: 5px;' +
        'cursor: pointer;' +
        'margin: 5.75px;' + '}' +
        selectors.scoreNumber + ':hover {' +
        'color: #FFFFFF;' +
        'background-color: #00A6CE;' + '}' +
        selectors.scoreScale + '{' +
        'display: flex;' +
        'justify-content: space-between;' +
        'font-size: 12px;' +
        'font-weight: 400;' + '}' +
        selectors.opinionContainer + '{' +
        'margin-top: 40px;' + '}' +
        selectors.opinionInput + '{' +
        'border-bottom: 1px solid #C2C2C2;' +
        'width: 100%;' +
        'outline: none;' +
        'margin-top: 10px;' + '}' +
        selectors.contactContainer + '{' +
        'margin-top: 40px;' + '}' +
        selectors.contactQuestion + '{' +
        'margin-bottom: 10px;' + '}' +
        selectors.inputTitle + '{' +
        'font-size: 12px;' +
        'font-weight: 400;' + '}' +
        selectors.inputContainer + '{' +
        'display: flex;' +
        'background-color: #F4F9FF;' +
        'margin-bottom: 10px;' + '}' +
        selectors.emailImage + ',' +
        selectors.phoneImage + '{' +
        'display: flex;' +
        'justify-content: center;' +
        'align-items: center;' +
        'height: 36px;' +
        'width: 56px;' +
        'border-right: 1.5px solid #00A6CE;' + '}' +
        selectors.emailImage + ' img,' +
        selectors.phoneImage + ' img {' +
        'height: 15px;' +
        'width: 18px;' + '}' +
        selectors.inputContainer + ' input{' +
        'width: 90%;' +
        'padding-left: 20px;' +
        'font-size: 12px;' +
        'background-color: #F4F9FF;' +
        'outline: none;' + '}' +
        selectors.buttonContainer + '{' +
        'display: flex;' +
        'flex-direction: column;' +
        'justify-content: center;' +
        'align-items: center;' +
        'margin-top: 30px;' + '}' +
        selectors.completeButton + '{' +
        'display: flex;' +
        'justify-content: center;' +
        'align-items: center;' +
        'width: 188px;' +
        'height: 46px;' +
        'color: #FFFFFF;' +
        'background-color: #00A6CE;' +
        'cursor: pointer;' +
        'border-radius: 10px;' + '}' +
        selectors.completeButton + ':hover {' +
        'color: #00A6CE;' +
        'border: 2px solid #00A6CE;' +
        'background-color: #FFFFFF;' + '}' +
        selectors.abortButton + '{' +
        'display: flex;' +
        'justify-content: center;' +
        'align-items: center;' +
        'width: 144px;' +
        'height: 30px;' +
        'padding: 5px;' +
        'cursor: pointer;' +
        'margin-top: 40px;' +
        'color: #00A6CE;' + '}' +
        selectors.abortButton + ':hover {' +
        'background-color: #E4FAFF;' + '}' +
        selectors.closeButton + '{' +
        'position: absolute;' +
        'height: 48px;' +
        'width: auto;' +
        'top: -20px;' +
        'right: -16px;' +
        'cursor: pointer;' + '}' +
        selectors.active + '{' +
        'color: #FFFFFF;' +
        'background-color: #00A6CE;' + '}' +
        selectors.shake + '{' +
        'animation: shake 0.8s cubic-bezier(.36,.07,.19,.97) both;' + '}' +
        selectors.warning + '{' +
        'color: #CB4335;' +
        'border: 2px solid #CB4335;' + '}' +
        '@keyframes shake {' +
            '10%, 90% {transform: translate3d(-1px, 0, 0);}' +
            '20%, 80% {transform: translate3d(2px, 0, 0);}' +
            '30%, 50%, 70% {transform: translate3d(-4px, 0, 0);}' +
            '40%, 60% {transform: translate3d(4px, 0, 0);}' +
        '}';

        Insider.dom('<style>').addClass(classes.style).html(style).appendTo('head');
    };

    self.sendLead = function (inputs) {
        var leadData = {
            form_data: [
                {
                    type: 'text',
                    id: '1545222171109',
                    text: '',
                    options: [
                        {
                            id: '1545222171109',
                            text: inputs.score,
                            type: 'text',
                            inputType: 'text'
                        }
                    ],
                    questionId: '1545222171109',
                },
                {
                    type: 'text',
                    id: '1619530422190',
                    text: '',
                    options: [
                        {
                            id: '1619530422190',
                            text: inputs.email,
                            type: 'text',
                            inputType: 'text'
                        }
                    ],
                    questionId: '1619530422190',
                },
                {
                    type: 'text',
                    id: '1619530423506',
                    text: '',
                    options: [
                        {
                            id: '1619530423506',
                            text: inputs.phone,
                            type: 'text',
                            inputType: 'text'
                        }
                    ],
                    questionId: '1619530423506',
                },
                {
                    type: 'text',
                    id: '1555414466168',
                    text: '',
                    options: [
                        {
                            id: '1555414466168',
                            text: inputs.opinion,
                            type: 'text',
                            inputType: 'text'
                        }
                    ],
                    questionId: '1555414466168',
                }
            ],
            uid: Insider.storage.localStorage.get('spUID'),
            campaign_id: 1403,
            source: window.location.href,
        };

        fetch('https://carrier.useinsider.com/v1/form/save-questionnaire/epttavm', {
            headers: {
                'accept': '*/*',
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                'pragma': 'no-cache',
                'sec-ch-ua-mobile': '?0',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'cross-site'
            },
            referrer: 'https://www.pttavm.com/',
            referrerPolicy: 'strict-origin-when-cross-origin',
            body: Insider.fns.stringify(leadData),
            method: 'POST',
            mode: 'cors',
            credentials: 'omit'
        });
    };

    self.setEvents = function () {
        Insider.eventManager.once('click.trigger:button:' + variationId, selectors.trigger, function () {
            Insider.dom(selectors.overlay).show();
            Insider.campaign.custom.show(variationId);
        });

        /* OPT-62624 Start */
        Insider.utils.onExitIntended(true, function () {
            var exitStorageName = 'ins-exit-intended-' + variationId;

            if (!Insider.storage.get(exitStorageName)) {
                Insider.dom(selectors.overlay).show();

                Insider.campaign.custom.show(variationId);

                Insider.storage.set({
                    name: exitStorageName,
                    value: true,
                    expires: Insider.dateHelper.addDay(14)
                }, 'localStorage', false);
            }
        });
        /* OPT-62624 End */

        Insider.eventManager.once('click.close:survey:' + variationId,
            selectors.abortButton + ',' + selectors.closeButton, function () {
                Insider.dom(selectors.overlay).hide();
            });

        Insider.eventManager.once('click.score:number:' + variationId, selectors.scoreNumber, function () {
            Insider.dom(selectors.scoreNumber).removeClass(classes.active);
            Insider.dom(this).addClass(classes.active);

            Insider.dom(selectors.completeButton).addClass(classes.goal);
        });

        Insider.eventManager.once('click.complete:survey:' + variationId, selectors.completeButton, function () {
            if (!Insider.dom(selectors.active).exists()) {
                Insider.dom(selectors.scoreNumbers).addClass(classes.shake);
                Insider.dom(selectors.scoreNumber).addClass(classes.warning);

                setTimeout(function () {
                    Insider.dom(selectors.scoreNumbers).removeClass(classes.shake);
                    Insider.dom(selectors.scoreNumber).removeClass(classes.warning);
                }, 800);
            } else {
                var inputs = {
                    score: Insider.dom(selectors.active).text(),
                    opinion: Insider.dom(selectors.opinionInput).val(),
                    email: Insider.dom(selectors.emailInput).val(),
                    phone: Insider.dom(selectors.phoneInput).val()
                };

                self.sendLead(inputs);

                Insider.dom(selectors.overlay).hide();
                Insider.dom(selectors.trigger).hide();

                Insider.storage.set({
                    name: storageName,
                    value: true,
                    expires: Insider.dateHelper.addDay(60)
                }, 'localStorage', false);
            }
        });
    };

    self.init();
})({});

false;
/* OPT-58716 Start */
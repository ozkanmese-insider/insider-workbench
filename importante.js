var initSurvey = function () {
    var elements = {
        sliderPage: '.ins-slider-page',
        adaptiveButton: '.ins-adaptive-button',
        adaptiveButtonContainer: '.ins-adaptive-button-container',
        copyToClipboardButton: '.ins-element-copy-to-clipboard-button',
        progressBar: '.ins-progress-bar-wrapper',
        firstPage: '.ins-slider-page:first',
        selectionRowInput: '.ins-survey-selection-row input',
        selectionContainer: '.ins-survey-selection-container',
        selectionRow: '.ins-survey-selection-row',
        surveyWrapper: '#ins-survey-questionnaire'
    };

    var setCopyButton = function () {
        sQuery(elements.copyToClipboardButton)
            .unbind('click.copyButton').on('click.copyButton', function () {
                if (!sQuery(this).hasClass('ins-show-assistant')) {
                    sQuery(document).trigger('setCopyButton' + camp.id, elements.copyToClipboardButton);
                    sQuery(elements.adaptiveButton, this).text('#{{After Click Text}}');
                    sQuery(this).closest(elements.adaptiveButtonContainer).addClass('copied');
                }
            });
    };

    var changeFirsPageIndex = function () {
        if (sQuery(elements.sliderPage).length === 1) {
            sQuery(elements.sliderPage).attr('id', sQuery(elements.sliderPage).attr('id').replace('-1', '-0'));
        }
    };

    var adjustProgressBarByLanguage = function () {
        var rightToLeftLangList = [
            'ar_AE',
            'ar_AR',
            'ar_EG',
            'ar_ME',
            'ar_SA',
            'fa_FA',
            'ur_UR'
        ];

        sQuery(elements.progressBar)
            .toggleClass('ins-progress-bar-rtl', rightToLeftLangList.indexOf(spApi.getLang()) > -1);

        sQuery(elements.surveyWrapper)
            .toggleClass('ins-rtl-content', rightToLeftLangList.indexOf(spApi.getLang()) > -1);
    };

    var registerEvents = function () {
        sQuery(elements.selectionRowInput).unbind('change.selection-row-input').change(function () {
            var surveyInputs = sQuery(this).parents(elements.selectionContainer).find(elements.selectionRowInput);

            sQuery(surveyInputs).each(function () {
                sQuery(this)
                    .parents(elements.selectionRow)
                    .toggleClass('ins-survey-selection-checked', sQuery(this).is(':checked'));
            });
        });
    };

    if (camp.id === 0) {
        sQuery(elements.progressBar).attr('width', '0');

        if (!sQuery(elements.sliderPage).hasClass('ins-active-slide')) {
            sQuery(elements.firstPage).addClass('ins-active-slide');
        }
    } else {
        if (typeof InsClipboard === 'undefined') {
            spApi.loadScript(spApi.staticUrl + 'js/clipboard.min.js', setCopyButton);
        } else {
            setCopyButton();
        }
    }
    
    /* URL Redirect */
    sQuery('#link-button-7406741596772').on('click', function () {
        var selectedValue = sQuery('[name="ins-option-page-7406741596772"]:checked').val();
        
        switch (selectedValue) {
        
            case ' Otomobilimi Değerlemek İstiyorum':
                window.location.href = 'https://www.ikinciyeni.com/fiyatlandirici';
                break;
        }
    });
    sQuery('#link-button-1619051132990').on('click', function () {
        var selectedValue = Insider.dom('#ins-question-1619051132990 .ins-survey-selection-row.ins-survey-selection-checked').text().trim();
        
        switch (selectedValue) {
            case 'Hemen Al Otomobilleri':
                window.location.href = 'https://www.ikinciyeni.com/garantili-ikinci-el-araba-ilanlari';
                break;
                
            case 'Günün Otomobilleri':
                window.location.href = 'https://www.ikinciyeni.com/ihaledeki-ikinci-el-arabalar-ve-fiyatlari';
                break;
    
        }
    });

sQuery('#link-button-3821861407576').on('click', function () {
        var selectedValue = Insider.dom('#ins-question-3821861407576 .ins-survey-selection-row.ins-survey-selection-checked').text().trim()
        
        switch (selectedValue) {
            case 'Nakit Satmak İstiyorum':
                window.location.href = 'https://www.ikinciyeni.com/aracimi-hemen-nasil-satabilirim';
                break;
                
            case 'Kullanırken Satmak İstiyorum':
                window.location.href = 'https://www.ikinciyeni.com/kullanirken-sat';
                break;
    
        }
    });
    changeFirsPageIndex();
    registerEvents();
    adjustProgressBarByLanguage();
};

initSurvey();

sQuery(document).on('framelessInited' + camp.id, initSurvey);

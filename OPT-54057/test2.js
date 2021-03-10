/* OPT-46537 START */
(function (self) {
    var skuIds = ['20218L.MLT', '20268L.NYEL', '20268L.PKTQ', '20294L.WMLT', '210024.BLK', '204105.BLK', '216012.BKCC', '216012.GYNV', '216038.TPBR', '232040WW.NVY', '232101.BBK', '232101.NVY', '302043L.SLLV', '302111L.LAV', '302111L.PNK', '302203L.BKMT', '302300L.BLU', '302497L.BLU', '314027L.GDMT', '314028L.LVMT', '400000L.BBLM', '400017L.BKGY', '400030L.BKLM', '400041L.BKGY', '51893.NVLM', '52458.BLK', '52458.WNVR', '52758.GYBK', '54430.BBK', '54430.CCRD', '65093.CHOC', '65093.BLK', '66272.BLK', '66272.TPE', '83070L.AQPR', '83070L.NVPK', '83070L.PKPR', '83071L.GYPK', '90725L.BBLM', '90740L.NVOR', '97858L.NVLM', '15901.MVE', '17690.BKPR', '140221.GRY', '15300.BBK', '149186.BKW', '149186.TEAL', '149186.WBK', '32777.BLSH', '32777.DKTP', '31440W.RAS', '31440W.SLT', '229005.CHAR', '52675.BLK', '52675.WBK', '210028.BLK', '55103.GYBL', '54156.BBK', '54156.BLGY', '66272W.BLK', '400110L.BGRD', '98237L.BBK', '82278L.BBK', '95024N.NVOR', '140038.BKW', '140038.CHAR', '149294.BKPK', '149294.LGCL', '149185.BKPK', '149185.NVLB', '74136.BLK', '74136.SAGE', '229003.NVBK', '54553.GYLM', '232109.WBK', '204045.BLK', '204045.CHOC', '232186.BBK', '232186.NVY', '100272.BLK', '119013.GRY', '31782.NVMT', '32975.WHT', '128133.NVHP', '136070.NVY', '136072.DEN', '136077.BLU', '73690.BBK', '73690.RED', '73690.ROS', '12607.TPE', '12837.NVY', '12837.WHT', '13106.ROS', '13111.NVY', '149207.GRY', '104015.LPRG', '77279.BLK', '216010.BBK', '55509.CCBK', '52927EWW.CCBK', '64943W.KHK', '200022.BLK', '77048.BBK', '77125.BLK', '77513.BLK', '302119L.LAV', '302302L.NVY', '85401L.NVAQ', '97877L.BBK', '400043N.CCOR', '400031N.NVYL', '302092N.BLCL', '302092N.PKMT', '124296.BBK', '124296.NVW', '44871.GRY', '204184.BLK', '210135.DKBR', '204175.BBK', '204185.DSCH', '204184.DSRT', '149207.NVY', '149204.WSL', '149206.LGLV', '149206.NVPK', '216010.BLK', '216010.GYBU', '302302L.GRY', '302453L.BKCL', '302453L.NVPK', '20331N.PKMT', '124403.BKAQ', '124403.GYLV', '124403.NVCL', '124401.BBK', '124401.GYLV', '124401.NVW', '15902.MVE', '128098.GMLT', '128098.NVMT', '136214.LTPK', '31440.BLK', '140055.BBK', '140055.NAT', '140050.BKBR', '140074.BKGY', '140074.NAT', '140152.LPD', '15300.RED', '15300.TPE', '111103.RED', '100272.TPE', '104163.BBK', '104163.NVCL', '149271.BKMT', '12837.BKW', '12837.TPE', '149177.BBK', '149177.WHT', '149177.YEL', '149414.BKLV', '149414.NVHP', '12606.NVLB', '124094.BKW', '124094.CHAR', '15311.BBK', '15311.GRY', '149219.BBK', '149219.NVLB', '149203.BKHP', '149203.GYLV', '149205.BBLP', '216116.BBK', '216116.GYNV', '216116.CCOR', '216121.BBK', '216121.TPE', '55515.BBK', '55515.KHK', '55352.BBK', '55352.CHOC', '52649W.CHAR', '52767.NVY', '204092.CHOC', '204138.BLK', '204138.TPE', '232001.NVOR', '400016L.LMBK', '400016L.NVOR', '97774L.BKLM', '400106L.NVLM', '403732L.BBK', '403732L.WHT', '314752L.NVMT', '302304L.LVMT', '302304L.NVMT', '20265N.HPTQ', '302860N.LAV', '302860N.PNK', '20249N.LVMT', 'M01SH18B.BLU', 'W3TT125.LTGR', 'W1JA139.BMLT', 'W2SH67.BLK', 'W4JA148.BLK', 'WHD43.LTGR', 'WHD43.PRLV', 'WHD45.LAV', 'WHD46.WHT', 'W1SK25.BMLT', 'WJA203.WHT', 'W1BR70.BKW', 'W1BR70.WHT', 'W1BR71.BMLT', 'MHD12.BLU', 'M1JA146.BLBK', 'M1JA147.BLU', 'M1JA168.BLBK', 'M1PT55.BLK', 'M1PT57.BLK', 'M1SH60.BLBK', 'M1SH63.BLK', 'M1TS264.GYMN', 'M1TS264.NVY', 'M1TS264.BKW', 'M2TS209.BLGY', 'M2TS209.LTBL', 'M2TS209.GYS', 'M1JA107.NVY', 'M1SH69.BLK', 'M1SH69.LTGY', 'M1SH69.NVY', 'M1TS159.GYMN', 'M1TS162.LTTN', 'M1TS161.LTBL', 'MHD12.WHT', 'W03PT49.LTGR', 'W1BR77.BKSL', 'W1LG134.BMLT', 'W1LG150.BLK', 'W1LG150.LTGR', 'W1LG150.RAS', 'W1TS287.GRY', 'W1TS287.LTGR', 'W3TS303.DKRS', 'W3TS303.LTMV', 'W1TT104.BLK', 'W1TT104.DKRS', 'W1TT104.LTMV', 'W2CP2.BLK', 'W4LG109.BKSL', 'W4SH45.BKSL', 'W2SH40.NVY', 'W2SH33.LPK', 'W2SH33.BLK', 'W2SH33.LTGR', 'W03JA82.LTGR', 'W03JA82.LPK', 'W03JA82.RAS', 'W03JA82.BLK', 'W3TT125.GRY', 'W3TT125.LAV', 'W1TS287.PRPK', 'W1TS287.LAV', 'W03PT49.LPK', 'W03PT49.RAS', 'W03PT49.BLK', 'W03LG30B.BUBR', 'W03LG30B.BLK', 'W03LG30B.NVY', 'W03LG30B.GYS', '66258.CHOC', '407271N.RYBK', '407271N.RDCC', '88888301.NVAQ', '149038.LGAQ', '149038.TPPK', '149039.NVGR', '210025.SND', '124228.WHT', '124228.GYAQ', '232119.BBK', '232119.OLBK', '52458.BBK', '155131.WBK', '237016.YLBL', '232032.NVRD', '302497L.LAV', '210025W.BLU', '210025.GRY', '210025.NVY', '158019.BLK', '52758.NVBK', '66258.BKCC', '210025.OLV', '124297.TPE', '124228.BKPK', '136258.GYBK', '128137.NVPK', '124167.BKMT', '124167.NVMT', '12837.RED', '149023.BKPK', '149023.GYCL', '149312.BBK', '149312.WSL', '149271.NVRG', '149371.NVHP', '149371.WGYP', '104150.CCLB', '104150.NTPK', '104009.LPD', '100214.BLK', '100214.TPE', '158082.BBK', '158082.GRY', '158081.BBK', '158081.GRY', '44882.DKTP', '216101.BKCC', '216101.OLBR', '220070.BKCC', '220070.WGY', '220045.YLBK', '232044.WBK', '232068.BKGY', '232068.TPE', '232103.BBK', '204092.BLK', '314401L.SLPK', '302204L.PKPR', '302205L.GRY', '302453L.AQPR', '302453L.NPTQ', '402101L.CCBK', '403603L.GYBK', '302204N.PKPR', '405660N.BKMT', '97366N.BKCC', '407210N.BKLM', '407210N.GUBK', '888028.BOL', '888028.WTN', '88888431.BOL', '88888431.WTN', '149204.BKSL', '149204.GRY', '149204.NVGD', '117029.LPD', '117062.BKMT', '117062.GYPK', '14675.BBK', '14675.NAT', '140038.WGY', '140090.BKW', '140090.GRY', '15437.LTMV', '12606.WSL', '104090.BKLV', '229005.TLBK', '401530L.BBLM', '97786L.CCLM', '97891L.NVS', '11930.GYW', '11930.YLW', '12606.BKTQ', '32816.MVE', '32817.WMLT', '32999.BKOR', '117013.BKW', '117017.MVE', '128012.GRY', '149054.BKRD', '149054.CCRD', '149054.GYPK', '149094.BKTN', '149094.WMT', '220027.NVGD', '232005.OLV', '232005.WRDB', '232013.CCBK', '232013.OLBK', '232023.BKW', '232026.TPBK', '302029L.BKTQ', '302069L.PNK', '302075L.BLK', '302075L.NVY', '302075L.PNK', '302126L.BKAQ', '82080L.LVMT', '97858L.BKCC', '97858L.BKRD', '97858L.CCRD', '98303L.BBK', '98303L.BKCC', '98303L.GYCC', '124162.MVE', '15952.BBK', '15952.BLU', '15905.BKW', '15905W.NVW', '136214.BBK', '140221.BBK', '124116.BBK', '124111.BBK', '124111.WBL', '17693.GYPK', '128075.BLPR', '128075.BKPK', '111103.BKW', '155300.MVE', '155301.WBRD', '155016.WMLT', '73690.OFWT', '73690.YLW', '155131.WMLT', '155357.WBK', '31723.MVE', '32964.LPD', '119077.NAT', '32825.BLK', '32825.BLSH', '32925.BBK', '32925.WSL', '32832.PNK', '232063.BBK', '65760.BLK', '31618.BBK', '31618.TPE', '31617.WHT', '48885.BLK', '158018.NTBK', '44852.BKW', '48459.BLK', '124094.TPE', '149341.BBK', '12992.BBK', '149341.NVY', '149340.BKTQ', '149340.NVCL', '149340.RED', '149036.BBK', '149036.BKLB', '55509EWW.GRY', '216014.KHK', '220081.GYBL', '220081.BKLM', '220045.BKWL', '229003.BBK', '243002.BKGY', '243100.NVY', '232041.BKW', '232041.NVY', '232103.BRN', '232044.NVGY', '55509.BKGY', '232026.BBK', '232106.BBK', '232106.OLV', '52767.BURG', '237079.OLV', '52456.BLU', '52456.TPE', '52468.RED', '52468.WSK', '65896W.NVY', '65896W.TPE', '66405.BLK', '66405.COG', '66401.BLK', '66401.COG', '210142.BLK', '210142.CDB', '204175.DSRT', '204094.BLK', '204094.CDB', '54150.CHAR', '54150.NVGY', '216010.KHK', '216010.NVY', '232046.BKCC', '232046.NVGY', '232069.BBK', '232069.BKGY', '232069.CHAR', '232069.TPNV', '65355.CHAR', '65355.LTBR', '65474.BKGY', '65474.TPE', '400084L.BKMT', '97786L.BKRY', '97786L.RDBK', '400077L.BGOR', '90522L.BKBL', '97773L.NVOR', '400083L.BLOR', '308000L.PNK', '302450L.NVCL', '302090L.WMLT', '302145L.SMLT', '302126L.GYNP', '314545L.LBMT', '20315L.MLT', '314025L.BKNP', '302081L.NCOR', '81548L.BKMT', '400016N.LMBK', '90524N.BBOR', '401520N.NVOR', '401520N.BKRB', '401500N.RDBK', '401500N.CCOR', '400083N.BLOR', '97366N.NTW', '97366N.CCOR', '97366N.RDBK', '302450N.GYBL', '302450N.NVCL', '302660N.SMLT', '302090N.WMLT', '314019N.BLMT', '20320N.PWMT', '90543N.BKCC', '90751N.BKSL', '204105.CHOC', '204105WW.CHOC', '204105WW.BLK', '124204.GYLV', '124204.NVTQ', '12606.LAV', '13474.NVPK', '13059.WBLP', '104081.BBK', '104081.NVY', '216044.BKGY', '216044.GRY', '232109.BKW', '232109.OLV', '210135.BLK', '204185.BBK', '314846L.GYMT', '302126L.NVLV', '302450L.GYBL', '400106L.BKCC', '403732L.BKCC', '403732L.RYOR', '302162L.BKMT', '302162L.WMLT', '97891L.BLK', '314900N.LVTQ', '314846N.GYMT', '401520N.CCBK', '400083N.GYLM', '149206.BKTQ', '53786.NVY', '53786.KHK', '124155.NTRD', '124155.NVRD', '124155.WNV', '124161.WMLT', '12837.ORG', '149243.BKMT', '149243.WMLT', '216027.BKCC', '216027.NVBR', '400110L.BKLM', '401530L.CCOR', '403603L.BKNV', '403603L.BKSL', '403732L.NVRD', '136070.LTPK', '15430.LTMV'
    ];

    var isMobile = Insider.browser.isMobile();
    var builderId = isMobile ? 57 : 76;
    var variationId = Insider.campaign.userSegment.segments[builderId];
    var isControlGroup = Insider.campaign.isControlGroup(variationId);
    var isOnCategoryPage = Insider.systemRules.call('isOnCategoryPage');
    var isOnSearchPage = Insider.fns.hasParameter('/search/');
    var newBadgeUrl = 'https://image.useinsider.com/skechersnz/defaultImageLibrary/newBadgev33-1606922608.png';
    var isShownCampaign = false;
    var isHtmlBuilded = false;
    var productContainerSelector = isMobile ? '.list.product-items.sli_container li' :
        '.products.product-items.sli_container li';

    var classes = {
        newBadge: 'ins-new-badge-' + variationId,
        style: 'ins-custom-style-' + variationId,
        defaultGoal: 'sp-custom-' + variationId + '-1'
    };

    self.init = function () {
        self.reset();
        self.updateSkuList();
        self.addHtml();
        self.setEvents();
    };

    self.reset = function () {
        Insider.dom('.' + classes.newBadge + ' , .' + classes.style).remove();
        Insider.dom('.' + classes.defaultGoal).removeClass(classes.defaultGoal);
    };

    self.updateSkuList = function () {
        skuIds = skuIds.map(function (skuId) {
            return skuId.toLowerCase().replace('.', '-');
        });
    };

    self.addHtml = function () {
        var html = '<div class="' + classes.newBadge + '"></div>';

        Insider.dom(productContainerSelector).nodes.some(function (item, index) {
            var productUrl = Insider.dom(item).attr('data-logging-url') || '';

            var isCorrectProduct = skuIds.some(function (skuId) {
                if (productUrl.indexOf(skuId) > -1) {
                    return true;
                }
            });

            if (isCorrectProduct) {
                !isControlGroup && Insider.dom('.product-item-photo:eq(' + index + ')').append(html);

                Insider.dom('.product-item-photo:eq(' + index + ') , .product-item-details:eq(' + index + ') ,' +
                    '.sli_product_link:eq(' + index + ')').addClass(classes.defaultGoal);

                if (!isShownCampaign) {
                    isShownCampaign = Insider.campaign.custom.show(variationId);
                }

                isHtmlBuilded = true;
            }
        });

        !isControlGroup && isHtmlBuilded && self.addCss();
    };

    self.addCss = function () {
        Insider.dom('head').append('<style class="' + classes.style + '">' +
            '.' + classes.newBadge + ' {position: absolute; bottom: 0px; ' + (isMobile ? 'background-size: contain; background-repeat: no-repeat; width: 44px; height: 32px;' : ' width: 80px;  height: 40px;') +
            'background-image: url(' + newBadgeUrl + ');}' +
            '</style>');
    };

    self.setEvents = function () {
        Insider.__external.isMainObserverSet46537 &&
            Insider.observer.disconnect(document.querySelector('.main-wrapper .column.main'));

        Insider.observer.observe(document.querySelector('.main-wrapper .column.main'), function () {
            Insider.__external.isMainObserverSet46537 = true;

            setTimeout(function () {
                self.init();
            }, 750);
        });
    };

    (isOnSearchPage || isOnCategoryPage) && self.init();
})({});

false;
/* OPT-46537 END */
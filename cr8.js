 /* URL Redirect */
 sQuery('#link-button-7406741596772').on('click', function () {
     var selectedValue = sQuery('[name="ins-option-page-7406741596772"]:checked').val();
     switch (selectedValue) {
         case ' Otomobilimi Değerlemek İstiyorum':
             window.location.href = 'https://www.ikinciyeni.com/fiyatlandirici';
             break;
     }
 });
 sQuery('.ins-survey-selection-row').on('click', function () {
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
 sQuery('#ins-question-3821861407576 .ins-survey-selection-row').on('click', function () {
     setTimeout(function () {
         var selectedValue = Insider.dom('#ins-question-3821861407576 .ins-survey-selection-row.ins-survey-selection-checked').text().trim()

         switch (selectedValue) {
             case 'Nakit Satmak İstiyorum':
                 window.location.href = 'https://www.ikinciyeni.com/aracimi-hemen-nasil-satabilirim';
                 break;
             case 'Kullanırken Satmak İstiyorum':
                 window.location.href = 'https://www.ikinciyeni.com/kullanirken-sat';
                 break;
         }
     }, 500);
 });


 sQuery('#ins-question-1619051132990 .ins-survey-selection-row').on('click', function () {
     setTimeout(function () {
         var selectedValue = Insider.dom('#ins-question-1619051132990 .ins-survey-selection-row.ins-survey-selection-checked').text().trim();

         switch (selectedValue) {
             case 'Hemen Al Otomobilleri':
                 window.location.href = 'https://www.ikinciyeni.com/garantili-ikinci-el-araba-ilanlari';
                 break;
             case 'Günün Otomobilleri':
                 window.location.href = 'https://www.ikinciyeni.com/ihaledeki-ikinci-el-arabalar-ve-fiyatlari';
                 break;
         }
     }, 500);
 });

 sQuery('#link-button-7406741596772').on('click', function () {
     setTimeout(function () {
         var selectedValue = sQuery('[name="ins-option-page-7406741596772"]:checked').val();
         Insider.dom('#editable-button-3821861407576').attr('style', 'display:none'); //burasi
         Insider.dom('#editable-button-1619051132990').attr('style', 'display:none');
         switch (selectedValue) {

             case ' Otomobilimi Değerlemek İstiyorum':
                 window.location.href = 'https://www.ikinciyeni.com/fiyatlandirici';
                 break;
         }
     })

 });
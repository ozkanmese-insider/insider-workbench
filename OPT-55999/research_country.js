var flag = jQuery('#sdk_switcher').attr('class').split(' ')[3].toUpperCase();

var array = jQuery('#country  option').each(function () {
    jQuery(this).val();
});

for (var i = 0; i < array.length; i++) {
    if (array[i].value === flag) {
        jQuery('#country  option[value=' + flag + ']').attr('selected', 'selected');
    }
}

parseInt(Insider.dom('.bl-parameter-listing li:eq(1) span:last').text().trim()) || 0;
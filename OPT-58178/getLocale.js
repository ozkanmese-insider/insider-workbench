/* OPT-58178  START */
if (Insider.fns.hasParameter('.au')) {
    return 'en_AU';
} else if (Insider.fns.hasParameter('.nz')) {
    return 'en_NZ';
}
/* OPT-58178  END */

return spApi.getLang(); // default value should be language
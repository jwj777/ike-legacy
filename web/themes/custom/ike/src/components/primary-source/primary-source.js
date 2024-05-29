(function($) {
  'use strict';
  $('.field--name-field-psl-citations').unbind('click').click(function() {
    $(this).find('.field__item').toggle();
  });

  if($('.field--name-field-psl-file').length) {
    $('.field--name-field-psl-file a:not([href$="mp3"]')
      .addClass('tooltip top download')
      .attr('download', '');

    if (location.protocol === 'https:') {
      var oldUrl = $('.field--name-field-psl-file a').attr('href');
      var newUrl = oldUrl.replace('http://', 'https://');
      $('.field--name-field-psl-file a').attr('href', newUrl);
    }

    $('.field--name-field-psl-file a[href$="mp3"]').addClass('tooltip top play');
  }

    //if this is an image, video or 3d media PSL, we dont want to show the image 2x times, so hide the huge hero one

  if($('.block-field-blocknodeprimary-sourcefield-3d-media').length) {
    $('.block-field-blocknodeprimary-sourcefield-psl-image').hide();
  }

  if($('.block-field-blocknodeprimary-sourcefield-video-media').length) {
    $('.block-field-blocknodeprimary-sourcefield-psl-image').hide();
  }

  if($('div.block.block-layout-builder.block-field-blocknodeprimary-sourcefield-psl-type  .field--name-field-psl-type.field--type-entity-reference .field__item').html() == 'image') {
    $('.layout--onecol .block-field-blocknodeprimary-sourcefield-psl-image .field--name-field-psl-image.field--type-image.field__item').hide();
  }

})(jQuery);

!((document, Drupal, $) => {
  'use strict';

  // For storing Degree Search information.
  Drupal.IkesSoldierSnapshot = {};

  // The stored element in the DOM we will clone.
  Drupal.IkesSoldierSnapshot.$snapshotWrapper = null;

  /* jshint ignore:start */
  /**
   * This function takes in the index of the grid item and
   * then creates the snapshot element after that index.
   *
   * @param {int} index
   *   The index where to place the snapshot after.
   *
   * @param $soldierSnapshot
   *
   * @returns {void}
   */
  /* jshint ignore:end */
  Drupal.IkesSoldierSnapshot.createSnapshot =
    function(index, $soldierSnapshot, $visibleSoldiers = $()) {
      // Grabbing values.
      const $firstName = $soldierSnapshot
        .find('.ikes-soldiers-detail--first-name').html();
      let $middleName = $soldierSnapshot
        .find('.ikes-soldiers-detail--middle-name').html();
      if (typeof $middleName === 'undefined') {
        $middleName = '';
      }
      const $lastName = $soldierSnapshot
        .find('.ikes-soldiers-detail--last-name').html();
      const $suffix = $soldierSnapshot
        .find('.ikes-soldiers-detail--suffix').html();
      const $branchOfService = $soldierSnapshot
        .find('.ikes-soldiers-detail--branch').clone();
      const $dateOfBirth = $soldierSnapshot
        .find('.ikes-soldiers-detail--date-of-birth').clone();
      const $dateOfDeath = $soldierSnapshot
        .find('.ikes-soldiers-detail--date-of-death').clone();
      const $birthplace = $soldierSnapshot
        .find('.ikes-soldiers-detail--birthplace').clone();
      const $highestRank = $soldierSnapshot
        .find('.ikes-soldiers-detail--rank').clone();
      const $unit = $soldierSnapshot
        .find('.ikes-soldiers-detail--unit').clone();
      const $theaterOfOperations = $soldierSnapshot
        .find('.ikes-soldiers-detail--theater').clone();
      const $enlistedDate = $soldierSnapshot
        .find('.ikes-soldiers-detail--enlisted-date').clone();
      const $enlistedApprox = $soldierSnapshot
        .find('.ikes-soldiers-detail--enlisted-approx').clone();
      const $dischargeDate = $soldierSnapshot
        .find('.ikes-soldiers-detail--discharge-date').clone();
      const $dischargeApprox = $soldierSnapshot
        .find('.ikes-soldiers-detail--discharge-approx').clone();
      const $battle = $soldierSnapshot
        .find('.ikes-soldiers-detail--battle').clone();
      const $militaryHonors = $soldierSnapshot
        .find('.ikes-soldiers-detail--honors').clone();
      const $honoredBy = $soldierSnapshot
        .find('.ikes-soldiers-detail--honored-by').clone();
      const $biographicalInfo = $soldierSnapshot
        .find('.ikes-soldiers-detail--bio-wrap').clone();
      const $pow = $soldierSnapshot
        .find('.ikes-soldiers-detail--pow').clone();
      const $kia = $soldierSnapshot
        .find('.ikes-soldiers-detail--kia').clone();
      const $otherDocs = $soldierSnapshot
        .find('.ikes-soldiers-detail--docs-wrap').clone();
      const $video = $soldierSnapshot
        .find('.ikes-soldiers-detail--video-wrap').clone();
      const insertAfter = $visibleSoldiers.get(index);


      // Let's create the snapshot element using our "template".
      // Move buttons back out of snapshot before removing it
      let $buttonset = $($soldierSnapshot).closest('.ikes-soldiers-container')
        .find('#ikes-soldiers-snapshot-item')
        .find('.ikes-soldiers-detail--buttons');
      $($buttonset).appendTo($soldierSnapshot).css('display', 'none');
      $('.ikes-soldiers-snapshot--active').remove();

      if (!$($soldierSnapshot).hasClass('open')) {
        $('.views-row').removeClass('open');

        const $snapshot = Drupal.IkesSoldierSnapshot.$snapshotWrapper
          .clone()
          .removeClass('visually-hidden')
          .addClass('views-field-rendered-entity')
          .addClass('ikes-soldiers-snapshot-item')
          .addClass('ikes-soldiers-snapshot--active')
          .wrap('<div class="flex-1-1 views-row"></div>');

        // Inject values into snapshot HTML.
        $snapshot.find('.ikes-soldiers-detail--first-name').html($firstName);
        $snapshot.find('.ikes-soldiers-detail--middle-name').html($middleName);
        $snapshot.find('.ikes-soldiers-detail--last-name').html($lastName);
        $snapshot.find('.ikes-soldiers-detail--suffix').html($suffix);
        $snapshot.find('.ikes-soldiers-detail--branch')
          .html($branchOfService);
        $snapshot.find('.ikes-soldiers-detail--date-of-birth')
          .html($dateOfBirth);
        $snapshot.find('.ikes-soldiers-detail--date-of-death')
          .html($dateOfDeath);
        $snapshot.find('.ikes-soldiers-detail--birthplace')
          .html($birthplace);
        $snapshot.find('.ikes-soldiers-detail--rank')
          .html($highestRank);
        $snapshot.find('.ikes-soldiers-detail--unit')
          .html($unit);
        $snapshot.find('.ikes-soldiers-detail--theater')
          .html($theaterOfOperations);
        $snapshot.find('.ikes-soldiers-detail--enlisted-date')
          .html($enlistedDate);
        $snapshot.find('.ikes-soldiers-detail--enlisted-approx')
          .html($enlistedApprox);
        $snapshot.find('.ikes-soldiers-detail--discharge-date')
          .html($dischargeDate);
        $snapshot.find('.ikes-soldiers-detail--discharge-approx')
          .html($dischargeApprox);
        $snapshot.find('.ikes-soldiers-detail--battle')
          .html($battle);
        $snapshot.find('.ikes-soldiers-detail--honors')
          .html($militaryHonors);
        $snapshot.find('.ikes-soldiers-detail--honored-by')
          .html($honoredBy);
        $snapshot.find('.ikes-soldiers-detail--bio-wrap')
          .html($biographicalInfo);
        $snapshot.find('.ikes-soldiers-detail--pow')
          .html($pow);
        $snapshot.find('.ikes-soldiers-detail--kia')
          .html($kia);
        $snapshot.find('.ikes-soldiers-detail--docs-wrap')
          .html($otherDocs);
        $snapshot.find('.ikes-soldiers-detail--video-wrap')
          .html($video);

        // If there is an element there, let's create it right after.
        if (typeof insertAfter !== 'undefined') {
          $(insertAfter).after($snapshot);
        }
        else {
          const $after = $visibleSoldiers.last();
          $after.after($snapshot);
        }

        $($soldierSnapshot).addClass('open');
      }
      else {
        $($soldierSnapshot).removeClass('open');
        $('.views-row').removeClass('open');
      }
    };

  /**
   * Takes an element and then fills out a cloned snapshot item.
   *
   * @param {MouseEvent} event
   *   The mouse event that triggered this function.
   *
   * @returns {void}
   */
  Drupal.IkesSoldierSnapshot.previewSoldier = function(event) {
    event.preventDefault();
    const $soldierSnapshot = $(event.target).parents('.views-row');
    const index = $soldierSnapshot.data('index');
    let arrayIndex = 0;
    const $soldiers =
      $(event.target)
        .parents('.ikes-soldiers__container__rows__inner')
        .find('.views-row:visible');
    if ($soldiers.length > 0) {
      $soldiers.each(function(arrIndex) {
        let currIndex = $(this).data('index');
        if (currIndex === index) {
          arrayIndex = arrIndex;
        }
      });
    }

    const width = $(window).width();
    let columns = 4;

    if (width >= 576 && width < 768) {
      // Mobile. We at 3.
      columns = 3;
    }
    else if (width < 576) {
      columns = 1;
    }

    const currentCountingIndex = arrayIndex + 1;
    const modulo = currentCountingIndex % columns;

    // The index where to inject.
    let next;
    if (modulo !== 0) {
      // Divisible by 4, let's inject at the nearest 4.
      next = Math.ceil(currentCountingIndex / columns) * columns;
    }
    else {
      next = currentCountingIndex;
    }

    // Create the snapshot element.
    Drupal.IkesSoldierSnapshot
      .createSnapshot(next - 1, $soldierSnapshot, $soldiers, event);

    document.querySelector('.open').scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    // move the buttons on desktop
    if (width > 768) {
      let $buttonset = $(this).next('.ikes-soldiers-detail--buttons');
      let $placement = $($soldierSnapshot).closest('.ikes-soldiers-container')
        .find('.ikes-soldiers-snapshot--active');
      $($buttonset).appendTo($placement).css('display', 'flex');
    }

    // Close snapshot w/buttons
    $('.close-snapshot').unbind('click').click(function() {
      document.querySelector('.open').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Move buttons back out of snapshot before removing it
      let $buttonset = $(this).closest('.ikes-soldiers-detail--wrapper')
        .next('.ikes-soldiers-detail--buttons');
      $($buttonset).appendTo($soldierSnapshot).css('display', 'none');
      $('.ikes-soldiers-snapshot--active').remove();
      $($soldierSnapshot).removeClass('open');
    });
  };

  /**
   * For Ike's Soldiers we want to have the "snapshot" button
   * drop an expanded view of the Soldier details inline in the view. So we
   * have an empty "snapshot" element printed at the bottom of the view
   * that we will clone and then fill out.
   *
   * Since the grid view displays a variable # of items in a row we will
   * need to check the screen size to figure out where to place the snapshot.
   *
   * The trick will be utilizing flex with wrapping; we can just make the
   * element flex-basis: 100% to make it fill an entire "row".
   *
   * @type {{attach: Drupal.behaviors.efIkesSoldierSnapshot.attach}}
   */
  Drupal.behaviors.efIkesSoldierSnapshot = {
    attach: function (context) {
      // Let's grab the "snapshot" chunk and store ahead of time.
      if (Drupal.IkesSoldierSnapshot.$snapshotWrapper === null) {
        Drupal.IkesSoldierSnapshot.$snapshotWrapper =
          $(document.getElementById('ikes-soldiers-snapshot-item'));
      }
      const $row = $('.ikes-soldier-teaser--wrapper', context);
      $row.once('ikes-soldier-teaser--wrapper').each((index, element) => {
        $(element).on('click', Drupal.IkesSoldierSnapshot.previewSoldier);
      });
    }
  };



})(document, Drupal, jQuery);

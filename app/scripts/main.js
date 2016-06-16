let initPluginsOn = ($container) => {
  (() => {

    $container.find('[data-provide=simplemde]').each((index, element)=> {
      let editor = new SimpleMDE({
        element: element
      });
    });

  })();

  (()=> {

    let defaults = {
      icons: {
        time: 'fa fa-clock-o',
        date: 'fa fa-calendar',
        up: 'fa fa-arrow-up',
        down: 'fa fa-arrow-down',
        previous: 'fa fa-chevron-left',
        next: 'fa fa-chevron-right',
        today: 'fa fa-crosshairs',
        clear: 'fa fa-trash',
        close: 'fa fa-remove'
      },
      sideBySide: true
    };

    $container.find('[data-provide=datepicker]').each((index, element) => {
      let $this = $(element);

      $this.datetimepicker(_.extend(defaults, _.omit($this.data(), 'provide')));
    });


    $container.find('[data-provide=date-range]').each((index, element)=> {

      let $this = $(element);

      $this.datetimepicker(_.extend(defaults, _.omit($this.data(), ['provide', 'counterpart', 'range'])));

      $this.on('dp.change', (event)=> {

        let counterpart = $($this.data('counterpart'));

        switch ($this.data('range')) {
          case 'start':
            counterpart.data('DateTimePicker').minDate(event.date);
            break;
          case 'end':
            counterpart.data('DateTimePicker').maxDate(event.date);
            break;
          default:
            console.error('invalid date range option');
            break;
        }

      });

    });

  })();

  (() => {

    $container.find('[maxlength]').each((index, element) => {

      let $this = $(element);

      $this.maxlength();

    });

  })();

  (()=> {

    $container.find('select[data-provide=select]').each((index, element) => {

      let $this = $(element);

      $this.select2({
        theme: 'bootstrap'
      });

    });

    $container.find('select[data-provide=tags]').each((index, element) => {

      let $this = $(element);

      $this.select2({
        theme: 'bootstrap',
        tags: true
      });

    });

  })();

  /* Model index deleter */

  (()=> {

    let chekForMarkedRows = () => {
      return ($container.find('.deleter:checked').length > 0);
    };

    let $form = $container.find('form#destroyer');
    let $deleteButton = $container.find('button.btn-deleter');
    $deleteButton.prop('disabled', !chekForMarkedRows());

    $container.find('input.deleter').off('click').on('click', (event)=> {
      let $this = $(event.currentTarget);

      if ($this.is(':checked')) {
        $deleteButton.removeClass('disabled').prop('disabled', false);
      } else {

        if (chekForMarkedRows()) {
          $deleteButton.removeAttr('disabled');
        } else {
          $deleteButton.addClass('disabled').prop('disabled', true);
        }

      }

    });

    $deleteButton.off('click').on('click', (event)=> {

      event.preventDefault();

      let disabled = $deleteButton.attr('disabled');

      if (!(typeof disabled !== typeof undefined && disabled !== false)) {

        $deleteButton.button('loading');

        swal({
          title: 'Are you sure?',
          text: 'You will not be able to recover any of the deleted items!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes!',
          cancelButtonText: 'Cancel!',
          closeOnConfirm: false,
          closeOnCancel: true,
          showLoaderOnConfirm: true
        }, function (isConfirm) {

          if (isConfirm) {

            $form.trigger('submit');

          } else {
            $deleteButton.button('reset');
          }

        });

      }

    });

    $form.off('submit').on('submit', (event)=> {
      event.preventDefault();

      $.ajax({
        method: 'post',
        data: $form.serialize(),
        url: $form.attr('action')
      })
        .done((reply)=> {

          $container.find('.deleter:checked').each((index, element)=> {
            $(element).closest('tr').remove();
          });

          if ('result' in reply) {

            if (reply.result) {
              swal('Deleted!', 'Your items have been deleted.', 'success');
              $deleteButton.button('reset');

              setTimeout(()=> {
                $deleteButton.addClass('disabled').prop('disabled', true);
              }, 0);

            } else {

              swal('Fail!', 'Something went wrong...', 'error');

            }

          } else {

            swal('Fail!', 'Something went wrong...', 'error');

          }

        })
        .fail(()=> {
          swal('Fail!', 'Something went wrong...', 'error');
        });

    });

  })();

  /* Gallery */
  (()=> {

    $container.find('[data-provide=gallery]').each((index, element)=> {

      let $button = $(element);

      $button.on('click', (event)=> {

        event.preventDefault();

        let $targetGallery = $('body').find($button.data('target'));

        $targetGallery.magnificPopup({
          delegate: 'a',
          type: 'image',
          tLoading: 'Loading image #%curr%...',
          mainClass: 'mfp-with-zoom mfp-img-mobile',
          gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
          },
          image: {
            verticalFit: true
          }
        });

        $targetGallery.find('a').first().trigger('click');

      });

    });

  })();

  (()=>{

    $container.find('[data-provide=toggle]').each((index, element) => {
      let $this = $(element);

      $this.bootstrapToggle();
    })

  })();

  (()=>{

    $container.find('button[data-inprogress-text]').each((index,element)=>{
      let $element = $(element);

      $element.off('click').on('click',(event)=>{

        event.preventDefault();

        $element.button('inprogress');
        $element.addClass('disabled');

        $element.off('click').trigger('click').prop('disabled', true);

      });

    })

  })();
};


(function ($) {
  'use strict';
  let $body    = $('html, body'), // Define jQuery collection
    $content  = $('.scene');

  $content.smoothState({
    anchors: 'a',
    debug: true,
    prefetch: true,
    onBefore: ($anchor, $container) => {

      $container.find('.sceneElement').each((index,element)=>{

        let $element = $(element);

        switch ($element.data('transition')) {
          default:
          case 'fade':
                break;
          case 'moveleft':
            $element.attr('data-transition','moveright');
                break;
          case 'moveright':
            $element.attr('data-transition','moveleft');
                break;
        }

      });
    },
    onStart : {
      duration: 250,
      render: () => {
        $content.addClass('is-exiting');
        // Scroll user to the top
        $body.animate({ 'scrollTop': 0 });

      }
    },
    onReady: {
      duration: 0,
      render: ($container, $newContent) => {

        initPluginsOn($newContent);

        $container.html($newContent);
      }
    },
    prefetchOn: 'aim'
  }).data('smoothState');

  initPluginsOn($body);

})(jQuery);




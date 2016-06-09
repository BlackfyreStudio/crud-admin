(() => {

  $('[data-provide=simplemde]').each((index, element)=> {
    let editor = new SimpleMDE({
      element: element
    });
  });

})();

(()=> {
  $('[data-provide=datepicker]').each((index, element) => {
    let $this = $(element);

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
      }
    };

    $this.datetimepicker(_.extend(defaults, _.omit($this.data(), 'provide')));
  })
})();

(() => {

  $('[maxlength]').each((index, element) => {

    let $this = $(element);

    $this.maxlength();

  });

})();

(()=> {

  $('select[data-provide=select]').each((index, element) => {

    let $this = $(element);

    $this.select2();

  });

})();

/* Model index deleter */

(()=> {

  let chekForMarkedRows = () => {
    return ($('body').find('.deleter:checked').length > 0);
  };

  let $deleteButton = $('.btn-deleter');
  $deleteButton.prop('disabled', true);

  $('.deleter').off('click').on('click', (event)=> {
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

  $deleteButton.off('click').on('click', ()=> {

    let disabled = $deleteButton.attr('disabled');

    if (!(typeof disabled !== typeof undefined && disabled !== false)) {

      $deleteButton.button('loading');

      swal({
        title: 'Are you sure?',
        text: 'You will not be able to recover this imaginary file!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel plx!',
        closeOnConfirm: false,
        closeOnCancel: true
      }, function (isConfirm) {
        if (isConfirm) {
          $('.deleter:checked').each((index, element)=> {
            $(element).closest('tr').remove();
          });

          swal('Deleted!', 'Your imaginary file has been deleted.', 'success');
          $deleteButton.button('reset');

          setTimeout(()=> {
            $deleteButton.addClass('disabled').prop('disabled', true);
          }, 0);
        } else {
          $deleteButton.button('reset');
        }
      });

    }

  });

})();



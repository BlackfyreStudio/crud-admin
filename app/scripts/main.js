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

  let $deleteButton = $('.btn-deleter');
  $deleteButton.attr('disabled', true);

  $('.deleter').off('click').on('click', (event)=> {
    let $this = $(event.currentTarget);

    if ($this.is(':checked')) {
      $deleteButton.removeAttr('disabled');
    } else {

      if ($('.deleter:checked').length > 0) {
        $deleteButton.removeAttr('disabled');
      } else {
        $deleteButton.attr('disabled', true);
      }

    }

  });

  $deleteButton.off('click').on('click', ()=> {

    if (!$deleteButton.hasAttribute('disabled')) {

      swal({
        title: "Are you sure?",
        text: "You will not be able to recover this imaginary file!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
      }, function () {
        swal("Deleted!", "Your imaginary file has been deleted.", "success");
      });

    }

  });

})();



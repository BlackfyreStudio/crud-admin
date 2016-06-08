(() => {

  $('[data-provide=simplemde]').each((index, element)=>{
    let editor = new SimpleMDE({
      element: element
    });
  });

})();

(()=>{
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

    $this.datetimepicker(_.extend(defaults,_.omit($this.data(),'provide')));
  })
})();

(() => {

  $('[maxlength]').each((index, element) => {

    let $this = $(element);

    $this.maxlength();

  });

})();

(()=>{

  $('select[data-provide=select]').each((index, element) => {

    let $this = $(element);

    $this.select2();

  });

})();



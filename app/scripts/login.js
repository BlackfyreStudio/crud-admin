(() =>{

  let re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  let $image = $('.profile-img');
  let $input = $('#email');
  let original = $image.attr('src');

  $input.on('keyup',(event)=>{

    let val = $input.val();

    if (re.test(val)) {
      $image.attr('src',`https://www.gravatar.com/avatar/${md5(val)}?s=96`);
    } else {
      $image.attr('src',original);
    }

  });

})();

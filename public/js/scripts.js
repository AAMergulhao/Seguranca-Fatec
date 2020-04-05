$(document).ready(()=>{
    $(".preloader-background")
                    .delay(1700)
                    .fadeOut("slow");
    $(".preloader-wrapper")
                    .delay(1700)
                    .fadeOut();
    $('.dropdown-trigger')
    .dropdown(
        {
        alignment: 'left',
        hover: false,
        belowOrigin: true
        }
    );
    $('.tabs').tabs(
        {
        swipeable : true,
        responsiveThreshold : 1920
        }
    );
    $('.chips').chips();
    $('.chips-initial').chips({
        data: [{
          tag: 'Apple',
        }, {
          tag: 'Microsoft',
        }, {
          tag: 'Google',
        }],
      });
})

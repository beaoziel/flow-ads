$(window).scroll(function() { 
    var scroll = $(window).scrollTop();
 
    if (scroll > 70) {
        $('.menu').addClass('menu-auxiliar');
    } else {
        $('.menu').removeClass('menu-auxiliar');
    }
});

var lastScrollTop = 0;
$(window).scroll(function (event) {
    var currentScrollTop = $(this).scrollTop();
    if ($(window).width() <= 767) {
        if (currentScrollTop > lastScrollTop) {
            event.preventDefault();
            $('header').hide(1000);
        } else {
            event.preventDefault();
            $('header').show(1000);
        }
        lastScrollTop = currentScrollTop;
    } else {
        if (currentScrollTop > lastScrollTop) {
            $('.main-menu-container').addClass('shrinked');
        } else {
            $('.main-menu-container').removeClass('shrinked');
        }
        lastScrollTop = currentScrollTop;
    }
});

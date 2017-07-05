var menuList = $(".menu-list"),
    menuHeight = menuList.outerHeight();

$('.logo a, .menu-list a').click(function () {
    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top - menuHeight;
    $('html, body').stop().animate({
        scrollTop: offsetTop
    }, 500);

});

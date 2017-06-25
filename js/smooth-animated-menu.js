var menuList = $(".menu-list"),
    menuHeight = menuList.outerHeight(),
    menuItems = menuList.find("a");

menuItems.click(function () {
    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top - menuHeight;
    $('html, body').stop().animate({
        scrollTop: offsetTop
    }, 500);

});

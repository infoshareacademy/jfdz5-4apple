var lastIdInMenuItems,
    menuList = $(".menu-list"),
    menuHeight = menuList.outerHeight() + 63,
    // All list items
    menuItems = menuList.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function () {
        var item = $($(this).attr("href"));
        if (item.length) {
            return item;
        }
    });


$(window).scroll(function () {
    // Get container scroll position
    var fromTopMenu = $(this).scrollTop() + menuHeight;

    // Get id of current scroll item
    var cur = scrollItems.map(function () {
        if ($(this).offset().top < fromTopMenu)
            return this;
    });
    // Get the id of the current element
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";

    //set active class if you are on bottom page
    if ($(window).scrollTop() + $(window).height() >= $(document).height() - $('footer').height()) {
        $('li.active').removeClass('active');
        $('.last-active-item').addClass('active');
    }
    else {
        lastIdInMenuItems = id;
        // Set/remove active class
        menuItems
            .parent().removeClass("active")
            .end().filter("[href='#" + id + "']").parent().addClass("active");
    }

});

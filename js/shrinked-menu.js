var lastScrollTop = 0;
$(window).scroll(function (event) {
    var currentScrollTop = $(this).scrollTop();
    var $mainMenu = $('.main-menu-container')
    if ($(window).width() <= 767) {
      if (currentScrollTop > lastScrollTop) {
        event.preventDefault();
        $('header').hide(1000);
      } else {
        event.preventDefault();
        $('header').show();
      }
      lastScrollTop = currentScrollTop;
    } else {
      if (currentScrollTop > lastScrollTop) {
        $mainMenu.addClass('shrinked');
      } else {
        $mainMenu.removeClass('shrinked');
      }
      lastScrollTop = currentScrollTop;

    }

    if ($(window).width() >= 992) {
      if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
        $mainMenu.addClass('shrinked');
      }
    }
    else if ($(window).width() < 992 && $(window).width() >= 768) {
      $mainMenu.addClass('shrinked');
    }
  }
);

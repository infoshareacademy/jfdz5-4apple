(function () {

    $('.game-menu--item:nth-child(1)').click(function () {
        $('.game-menu').animate({height: 'toggle'});
        setTimeout(function () {
            $('.game').show();
        }, 500);
    });

}());
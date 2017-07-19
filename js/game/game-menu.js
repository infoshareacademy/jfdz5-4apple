(function () {
    var $truck = $('.truck');

    $('.game-menu--item:nth-child(1)').click(function () {
        $('.game-menu').animate({height: 'toggle'});
        setTimeout(function () {
            clearInterval(trackMovement);
            $truck.hide();
            $('.game').show();
            startGame();
        }, 500);
    });
    var trackMovement = setInterval(function () {
        $truck.animate({
            bottom: 53 + 'px'
        }, "slow");
        $truck.animate({
            bottom: 50 + 'px'
        }, "slow")
    },100)


}());
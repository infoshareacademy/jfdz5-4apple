(function () {

    $('.game-menu--item:nth-child(1)').click(function () {
        $('.game-menu').animate({height: 'toggle'});
        setTimeout(function () {
            clearInterval(trackMovement);
            $('.game').show();
            startGame();
        }, 500);
    });
    var trackMovement = setInterval(function () {
       var $truck = $('.truck');
        $truck.animate({
            bottom: 53 + 'px'
        }, "slow");
        $truck.animate({
            bottom: 50 + 'px'
        }, "slow")
    },100)


}());
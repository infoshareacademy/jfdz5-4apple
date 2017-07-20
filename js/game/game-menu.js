(function () {

    truckMovement = setInterval(function () {
        $('.truck').animate({
            bottom: 53 + 'px'
        }, "slow").animate({
            bottom: 50 + 'px'
        }, "slow");
    }, 100);

    $('#play').click(function () {
        $('.game-menu').animate({height: 'toggle'});
        setTimeout(function () {
            clearInterval(truckMovement);
            $('.truck').remove();
            $('.game').show();
            startGame();
        }, 500);
    });
    $('#quit').click(function () {
        $('.game-container').fadeOut(1000)
    })

}());


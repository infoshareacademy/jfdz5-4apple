(function () {

    $('#play').click(function () {
        $('.game-menu').animate({height: 'toggle'});
        setTimeout(function () {
            $('.game').show();
            startGame();
        }, 500);
    });
    $('#skins').click(skinChoice);
    $('#high-score').click(openHighScore);
    $('#quit').click(function () {
        $('.game-container').fadeOut(1000)
    })
}());


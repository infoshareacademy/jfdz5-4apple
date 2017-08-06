(function () {
    $(".arrow-left").remove();
    $(".arrow-right").remove();
    $('#play').click(function () {
        $('.game-menu').animate({height: 'toggle'}, 500);
        $('.truck').addClass('truck-move');
        setTimeout(function () {
            $('.game-menu--container').hide();
            $('.character').show();
            $('.lifes').show();
            $('.points').show();
            startGame();
        }, 1000);
    });
    $('#skins').click(skinChoiceDraw);
    $('#high-score').click(openHighScore);
    $('#tutorial').click(function () {
        $('.game-menu').animate({height: 'toggle'}, 500);
        $('.truck').addClass('truck-move');
        setTimeout(function () {
            $('.game-menu--container').hide();
            $('.character').show();
            $('.lifes').show();
            $('.points').show();
            openTutorial();
        }, 1000);
    });
    $('#quit').click(function () {
        $('.game-container').fadeOut(1000)
    })
}());

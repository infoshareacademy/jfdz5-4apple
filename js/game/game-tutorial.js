function openTutorial() {


    startGame(true);

    $('.board-game').append($("<div>").text("Move character left and right by pressing arrows").addClass("tutorial-example"));

    $('.character').css({background: "url('img/ludzik-z-workiem-prawo.png')"}).animate({left: 270}, 1000).animate({left: 285}, 1000).animate({left: 300}, 1000);
    $('.board-game').append($("<div>").addClass("arrow-right").fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500).fadeOut(500));
    setTimeout(function () {
        $('.character').css({background: "url('img/ludzik-z-workiem-lewo.png')"}).animate({left: 285}, 1000).animate({left: 270}, 1000).animate({left: 255}, 1000);
        $('.board-game').append($("<div>").addClass("arrow-left").fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500).fadeOut(500));
    }, 3000);

    setTimeout(function () {
        $('.tutorial-example').text("Try to co-ordinate character with packages to catch them. It will reward you with extra points");
        $('.board-game').append($('<div>').addClass('cardboard-box box-tutorial').css({
            left: 280
        }).animate({
            top: 480
        }, 6000));
        setTimeout(function () {
            $('.points').text('SCORE: 100').fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
            $('.box-tutorial').removeClass('cardboard-box').removeClass('box-tutorial').addClass('bonus-points').text('100');
            setTimeout(function () {
                $('.bonus-points').remove();
            }, 600)
        }, 6000);
    }, 8000);

    setTimeout(function () {
        $('.tutorial-example').text("If you catch a bomb it will explode and make you loose one life. You also loose life when you don't catch box");
        $('.board-game').append($('<div>').addClass('bomb bomb-tutorial').css({
            left: 280
        }).animate({
            top: 480
        }, 6000));
        setTimeout(function () {

            $('.life-item').last().fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200);
            $('.bomb-tutorial').removeClass('bomb').removeClass('bomb-tutorial').addClass('bomb-exploded').css({transform: 'translateY(-15px)'}).fadeOut().fadeIn();
            setTimeout(function () {
                $('.bomb-exploded').remove();
            }, 600)
        }, 6000);

    }, 16000);


    setTimeout(function () {
        $('.tutorial-example').css({top: 50}).text('Purpose of the game is to get as many points you can. There are rounds, which lasts 25 sec each. Every consecutive round is harder. Game ends when you got no lives left');

    }, 25000);
    setTimeout(function () {
        $('.tutorial-example').css({top: 150}).text('Now try to play yourself. Press PLAY button in menu. GOOD LUCK!');

    }, 34000);

    setTimeout(function () {
        $('.tutorial-example').remove();
        $('.arrow-left').remove();
        $('.arrow-right').remove();
        $('.life-item').remove();
        menuDisplay();
    }, 39000)

}



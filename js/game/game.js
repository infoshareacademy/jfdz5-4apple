var position = 0;
var height = 0;

$(window).keydown(function (e) {
    $character = $('.character');
    if (e.keyCode === 37) {
        if (position > -255)
            position -= 15;

        $character.css({
            'transform': 'translateX(' + position + 'px)',
            'background': 'url("img/ludzik-z-workiem-lewo.png")',
            'background-size': 'cover'
        });
    }
    else if (e.keyCode === 39) {
        if (position < 255)
            position += 15;

        $character.css({
            'transform': 'translateX(' + position + 'px)',
            'background': 'url("img/ludzik-z-workiem-prawo.png")',
            'background-size': 'cover'
        });
    }

});

var cardboardBoxFall = setInterval(function () {
    height += 10;
    $('.cardboard-box').css({
        'transform': 'translateY(' + height + 'px)'
    });
    if (height >= 480) {
        clearInterval(cardboardBoxFall);
    }
}, 100);

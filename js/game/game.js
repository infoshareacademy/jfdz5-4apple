var position = 0;
var height = 0;

$(window).keydown(function (e) {
    $character = $('.character');
    if (position <= (-255)) {
        position += 15;
        $character.css({'transform': 'translateX(' + position + 'px)'});
    }
    else if (position >= 255) {
        position -= 15;
        $character.css({'transform': 'translateX(' + position + 'px)'});
    }
    else if (e.keyCode === 37) {
        position -= 15;
        $character.css({
            'transform': 'translateX(' + position + 'px)',
            'background': 'url("img/ludzik-z-workiem-lewo.png")',
            'background-size': 'cover'
        });
    }
    else if (e.keyCode === 39) {
        position += 15;
        $character.css({
            'transform': 'translateX(' + position + 'px)',
            'background': 'url("img/ludzik-z-workiem.png")',
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

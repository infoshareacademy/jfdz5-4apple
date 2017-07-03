var position = 0;
var height = 0;
var planePosition = 0;

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
var czas = new Date();
console.log(czas);
var roundTime = function () {
    planePosition -= 10;
    if (planePosition <= -525) {
        clearInterval(gameTiming);
        clearInterval(cardboardBoxFall);
        czas = new Date();
        console.log(czas);
    }
    else {
        $('.plane').css({
            'transform': 'translateX(' + planePosition + 'px)'
        });
    }
};
var gameTiming = setInterval(function () {
    roundTime()
}, 112);

var cardboardBoxFall = setInterval(function () {
    var $cardboardBox = $('.cardboard-box');
    height += 15;
    $cardboardBox.css({
        'transform': 'translateY(' + height + 'px)'
    });
    if (height >= 480) {
        $cardboardBox.hide();
    }
}, 100);

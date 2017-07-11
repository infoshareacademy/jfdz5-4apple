var position = 0;
var height = 0;
var planePosition = 0;
var roundTimeInSeconds = 60;
var planesPathLength = $('.board').width() - $('.plane').width();
var intervalTime = parseInt((roundTimeInSeconds / planesPathLength) * 1000);
var $character = $('.character');

$(window).keydown(function (e) {

    if (e.keyCode === 37) {
        if (position > -255)
            position -= 15;
        $character.css({
            'transform': 'translateX(' + position + 'px)'
        }).removeClass('character-right').addClass('character-left');
    }
    else if (e.keyCode === 39) {
        if (position < 255)
            position += 15;
        $character.css({
            'transform': 'translateX(' + position + 'px)'
        }).removeClass('character-left').addClass('character-right');
    }
});

var roundTiming = setInterval(function () {

    if (planePosition > -525) {
        planePosition -= 1;
        $('.plane').css({
            'transform': 'translateX(' + planePosition + 'px)'
        });
    }
    else {
        clearInterval(roundTiming);
        clearInterval(cardboardBoxFall);
    }
}, intervalTime);
var cardboardBoxFall = setInterval(function () {
    var $box = $('.cardboard-box');

    var marioPosition = $character.position().left + $character.width() / 2;
    var boxPosition = box.position().left + box.width() / 2;
    height += 10;
    $box.css({
        'transform': 'translateY(' + height + 'px)'
    });

    if(height >= 480 && height <=540  && Math.abs( boxPosition - marioPosition) < 35){
        $box.hide();
        clearInterval(cardboardBoxFall);
    }
    else if (height >=560 ){
        clearInterval(cardboardBoxFall);
    }
}, 100);


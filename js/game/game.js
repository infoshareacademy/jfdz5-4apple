var position = 0;
var height = 0;
var planePosition = 0;
var roundTimeInSeconds = 10;
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
        clearInterval(fallingObjects);
        clearInterval(cardboardBoxFall);
    }

}, intervalTime);

var timeBetweenObjects = 2000;
var cardboardBox = [];


for (var i = 1; i >= 10; i++) {
    cardboardBox[i] = document.createElement('style');
    cardboardBox[i].type = 'text/css';
    cardboardBox[i].innerHTML = '.cssClass { top:0; }';
}
var indexClasses = 1;
var cardboardBoxFall = setInterval(function () {
    var $box = $('.cardboard-box');
    var $boxIteration = $('.cardboardBox[indexClasses]');
    console.log('boxiteration', $boxIteration);
    var marioPosition = $character.position().left + $character.width() / 2;
    var boxPosition = $box.position().left + $box.width() / 2;
    height += 10;
    $box.css({
        'transform': 'translateY(' + height + 'px)'
    });
    if (height >= 480 && height <= 540 && Math.abs(boxPosition - marioPosition) < 35) {
        $box.hide();
    }
    indexClasses = indexClasses + 1;
}, 500);

var index = 1;
var fallingObjects = setInterval(function () {

    var objectRandVerticalPosition = parseInt(Math.random() * 550);
    $('.board').prepend($('<div>').addClass(' cardboardBox' + index + ' cardboard-box').css({
        'left': objectRandVerticalPosition,
        'top': 0
    }));
    index = index + 1;

}, timeBetweenObjects);


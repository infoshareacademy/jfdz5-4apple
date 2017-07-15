var position = 0;
var height1 = 0;
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

// var timeBetweenObjects = 2000;

var indexClasses = 1;

var fallingObjects = setInterval(function () {

    var objectRandVerticalPosition = parseInt(Math.random() * 550);
    $('.board').prepend($('<div>').addClass(' cardboardBox' + indexClasses + ' cardboard-box').css({
        'left': objectRandVerticalPosition,
        'top': 0
    }));
    indexClasses += 1;

}, 1000);

var cardboardBox = [];
console.log('tabluca', cardboardBox);
for (var i = 1; i <= 25; i++) {
    cardboardBox[i] = document.createElement('style');
    cardboardBox[i].type = 'text/css';
    cardboardBox[i].innerHTML = '.cssClass { top:0; }';
}
console.log('tabluca', cardboardBox);

var height = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240];

var cardboardBoxFall = setInterval(function () {


    console.log('lista boxów z klasami', $('.cardboard-box'));
    console.log('sprawdzene', $('div.cardboardBox'+indexClasses+'cardboard-box'));
    var $box = $('div.cardboardBox'+indexClasses+'cardboard-box');
    console.log(indexClasses);
    var marioPosition = $character.position().left + $character.width() / 2;
    var boxPosition = $box.position().left + $box.width() / 2;
    height1 += 10;
    console.log($box[indexClasses]);
    $box.css({
        'transform': 'translateY(' + height1 + 'px)'
    });
    if (height >= 480 && height <= 540 && Math.abs(boxPosition - marioPosition) < 35) {
        $box.hide();
    }
    console.log('lista boxów z klasami', $box);
}, 1000);





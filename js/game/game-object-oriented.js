var $character = $('.character');
var $board = $('.board');
var $cardboardBox = $('.cardboard-box');
var $plane = $('.plane');
var $bomb = $('.bomb');


var board = {
    height: $board.height(),
    width: $board.width(),
    addPoint: function () {
        console.log('Punkt +1');
    },
    subtractLife: function () {

    },
    roundEnd: function () {
        clearInterval(roundOne);
        clearInterval(boxSpawn);
        console.log('Koniec rundy');
    }
};

var character = {
    height: $character.height(),
    width: $character.width(),
    positionX: $character.position().left,
    positionY: $character.position().top,
    moveLeft: function () {
        if (this.positionX > 0) {
            this.positionX -= 15;
            $character.css({
                left: this.positionX
            }).removeClass('character-right').addClass('character-left');
        }
    },
    moveRight: function () {
        if (this.positionX < (board.width - character.width)) {
            this.positionX += 15;
            $character.css({
                left: this.positionX
            }).removeClass('character-left').addClass('character-right');
        }
    }
};
var boxSpawn = setInterval(function () {
    var randomNumber = Math.random() * 3;
    var radnomXPosition = Math.random() * (board.width - bomb.width);

    if (randomNumber <= 1) {
        $board.prepend($('<div>').addClass('bomb').addClass('fallingObject').css({
            left: radnomXPosition
        }))
    }
    else {
        $board.prepend($('<div>').addClass('cardboard-box').addClass('fallingObject').css({
            left: radnomXPosition
        }))
    }
}, 2000);


var cardboardBox = {
    height: $cardboardBox.height(),
    width: $cardboardBox.width(),
    positionX: $cardboardBox.position().left,
    positionY: $cardboardBox.position().top,
    fall: function (fallingSpeed) {
        $('.fallingObject').each(function (index, cardboardBoxNew) {
            $(cardboardBoxNew).css({
                top: $(cardboardBoxNew).position().top + fallingSpeed
            })
        });
    },
    checkCatch: function () {
        var characterCenterXPosition = character.positionX + character.width / 2;
        var boxCenterXPosition = cardboardBox.positionX + cardboardBox.width / 2;
        if (cardboardBox.positionY >= character.positionY && cardboardBox.positionY <= character.positionY + character.height && Math.abs(characterCenterXPosition - boxCenterXPosition) < 35) {
            $cardboardBox.hide();
            board.addPoint();
        }
        else if (cardboardBox.positionY > board.height - cardboardBox.height / 2) {
            board.subtractLife();
            $cardboardBox.css({
                top: board.height - cardboardBox.height / 2
            })
        }
    }
};

var bomb = {
    height: $bomb.height(),
    width: $bomb.width(),
    positionX: $bomb.position().left,
    positionY: $bomb.position().top,
    fall: function (fallingSpeed) {
        $('.fallingObject').each(function (index, bombNew) {
            $(bombNew).css({
                top: $(bombNew).position().top + fallingSpeed
            })
        });
    }
};

var plane = {
    height: $plane.height(),
    width: $plane.width(),
    positionX: $plane.position().left,
    positionY: $plane.position().top,
    fly: function (pixelsDistance) {
        this.positionX -= pixelsDistance;
        if (this.positionX > 0) {
            $('.plane').css({
                left: this.positionX
            });
        }
        else {
            board.roundEnd();
        }
    }
};

$(window).keydown(function (e) {

    if (e.keyCode === 37) {
        character.moveLeft();
    }
    else if (e.keyCode === 39) {
        character.moveRight();
    }
});

var roundOne = setInterval(function () {
    var roundTime = 10;
    var pixelsDistance = ((board.width - plane.width) / roundTime * 0.100);

    cardboardBox.fall(10);
    bomb.fall(10);
    cardboardBox.checkCatch();
    plane.fly(pixelsDistance);
}, 100);

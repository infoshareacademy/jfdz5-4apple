/**
 * Created by Piotrek on 15.07.2017.
 */
var $character = $('.character');
var $board = $('.board');
var $cardboardBox = $('.cardboard-box');
var $plane = $('.plane');


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
    $board.prepend($('<div>').addClass('cardboard-box'));
}, 2000);


var cardboardBox = {
    height: $cardboardBox.height(),
    width: $cardboardBox.width(),
    positionX: $cardboardBox.position().left,
    positionY: $cardboardBox.position().top,
    fall: function (fallingSpeed) {
        this.positionY += fallingSpeed;
        console.log(1);
        $('.cardboard-box').each(function (index,cardboardBoxNew) {
            console.log(cardboardBoxNew);
            console.log($(this).position().top + fallingSpeed);
            $(cardboardBoxNew).css({
                top: $(this).position().top + fallingSpeed
            })
        });

        // console.log($('.cardboard-box'));
        // $('.cardboard-box').map(function (box) {
        //     console.log(box);
        //     console.log($('.cardboard-box')[box]);
        //
        //     ($('.cardboard-box')[box])
        // })

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
    var roundIime = 60;
    var pixelsDistance = ((board.width - plane.width) / roundIime * 0.100);

    cardboardBox.fall(10);
    cardboardBox.checkCatch();
    plane.fly(pixelsDistance);
}, 100);

/**
 * Created by Piotrek on 15.07.2017.
 */
var $character = $('.character');
var $board = $('.board');
var $cardboardBox = $('.cardboard-box');

var board = {
    reference: $board,
    height: $board.height(),
    width: $board.width(),
    addPoint: function () {
        console.log('Punkt +1');
    },
    subtractLife: function () {
        console.log('Utrata życia -1');
    }
};

var character = {
    reference: $character,
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

var cardboardBox = {
    reference: $cardboardBox,
    height: $cardboardBox.height(),
    width: $cardboardBox.width(),
    positionX: $cardboardBox.position().left,
    positionY: $cardboardBox.position().top,
    fall: function () {
        this.positionY += 10;
        $cardboardBox.css({
            top: this.positionY
        })
    },
    checkCatch: function () {
        var characterCenterPosition = character.positionX + character.width / 2;
        var boxCenterPosition = cardboardBox.positionX + cardboardBox.width / 2;
        if (this.positionY >= 480 && this.positionY <= 540 && Math.abs(boxCenterPosition - characterCenterPosition) < 35) {
            $cardboardBox.hide();
            clearInterval(gameplay);
            board.addPoint();
        }
        else if (this.positionY > 560) {
            board.subtractLife();
            clearInterval(gameplay);
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
var gameplay = setInterval(function () {
    cardboardBox.fall();
    cardboardBox.checkCatch();
}, 100);
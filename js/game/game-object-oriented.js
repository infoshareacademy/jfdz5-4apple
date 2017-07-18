var $character = $('.character');
var $board = $('.board');
var $cardboardBox = $('.cardboard-box');
var $plane = $('.plane');
var $bomb = $('.bomb');
var $life = $('.life-item');
var $points = $('.points');
var catchBomb = 0;
var points = 0;


var board = {
    height: $board.height(),
    width: $board.width(),
    addPoint: function () {
        console.log('Punkt +1');
        $('.points').text("Chuju, zdobyłeś "+points);
    },
    subtractLife: function () {
        console.log('health -1');
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
        console.log(character.positionX)
    },
    moveRight: function () {
        if (this.positionX < (board.width - character.width)) {
            this.positionX += 15;
            $character.css({
                left: this.positionX
            }).removeClass('character-left').addClass('character-right');
        }
        console.log(character.positionX);
    }
};
var boxSpawn = setInterval(function () {
    var randomNumber = Math.random() * 3;
    var randomXPosition = Math.random() * (board.width - bomb.width);

    if (randomNumber <= 1) {
        $board.prepend($('<div>').addClass('bomb').addClass('fallingObject').addClass('checkBomb').css({
            left: randomXPosition
        }))
    }
    else {
        $board.prepend($('<div>').addClass('cardboard-box').addClass('fallingObject').addClass("checkCatchObject").css({
            left: randomXPosition
        }));

    }
}, 2000);

var roundOne = setInterval(function () {
    var roundTime = 60;
    var pixelsDistance = ((board.width - plane.width) / roundTime * 0.100);

    cardboardBox.fall(10);
    bomb.fall(10);
    cardboardBox.checkCatch();
    bomb.checkExplosion();
    plane.fly(pixelsDistance);
}, 100);

var cardboardBox = {
    height: $cardboardBox.height(),
    width: $cardboardBox.width(),
    fall: function (fallingSpeed) {
        $('.fallingObject').each(function (index, cardboardBoxNew) {
            $(cardboardBoxNew).css({
                top: $(cardboardBoxNew).position().top + fallingSpeed

            })
        });
    },
    checkCatch: function () {
        $('.checkCatchObject').each(function (index, checkCatchObjectNew) {
            var positionXcardboardBox = $(checkCatchObjectNew).position().left;
            var positionYcardboardBox = $(checkCatchObjectNew).position().top;
            var characterCenterXPosition = character.positionX + character.width / 2;
            var boxCenterXPosition = positionXcardboardBox + cardboardBox.width / 2;
            if (positionYcardboardBox >= character.positionY && positionYcardboardBox <= character.positionY + character.height && Math.abs(characterCenterXPosition - boxCenterXPosition) < 35) {
                $(checkCatchObjectNew).hide();
                board.addPoint();

                points ++;


            }
            else if (positionYcardboardBox > character.positionY + character.height) {
                board.subtractLife()
            }
        })
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
        },
        checkExplosion: function () {
            $('.checkBomb').each(function (index, checkBombNew) {
                var positionXbomb = $(checkBombNew).position().left;
                var positionYbomb = $(checkBombNew).position().top;
                var characterCenterXPosition = character.positionX + character.width / 2;
                var bombCenterXPosition = positionXbomb + bomb.width / 2;
                if (positionYbomb >= character.positionY && positionYbomb <= character.positionY + character.height && Math.abs(characterCenterXPosition - bombCenterXPosition) < 35) {
                    $(checkBombNew).hide();

                    /* Losting chcaracter lifes */
                    $life.first().remove();
                    $life = $('.life-item');
                    console.log('Straciłeś życie!');
                    board.subtractLife();

                    /* Game over! */
                    catchBomb += 1;
                    if (catchBomb === 3) {
                        clearInterval(roundOne);
                        $('.game-over').css({
                            "display": "inline"
                        });
                    }

                }
                else if (positionYbomb === character.positionY + character.height) {
                    clearInterval();
                }

            })
        }
    }

;

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



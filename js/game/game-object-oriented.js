var startGame = function () {

    var $character = $('.character');
    var $board = $('.board');
    var $cardboardBox = $('.cardboard-box');
    var $bomb = $('.bomb');
    var $life = $('.life-item');
    var $countdownTimer = $('.countdownTimer');
    var catchBomb = 0;
    var roundTime = 3;
    var timeInSeconds;
    var ticker;

    if (skinSetup !== 0) {
        $('.character-right').css({
            'background': 'url(img/skins/ludzik-z-workiem-prawo-' + skinSetup + '.png)'
        });
    }
    var board = {
        height: $board.height(),
        width: $board.width(),
        addPoint: function () {
            console.log('Punkt +1');
        },
        subtractLife: function () {
            catchBomb += 1;
            $life.last().fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
            setTimeout(function () {
                $life.last().remove();
                $life = $('.life-item');
            }, 800);
            if (catchBomb === 3) {
                board.gameEnd();
            }
        },
        firstRoundEnd: function () {
            // nextRound = setInterval(nextRound, 100);
            clearInterval(roundOne);
            console.log('Koniec rundy 1');
        },
        // secondRoundEnd: function () {
        //     clearInterval(nextRound);
        //     clearInterval(boxSpawn);
        //     console.log('Koniec rundy 2');
        // },
        gameEnd: function () {
            clearInterval(roundOne);
            clearInterval(nextRound);
            clearInterval(boxSpawn);
            $('.game-over').css({
                "display": "inline-grid"
            });
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
                if (skinSetup !== 0) {
                    $('.character-left').css({
                        'background': 'url(img/skins/ludzik-z-workiem-lewo-' + skinSetup + '.png)'
                    });
                }
            }
        },
        moveRight: function () {
            if (this.positionX < (board.width - character.width)) {
                this.positionX += 15;
                $character.css({
                    left: this.positionX
                }).removeClass('character-left').addClass('character-right');
                if (skinSetup !== 0) {
                    $('.character-right').css({
                        'background': 'url(img/skins/ludzik-z-workiem-prawo-' + skinSetup + '.png)'
                    });
                }
            }
        }
    };
    var boxSpawn = setInterval(function () {
        var randomNumber = Math.random() * 3;
        var randomXPosition = Math.random() * (board.width - bomb.width);

        if (randomNumber <= 1) {
            $board.prepend($('<div>').addClass('bomb').addClass('fallingObject').css({
                left: randomXPosition
            }))
        }
        else {
            $board.prepend($('<div>').addClass('cardboard-box').addClass('fallingObject').addClass("checkCatchObject").css({
                left: randomXPosition
            }));
        }
    }, 2000);


    var countdownTimer = {
        startTimer: function (seconds) {
            timeInSeconds = parseInt(seconds);
            ticker = setInterval(this.tick, 1000);
        },
        tick: function () {
            var seconds = timeInSeconds;
            if (seconds > 0) {
                timeInSeconds--;
            }
            else {
                clearInterval(ticker);
            }
            $countdownTimer.html(timeInSeconds);
            if (timeInSeconds <= 5) {
                $countdownTimer.css({
                    'color': '#F00'
                })
            }
        }
    };
    countdownTimer.startTimer(roundTime);


    var roundOne = setInterval(function () {
        $countdownTimer.html(timeInSeconds);
        cardboardBox.fall(10);
        bomb.fall(10);
        cardboardBox.checkCatch();
        bomb.checkExplosion();
        if (timeInSeconds == 0) {
            board.firstRoundEnd();
        }
    }, 100);

    var nextRound = function nextRound() {
        cardboardBox.fall(15);
        bomb.fall(15);
        cardboardBox.checkCatch();
        bomb.checkExplosion();
    };

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
                var positionXcardboardBox = $(this).position().left;
                var positionYcardboardBox = $(this).position().top;
                var characterCenterXPosition = character.positionX + character.width / 2;
                var boxCenterXPosition = positionXcardboardBox + cardboardBox.width / 2;
                if (positionYcardboardBox >= character.positionY && positionYcardboardBox <= character.positionY + character.height && Math.abs(characterCenterXPosition - boxCenterXPosition) < 35) {
                    $(this).remove();
                    board.addPoint();
                }
                else if (positionYcardboardBox > character.positionY + character.height) {
                    $(this).remove();
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
            $('.fallingObject, .bomb').each(function (index, checkBombNew) {
                var positionXbomb = $(this).position().left;
                var positionYbomb = $(this).position().top;
                var characterCenterXPosition = character.positionX + character.width / 2;
                var bombCenterXPosition = positionXbomb + bomb.width / 2;
                if (positionYbomb >= character.positionY && positionYbomb <= character.positionY + character.height && Math.abs(characterCenterXPosition - bombCenterXPosition) < 35) {
                    $(this).remove();
                    board.subtractLife();
                }
                else if (positionYbomb > character.positionY + character.height) {
                    $(this).remove()
                }
            })
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

    $('.try-again--button').click(function () {
        location.reload();
    })

};

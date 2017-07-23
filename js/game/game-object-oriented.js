var startGame = function () {

    var $character = $('.character');
    var $board = $('.board');
    var $cardboardBox = $('.cardboard-box');
    var $bomb = $('.bomb');
    var $life = $('.life-item');
    var $countdownTimer = $('.countdownTimer');
    var $round = $('.round');
    var catchBomb = 0;
    var roundTime = 30;
    var timeInSeconds;
    var breakTime = 3;
    var ticker;
    var roundIntervalId;
    var boxSpawn;
    var jump = 10;
    var timeToFallingObjects = 1500;

    var points = 0;
    if (skinSetup !== 0) {
        $('.character-right').css({
            'background': 'url(img/skins/ludzik-z-workiem-prawo-' + skinSetup + '.png)'
        });
    }
    var board = {
        height: $board.height(),
        width: $board.width(),
        addPoint: function () {
            $('.points').text("SCORE " + 100 * points);
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

        gameEnd: function () {
            clearInterval(roundIntervalId);
            clearInterval(boxSpawn);
            clearInterval(ticker);
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

    function moveBoxes() {
        boxSpawn = setInterval(function () {
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
        }, timeToFallingObjects);
    }


    var countdownTimer = {
        startTimer: function (seconds) {
            timeInSeconds = parseInt(seconds);
            clearInterval(ticker);
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


    function startRound() {
        countdownTimer.startTimer(roundTime);
        $round.css({
            'display': 'none'
        });
        moveBoxes()

        roundIntervalId = setInterval(function () {
            $countdownTimer.html(timeInSeconds);
            cardboardBox.fall(jump);
            bomb.fall(jump);
            cardboardBox.checkCatch();
            bomb.checkExplosion();
            if (timeInSeconds === 0) {
                clearInterval(roundIntervalId)
                clearInterval(boxSpawn);
                $('.fallingObject').hide(300);
                $round.css({
                    "display": "inline-grid"
                });
                jump += 1;
                timeToFallingObjects -= 100;
                setTimeout(startRound, breakTime * 1000);
            }
        }, 100);
    }


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
                    points++;
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
        explode: function (position) {
            var $bombOnGround = $(this);
            $bombOnGround.css({top: position + 10 + 'px'}).removeClass('fallingObject').addClass('bomb-exploded').fadeOut(300).fadeIn(300);
            setTimeout(function () {
                $bombOnGround.remove();
            }, 600);
        },
        checkExplosion: function () {
            $('.fallingObject, .bomb').each(function (index, checkBombNew) {
                var positionXbomb = $(this).position().left;
                var positionYbomb = $(this).position().top;
                var characterCenterXPosition = character.positionX + character.width / 2;
                var bombCenterXPosition = positionXbomb + bomb.width / 2;
                if (positionYbomb >= character.positionY && positionYbomb <= character.positionY + character.height && Math.abs(characterCenterXPosition - bombCenterXPosition) < 35) {
                    var $bombOnGround = $(this);
                    $bombOnGround.css({top: board.height - character.height - bomb.height + 10 + 'px'}).removeClass('fallingObject').addClass('bomb-exploded').fadeOut(300).fadeIn(300);
                    setTimeout(function () {
                        $bombOnGround.remove();
                    }, 600);
                    board.subtractLife();
                }
                else if (positionYbomb > character.positionY + character.height) {
                    var $bombOnGround = $(this);
                    $bombOnGround.css({top: character.positionY + character.height + 'px'}).addClass('bomb-exploded').fadeOut(300).fadeIn(300);
                    setTimeout(function () {
                        $bombOnGround.remove();
                    }, 600);
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

    startRound()
};

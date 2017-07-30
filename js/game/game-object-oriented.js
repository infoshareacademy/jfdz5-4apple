var startGame = function () {

    var $character = $('.character');
    var $board = $('.board');
    var $cardboardBox = $('.cardboard-box');
    var $bomb = $('.bomb');
    var $life = $('.life-item');
    var $countdownTimer = $('.countdownTimer');
    var $round = $('.round');
    var caughtBomb = 0;
    var roundTime = 25;
    var timeInSeconds;
    var breakTime = 3;
    var ticker;
    var roundIntervalId;
    var boxSpawn;
    var fallingSpeed = 10;
    var timeToFallingObjects = 1500;
    var caughtCardboardBoxInOneRound = 0;
    var bonusPoints = 100;
    var totalScoredGamePoints = 0;
    var totalPointsFormPreviousRounds = 0;
    var whichRound = 2;

    $('.character-right').css({
        'background': 'url(img/skins/ludzik-z-workiem-prawo-' + skinSetup + '.png)'
    });

    var board = {
        height: $board.height(),
        width: $board.width(),
        addPoint: function () {
            totalScoredGamePoints = totalPointsFormPreviousRounds + (caughtCardboardBoxInOneRound * bonusPoints);
            $('.points').text("SCORE: " + totalScoredGamePoints);
        },
        subtractLife: function () {
            caughtBomb += 1;
            $life.last().fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
            setTimeout(function () {
                $life.last().remove();
                $life = $('.life-item');
            }, 800);
            if (caughtBomb === 3) {
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
            sessionStorage.clear('pointsHighScore');
            sessionStorage.setItem('pointsHighScore', totalScoredGamePoints);
            checkScore();
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

            if (timeInSeconds > 0) {
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
        $countdownTimer.css({
            'color': '#000'
        });
        countdownTimer.startTimer(roundTime);
        $round.css({
            'display': 'none'
        });
        moveBoxes();

        roundIntervalId = setInterval(function () {
            $countdownTimer.html(timeInSeconds);
            cardboardBox.fall(fallingSpeed);
            bomb.fall(fallingSpeed);
            cardboardBox.checkCatch();
            bomb.checkExplosion();
            if (timeInSeconds === 0) {
                clearInterval(roundIntervalId);
                clearInterval(boxSpawn);
                $('.fallingObject').hide(300);
                $round.text('ROUND ' + whichRound).css({
                    "display": "inline-grid"
                });
                fallingSpeed += 1;
                timeToFallingObjects -= 50;
                setTimeout(startRound, breakTime * 1000);
                totalPointsFormPreviousRounds = totalScoredGamePoints;
                caughtCardboardBoxInOneRound = 0;
                bonusPoints += 25;
                whichRound++;
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
            $('.checkCatchObject').each(function () {
                var positionXcardboardBox = $(this).position().left;
                var positionYcardboardBox = $(this).position().top;
                var characterCenterXPosition = character.positionX + character.width / 2;
                var boxCenterXPosition = positionXcardboardBox + cardboardBox.width / 2;
                if (positionYcardboardBox >= character.positionY && positionYcardboardBox <= character.positionY + character.height && Math.abs(characterCenterXPosition - boxCenterXPosition) < 35) {

                    caughtCardboardBoxInOneRound++;
                    board.addPoint();
                    $(this).removeClass('fallingObject').removeClass('cardboard-box').addClass('bonus-points').text(bonusPoints);
                    setTimeout(function () {
                        $('.bonus-points').remove()
                    }, 600);

                }
                else if (positionYcardboardBox > character.positionY + character.height) {
                    $(this).removeClass('checkCatchObject').removeClass('cardboard-box').removeClass('fallingObject').addClass('cardboard-box-destroyed');
                    setTimeout(function () {
                        $('.cardboard-box-destroyed').fadeOut();
                    }, 1200);
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
            $('.fallingObject, .bomb').each(function () {
                var positionXbomb = $(this).position().left;
                var positionYbomb = $(this).position().top;
                var characterCenterXPosition = character.positionX + character.width / 2;
                var bombCenterXPosition = positionXbomb + bomb.width / 2;
                var $bombOnGround = $(this);

                if (positionYbomb >= character.positionY && positionYbomb <= character.positionY + character.height && Math.abs(characterCenterXPosition - bombCenterXPosition) < 35) {
                    $bombOnGround.css({top: board.height - character.height - bomb.height + 'px'}).removeClass('fallingObject').addClass('bomb-exploded').fadeOut().fadeIn();
                    setTimeout(function () {
                        $bombOnGround.remove();
                    }, 800);
                    board.subtractLife();
                }
                else if (positionYbomb > character.positionY + character.height) {
                    $bombOnGround.css({top: character.positionY + character.height + 'px'}).addClass('bomb-exploded').fadeOut().fadeIn();
                    setTimeout(function () {
                        $bombOnGround.remove();
                    }, 800);
                }
            })
        }
    };

    // $(window).keydown(function (e) {
    //     if (e.keyCode === 37) {
    //         character.moveLeft();
    //     }
    //     else if (e.keyCode === 39) {
    //         character.moveRight();
    //     }
    // })

    // function controlCharacter() {
    //     $(window).keydown(function (event) {
    //         if (event.keyCode === 37) {
    //             character.moveLeft();
    //         }
    //         else if (event.keyCode === 39) {
    //             character.moveRight();
    //         }
    //         })
    // };

    function controlCharacter() {
        function updateCharacterPosition() {
            var dTime = 0.010;
            if (gasPressed === true) {
                characterSpeed = characterSpeed + acceleration * dTime;
            } else {
                characterSpeed = Math.max(0, characterSpeed + characterSpeed * deceleration * dTime);
            }

            characterDistanceLeft = characterDistanceLeft - characterSpeed * dTime;

            characterDistanceRight = characterDistance + characterSpeed * dTime;
        }

        var characterSpeed = 0;
        var characterDistanceLeft = 0;
        var characterDistanceRight = 0;
        var characterDistance = (board.width - character.width) / 2;
        var gasPressed = false;
        var acceleration = 200;
        var deceleration = -1;
        var gameLoopId;

        gameLoopId = setInterval(updateCharacterPosition, 10);
        $(window).on('keydown', function (event) {
            console.log('keydown');
            if (event.keyCode === 37) {
                gasPressed = true;
                $character.css('left', characterDistanceLeft);
                console.log(true);
            }
            else if (event.keyCode === 39) {
                gasPressed = true;
                $character.css('left', characterDistanceRight);

            }
        }).on('keyup', function (event) {
            if (event.keyCode === 37 || event.keyCode === 39) {
                gasPressed = false;
                console.log(false);
            }
        })
    }


    $('.try-again--button').click(function () {
        location.reload();
    });

    startRound();
    controlCharacter();
    // var controlInterval = setInterval(controlCharacter, 000);
};

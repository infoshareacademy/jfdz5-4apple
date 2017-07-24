var startGame = function () {

    var $character = $('.character');
    var $board = $('.board');
    var $cardboardBox = $('.cardboard-box');
    var $plane = $('.plane');
    var $bomb = $('.bomb');
    var $life = $('.life-item');
    var catchBomb = 0;
    var points = 0;
    var now = new Date();
    var day = now.getDate();
    var month = now.getMonth() + 1;
    var year = now.getFullYear();
    var today = day + '/' + month + '/' + year;

    highScore = JSON.parse(localStorage.getItem('highScore'));
    if (highScore === null) {
        var highScore = [
            {name: 'Paweł', score: 100, date: today},
            {name: 'Dawid', score: 400, date: today},
            {name: 'Alek', score: 1000, date: today},
            {name: 'Piotr', score: 800, date: today},
            {name: 'Noname', score: 0, date: today}
        ];
    }
    if (skinSetup !== 0) {
        $('.character-right').css({
            'background': 'url(img/skins/ludzik-z-workiem-prawo-' + skinSetup + '.png)'
        });
    }
    var board = {
        height: $board.height(),
        width: $board.width(),
        addPoint: function () {
            $('.points').text("SCORE " + points);
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
        roundEnd: function () {
            clearInterval(roundOne);
            clearInterval(boxSpawn);
            console.log('Koniec rundy');
        },
        gameEnd: function () {
            clearInterval(boxSpawn);
            clearInterval(roundOne);
            $('.game-over').css({
                "display": "inline-grid"
            });
            checkScore();
            localStorage.setItem('highScore', JSON.stringify(highScore));
        }
    };

    var checkScore = function () {
        var scores = highScore.map(function (score) {
            return score.score
        });
        if (scores[4] < points) {
            highScore.splice(4, 1);
            $('');
            highScore.push({name: 'pozniej zapytac', score: points, date: today})
        }
        highScore = highScore.sort(function (a, b) {
            return b.score - a.score
        });
        return highScore;
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
    var roundOne = setInterval(function () {
        var roundTime = 20;
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
                var positionXcardboardBox = $(this).position().left;
                var positionYcardboardBox = $(this).position().top;
                var characterCenterXPosition = character.positionX + character.width / 2;
                var boxCenterXPosition = positionXcardboardBox + cardboardBox.width / 2;
                if (positionYcardboardBox >= character.positionY && positionYcardboardBox <= character.positionY + character.height && Math.abs(characterCenterXPosition - boxCenterXPosition) < 35) {
                    $(this).remove();
                    points += 100;
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

    $('.try-again--button').click(function () {
        location.reload();
    })

};

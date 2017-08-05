var openTutorial = function () {

    var $character = $('.character');
    var $board = $('.board-game');
    var $cardboardBox = $('.cardboard-box-tutorial');
    var $bomb = $('.bomb-tutorial');
    var $life = $('.life-item-tutorial');
    var caughtBomb = 0;
    var caughtCardboardBoxInOneRound = 0;
    var bonusPoints = 100;
    var totalScoredGamePoints = 0;
    var totalPointsFormPreviousRounds = 0;
    $('.points').text("SCORE: " + totalScoredGamePoints);

    $character.css({
        left: 255 + 'px'
    });

    $('.lifes-tutorial')
        .append($('<div>').addClass('life-item-tutorial'))
        .append($('<div>').addClass('life-item-tutorial'))
        .append($('<div>').addClass('life-item-tutorial'));


    $('.character-right').css({
        'background': 'url(img/skins/ludzik-z-workiem-prawo-' + skinSetup + '.png)'
    });

    function calculMove() {
        var positionActualyCardboard = $(".cardboard-box-tutorial").position().left;
        var characterPostion = $(".character").position().left;
        var y = characterPostion - positionActualyCardboard;
        if (positionActualyCardboard > 255) {
            $(".cardboard-box-tutorial").addClass("arrows-left");
        }
        else if (positionActualyCardboard < 255) {
            $(".cardboard-box-tutorial").addClass("arrows-right");
        }
        console.log(y);
        if (y > 0) {
            var numbermoveleft = Math.round(y / 15);
            console.log(numbermoveleft);
            setInterval(function () {
                if (numbermoveleft > 0) {
                    character.moveLeft();
                    numbermoveleft--;
                }
            }, 100);
        }
        else if (y < 0) {
            var numbermoveRight = Math.round(y / 15 + ((y / 15) * -2));
            console.log(numbermoveRight);
            setInterval(function () {
                if (numbermoveRight > 0) {
                    character.moveRight();
                    numbermoveRight--;
                }
            }, 100);
        }
    }

    var board = {
        height: $board.height(),
        width: $board.width(),
        addPoint: function () {
            totalScoredGamePoints = totalPointsFormPreviousRounds + (caughtCardboardBoxInOneRound * bonusPoints);
            $('.points').text("SCORE: " + totalScoredGamePoints).fadeOut(300).fadeIn(300).fadeOut(300).fadeIn(300);
            $(".point-example-arow").hide(500);

            $(".tutorial-example").text("łapiąc bombe, tracisz życie").fadeOut(3000)
            calculMove();

        },
        subtractLife: function () {
            caughtBomb += 1;
            $life.last().fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
            setTimeout(function () {
                $life.last().remove();
                $life = $('.life-item');
            }, 800);
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


    var cardboardBox = {
        height: $cardboardBox.height(),
        width: $cardboardBox.width(),
        fall: function (fallingSpeed) {
            $('.fallingObject-tutorial').each(function (index, cardboardBoxNew) {
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
                    var randomXPosition = Math.random() * (board.width - bomb.width);
                    caughtCardboardBoxInOneRound++;
                    board.addPoint();
                    $board.prepend($('<div>').addClass('bomb-tutorial').addClass('fallingObject-tutorial').css({
                        left: randomXPosition
                    }));
                    $(this).removeClass('fallingObject-tutorial').removeClass('cardboard-box-tutorial').addClass('bonus-points').text(bonusPoints);
                    setTimeout(function () {
                        $('.bonus-points').remove()
                    }, 600);
                    setTimeout(function () {
                        var positionActualyBomb = $(".bomb-tutorial").position().left;
                        var characterPostion = $(".character").position().left;
                        var y = characterPostion - positionActualyBomb;
                        if (positionActualyBomb > 255) {
                            $(".bomb-tutorial").addClass("arrows-left");
                        }
                        else if (positionActualyBomb < 255) {
                            $(".bomb-tutorial").addClass("arrows-right");
                        }
                        console.log(y);
                        if (y > 0) {
                            var numbermoveleft = Math.round(y / 15);
                            console.log(numbermoveleft);
                            setInterval(function () {
                                if (numbermoveleft > 0) {
                                    character.moveLeft();
                                    numbermoveleft--;
                                }
                            }, 100)
                        }
                        else if (y < 0) {
                            var numbermoveRight = Math.round(y / 15 + ((y / 15) * -2));
                            console.log(numbermoveRight);
                            setInterval(function () {
                                if (numbermoveRight > 0) {
                                    character.moveRight();
                                    numbermoveRight--;
                                }
                            }, 100)
                        }
                    }, 500);
                    setTimeout(function () {
                        $(".tutorial-example").text("Click Play!").fadeIn(0)
                    }, 4000);
                    setTimeout(function () {

                        $(".tutorial-example").hide();
                        $('.game-menu--container').show();
                        $('.character').hide();
                        $('.lifes-tutorial').hide();
                        $('.points').hide();
                        $('.game-menu').show();
                        $('.countdownTimer').hide();
                        $('.game-over').hide();
                        $('.fallingObject-tutorial').remove();
                        $('.truck').removeClass('truck-move');
                        $(".arrow-left").remove();
                        $(".arrow-right").remove();

                    }, 5000)
                }
                else if (positionYcardboardBox > character.positionY + character.height) {
                    $(this).removeClass('checkCatchObject').removeClass('cardboard-box-tutorial').removeClass('fallingObject-tutorial').addClass('cardboard-box-destroyed');
                    setTimeout(function () {
                        $('.cardboard-box-destroyed').fadeOut();
                    }, 1200);
                    board.subtractLife();
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
            $('.fallingObject-tutorial').each(function (index, bombNew) {
                $(bombNew).css({
                    top: $(bombNew).position().top + fallingSpeed
                })
            });
        },
        checkExplosion: function () {
            $('.fallingObject-tutorial, .bomb-tutorial').each(function () {
                var positionXbomb = $(this).position().left;
                var positionYbomb = $(this).position().top;
                var characterCenterXPosition = character.positionX + character.width / 2;
                var bombCenterXPosition = positionXbomb + bomb.width / 2;
                var $bombOnGround = $(this);

                if (positionYbomb >= character.positionY && positionYbomb <= character.positionY + character.height && Math.abs(characterCenterXPosition - bombCenterXPosition) < 35) {
                    $bombOnGround.css({top: board.height - character.height - bomb.height + 'px'}).removeClass('fallingObject-tutorial').addClass('bomb-exploded').fadeOut().fadeIn();
                    setTimeout(function () {
                        $bombOnGround.remove();
                    }, 800);
                    board.subtractLife();
                    $board.append($("<div>").addClass("health-example-arow").fadeIn(0).fadeOut(300).fadeIn(300).fadeOut(300));
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

    var startTutorial = {
        time: 1000,
        addTime: 1000,
        instruction: function () {
            $(".lifes-tutorial").hide();
            $(".points").hide();
            var moveleft = [];
            var moveright = [];
            var lvlTutorial = 0;

            $board.append($("<div>").text("Poruszaj sie za pomocą strzałek w lewo i prawo").addClass("tutorial-example"));
            $board.append($("<div>").addClass("arrow-left").fadeOut(300).fadeIn(300));
            $board.append($("<div>").addClass("arrow-right").fadeOut(300).fadeIn(300));
            setTimeout(function () {
                $("div.tutorial-example").hide();
                $board.append($("<div>").addClass("clavier").fadeOut(0).fadeIn(500).fadeOut(1000));
                $(window).keydown(function (e) {
                    if (e.keyCode === 37) {
                        $("div.arrow-right").remove();
                        $board.append($("<div>").addClass("arrow-right"));
                        $("div.arrow-left").fadeOut(100).fadeIn(100);
                    }
                    else if (e.keyCode === 39) {
                        $("div.arrow-left").remove();
                        $board.append($("<div>").addClass("arrow-left"));
                        $("div.arrow-right").fadeOut(100).fadeIn(100);
                    }
                });
                $(window).keyup(function (e) {
                    console.log('keyup');
                    if (e.keyCode === 37) {
                        $("div.arrow-left").remove();
                        $board.append($("<div>").addClass("arrow-left"));
                        moveleft.push(1);
                        checkReadyMove();
                    }
                    else if (e.keyCode === 39) {
                        $("div.arrow-right").remove();
                        $board.append($("<div>").addClass("arrow-right"));
                        moveright.push(1);
                        checkReadyMove();
                    }
                });

            }, this.time);
            //tutorial fall things


            setTimeout(function () {
                lvlTutorial = 1;
                $(".tutorial-example").text("Spróbuj poruszyc sie w lewo i prawo !!!").fadeIn(500);
            }, this.time + startTutorial.addTime);

            function playTutorial() {
                StartMoveBoxes();
                setInterval(function () {
                    cardboardBox.checkCatch();
                    bomb.checkExplosion();
                    cardboardBox.fall(10);
                    bomb.fall(10)

                }, 150);
            }

            function StartMoveBoxes() {
                var randomXPosition = Math.random() * (board.width - bomb.width);
                $board.prepend($('<div>').addClass('cardboard-box-tutorial').addClass('fallingObject-tutorial').addClass("checkCatchObject").css({
                    left: randomXPosition
                }));


            }

            function checkReadyMove() {
                if (moveright.length > 0 && moveleft.length > 0 && lvlTutorial === 1) {
                    lvlTutorial = 2;
                    $(".tutorial-example").text("łapiąc paczke, zdobywasz punkty").css({
                        left: 150,
                        width: 300,
                        height: 100
                    }).fadeIn(500);

                    showHealty();
                }

            }

            function showHealty() {
                if (lvlTutorial === 2) {
                    $(".lifes-tutorial").show().fadeOut(300).fadeIn(300).fadeOut(300).fadeIn(300);
                    $board.append($("<div>").addClass("health-example").text("Masz 3 życia").fadeOut(0).fadeIn(1000));
                    $board.append($("<div>").addClass("health-example-arow").fadeOut(0).fadeIn(1000));
                    $(".points").show().fadeOut(300).fadeIn(300).fadeOut(300).fadeIn(300);
                    $board.append($("<div>").addClass("point-example").text("To sa Twoje punkty").fadeOut(0).fadeIn(1000));
                    $board.append($("<div>").addClass("point-example-arow").fadeOut(0).fadeIn(1000));
                    playTutorial();
                    calculMove();
                }
                setTimeout(function () {
                    console.log('test1');
                    lvlTutorial = 3;
                    $(".health-example-arow").hide();
                    $(".health-example").remove();
                    $(".point-example").remove();
                }, startTutorial.time + 2 * startTutorial.addTime);
            }
        }
    };


    $(window).keydown(function (e) {
        console.log('keydown-main');
        if (e.keyCode === 37) {
            character.moveLeft();
        }
        else if (e.keyCode === 39) {
            character.moveRight();
        }
    });

    startTutorial.instruction()
};
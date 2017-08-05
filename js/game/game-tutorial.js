var openTutorial = function () {

    var $character = $('.character');
    var $board = $('.board');
    var $cardboardBox = $('.cardboard-box');
    var $bomb = $('.bomb');
    var $life = $('.life-item');
    var caughtBomb = 0;
    var caughtCardboardBoxInOneRound = 0;
    var bonusPoints = 100;
    var totalScoredGamePoints = 0;
    var totalPointsFormPreviousRounds = 0;


    $('.character-right').css({
        'background': 'url(img/skins/ludzik-z-workiem-prawo-' + skinSetup + '.png)'
    });


    var board = {
        height: $board.height(),
        width: $board.width(),
        addPoint: function () {
            totalScoredGamePoints = totalPointsFormPreviousRounds + (caughtCardboardBoxInOneRound * bonusPoints);
            $('.points').text("SCORE: " + totalScoredGamePoints).fadeOut(300).fadeIn(300).fadeOut(300).fadeIn(300);
            $(".point-example-arow").hide(500);
            function showInstructionBomb() {
                $(".tutorial-example").text("łapiąc bombe, tracisz życie").fadeOut(3000)
            }

            showInstructionBomb();

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
                    var randomXPosition = Math.random() * (board.width - bomb.width);
                    caughtCardboardBoxInOneRound++;
                    board.addPoint();
                    $board.prepend($('<div>').addClass('bomb').addClass('fallingObject').css({
                        left: randomXPosition
                    }));
                    $(this).removeClass('fallingObject').removeClass('cardboard-box').addClass('bonus-points').text(bonusPoints);
                    setTimeout(function () {
                        $('.bonus-points').remove()
                    }, 600);
                    setTimeout(function () {
                        var positionActualyBomb = $(".bomb").position().left;
                        var characterPostion = $(".character").position().left;
                        var y = characterPostion - positionActualyBomb;
                        if (positionActualyBomb > 255) {
                            $(".cardboard-box").addClass("arrows-left");
                        }
                        else if (positionActualyBomb < 255) {
                            $(".cardboard-box").addClass("arrows-right");
                        }
                        console.log(y);
                        if (y > 0) {
                            var numbermoveleft = Math.round(y / 15);
                            console.log(numbermoveleft);
                            for (var i = 0; i < numbermoveleft; i++) {
                                setTimeout(function () {
                                    character.moveLeft();
                                }, 500)
                            }
                        }
                        else if (y < 0) {
                            var numbermoveRight = Math.round(y / 15 + ((y / 15) * -2));
                            console.log(numbermoveRight);
                            for (var j = 0; j < numbermoveRight; j++) {
                                setTimeout(function () {
                                    character.moveRight();
                                }, 500)
                            }
                        }
                    }, 500);
                    setTimeout(function () {
                        $(".tutorial-example").text("Spróbuj sam!").fadeIn(0)
                    },4000);
                    setTimeout(function () {
                        $(".tutorial-example").hide();
                        startGame()
                    },5000)
                }
                else if (positionYcardboardBox > character.positionY + character.height) {
                    $(this).removeClass('checkCatchObject').removeClass('cardboard-box').removeClass('fallingObject').addClass('cardboard-box-destroyed');
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
        time: 2200,
        addTime: 1000,
        instruction: function () {
            $(".lifes").hide();
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
                        $board.append($("<div>").addClass("right"));
                        $("div.arrow-left").fadeOut(100).fadeIn(100);
                    }
                    else if (e.keyCode === 39) {
                        $("div.arrow-left").remove();
                        $board.append($("<div>").addClass("left"));
                        $("div.arrow-right").fadeOut(100).fadeIn(100);
                    }
                });
                $(window).keyup(function (e) {
                    if (e.keyCode === 37) {
                        $("div.arrow-left").remove();
                        $board.append($("<div>").addClass("left"));
                        moveleft.push(1);
                        checkReadyMove();
                        chceckPositionXMario()
                    }
                    else if (e.keyCode === 39) {
                        $("div.arrow-right").remove();
                        $board.append($("<div>").addClass("right"));
                        moveright.push(1);
                        checkReadyMove();
                        chceckPositionXMario()
                    }
                });

            }, this.time);
            //tutorial fill things
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
                $board.prepend($('<div>').addClass('cardboard-box').addClass('fallingObject').addClass("checkCatchObject").css({
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
                }
                showHealty()
            }

            function showHealty() {
                if (lvlTutorial === 2) {
                    $(".lifes").show().fadeOut(300).fadeIn(300).fadeOut(300).fadeIn(300);
                    $board.append($("<div>").addClass("health-example").text("Masz 3 życia").fadeOut(0).fadeIn(1000));
                    $board.append($("<div>").addClass("health-example-arow").fadeOut(0).fadeIn(1000));
                    $(".points").show().fadeOut(300).fadeIn(300).fadeOut(300).fadeIn(300);
                    $board.append($("<div>").addClass("point-example").text("To sa Twoje punkty").fadeOut(0).fadeIn(1000));
                    $board.append($("<div>").addClass("point-example-arow").fadeOut(0).fadeIn(1000));
                    playTutorial();
                    autoMoveharacter();


                }
                setTimeout(function () {
                    lvlTutorial = 3;
                    $(".health-example-arow").hide();
                    $(".health-example").remove();
                    $(".point-example").remove();
                    //    $(".tutorial-example").hide();
                }, startTutorial.time + 2 * startTutorial.addTime);
            }

            function autoMoveharacter() {
                calculMove()


            }

            function calculMove() {
                var positionActualyCardboard = $(".cardboard-box").position().left;
                var characterPostion = $(".character").position().left;
                var y = characterPostion - positionActualyCardboard;
                if (positionActualyCardboard > 255) {
                    $(".cardboard-box").addClass("arrows-left");
                }
                else if (positionActualyCardboard < 255) {
                    $(".cardboard-box").addClass("arrows-right");
                }
                console.log(y);
                if (y > 0) {
                    var numbermoveleft = Math.round(y / 15);
                    console.log(numbermoveleft);
                    for (var i = 0; i < numbermoveleft; i++) {
                        setTimeout(function () {
                            character.moveLeft();
                        }, 500)

                    }

                }
                else if (y < 0) {
                    var numbermoveRight = Math.round(y / 15 + ((y / 15) * -2));
                    console.log(numbermoveRight);
                    for (var j = 0; j < numbermoveRight; j++) {
                        setTimeout(function () {
                            character.moveRight();
                        }, 500)
                    }
                }

            }

            function chceckPositionXMario() {
                return $(".character").position().left;
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

    startTutorial.instruction()
    // startRound();
};
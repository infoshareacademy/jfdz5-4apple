function fallingBombs() {
    var boardWidth = $('.board').width();
    var $bomb = $('.bomb');
    var heightBomb = 0;
    var fallingTime = 100;
setInterval(function(){
    var bombPosition = $bomb.position().left + $bomb.width() / 2;
    heightBomb += 10;
    $('.bomb').css({
        'transform': 'translateY(' + height + 'px)'
    });
    if (heightBomb >= 560) {
        clearInterval(fallingTime)
    }
}, fallingTime)

}
var boardWidth = $('.board').width();
var $bomb = $('.bomb');
var heightBomb = -15;
var fallingTime = 100;
// positive or negative startBombPosition
var startBombPosition = Math.floor(Math.random($bomb.position().left + $bomb.width() / 2) * boardWidth / 2);
startBombPosition *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
console.log(startBombPosition);

function fallingBombs() {
    setInterval(function () {
        heightBomb += 10;
        startBombPosition += 0
        $('.bomb').css({
            'transform': 'translate(' + startBombPosition + 'px, ' + height + 'px)'
        });
        if (heightBomb >= 560) {
            clearInterval(fallingTime)
        }
    }, fallingTime)

}
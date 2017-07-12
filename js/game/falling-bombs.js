$(document).ready(function () {
    fallingBombs(setStartBombPosition());
});

var boardWidth = $('.board').width();
var $bomb = $('.bomb');
var fallingTime = 100;

//var delay = [1000, 2000, 3000, 4000, 5000];

function setStartBombPosition() {
    var startBombPosition = Math.floor(Math.random($bomb.position().left + $bomb.width() / 2) * boardWidth / 2);
    startBombPosition *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    return startBombPosition;
}
// function createBombs() {
//     $('.bombs-container').append('<div class="bomb"></div>');
//     setStartBombPosition();
// }

bombs = [
    {
        bombPosition: setStartBombPosition(),
        falling: fallingBombs(this.bombPosition)
    },
    {
        bombPosition: setStartBombPosition(),
        falling: fallingBombs(this.bombPosition)
    }
];



function fallingBombs(position) {
    var heightBomb = 0;
    setInterval(function () {
        heightBomb += 10;
        $bomb.each(function () {
            $(this).css({
                'transform': 'translate(' + position + 'px, ' + height + 'px)'
            });
        });

        if (heightBomb >= 560) {
            clearInterval(fallingTime)
        }
    }, fallingTime)
}



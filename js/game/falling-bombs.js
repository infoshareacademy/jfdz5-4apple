$(document).ready(function () {
    var boardWidth = $('.board').width();
    var $bombs = $('.bomb');
    var fallingTime = 100;
    var bombs = $.map($bombs, function (element) {
        return {
            x: Math.floor(Math.random() * boardWidth) - boardWidth / 2,
            y: 0,
            element: element
        }
    });

    var intervalId = setInterval(function () {
        bombs.forEach(function (bomb) {
            bomb.y += 2;
            $(bomb.element).css({
                'transform': 'translate(' + bomb.x + 'px, ' + bomb.y + 'px)'
            });

            if (bomb.y >= 560) {
                $(bomb.element).hide();
            }
        });
    }, fallingTime);
});
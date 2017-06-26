var position = 0;

$(window).keydown(function (e) {
    $character = $('.character');

    if (e.keyCode === 37) {
        position -= 25;
        $character.css({'transform': 'translateX(' + position + 'px)'});
        console.log(position);
    }
    else if (e.keyCode === 39) {
        position += 25;
        $character.css({'transform': 'translateX(' + position + 'px)'});
        console.log(position);
    }
});

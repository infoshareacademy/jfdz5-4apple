var position = 0;
var height = 0;

$(window).keydown(function (e) {
    $character = $('.character');
    if (position <= (-255)) {
        position += 15;
        $character.css({'transform': 'translateX(' + position + 'px)'});
        // console.log(position)
    }
    else if (position >= 255) {
        position -= 15;
        $character.css({'transform': 'translateX(' + position + 'px)'});
        // console.log(position)
    }
    else if (e.keyCode === 37) {
        position -= 15;
        $character.css({
            'transform': 'translateX(' + position + 'px)',
            'background': 'url("img/ludzik-z-workiem-lewo.png")',
            'background-size': 'cover'
        });
        // console.log(position)
    }
    else if (e.keyCode === 39) {
        position += 15;
        $character.css({
            'transform': 'translateX(' + position + 'px)',
            'background': 'url("img/ludzik-z-workiem-prawo.png")',
            'background-size': 'cover'
        });
        // console.log(position)
    }

});


var cardboardBoxFall = setInterval(function () {
    var mario = $(".character");
    var box = $('.cardboard-box');

    var marioPosition = mario.position().left + mario.width() / 2;
    var boxPosition = box.position().left + box.width() / 2;
    height += 10;
    // console.log(height);
    $('.cardboard-box').css({
        'transform': 'translateY(' + height + 'px)'
    });

    console.log(boxPosition - marioPosition);

    if(height >= 425 && height <=500  && Math.abs( boxPosition - marioPosition) < 35){
        $('.cardboard-box').hide();
        clearInterval(cardboardBoxFall);
    }
    else if (height >=490 ){
        clearInterval(cardboardBoxFall);
    }
}, 100);



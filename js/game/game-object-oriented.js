/**
 * Created by Piotrek on 15.07.2017.
 */
var $character = $('.character');

var character = {
    reference: $character,
    height: $character.height,
    width: $character.width,
    PositionX: $character.position().left,
    PositionY: $character.position().top,
    moveLeft: function () {
        if (character.PositionX > 0) {
            character.PositionX -= 15;
            $character.css({
                left: character.PositionX
            }).removeClass('character-right').addClass('character-left');
        }
    },
    moveRight: function () {
        if (character.PositionX < 510) {
            character.PositionX += 15;
            $character.css({
                left: character.PositionX
            }).removeClass('character-left').addClass('character-right');
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
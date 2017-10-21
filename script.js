$(function () {
    var pictures = $('.container-team');
    var picturesPositionTop = pictures.position().top;
    var now = $('.animation');
    var second = $('.animation-first');

    $(window).scroll(function () {
        if (parseInt($(window).scrollTop() + $(window).height() - 400) > (picturesPositionTop)) {
            if (now.hasClass('animation')) {
                now.removeClass('animation').addClass('animation-team');
                second.removeClass('animation-first').addClass('animation-second');
            }
        }
    });
});

// KOD NA WPISANIE SLOWA "GAME"

var helper = {
    allowed: [101, 109, 97, 103],
    stored: [],
    checker: function (first, second) {
        return first.toString() === second.toString();
    },
    push: function (letter) {
        helper.stored.unshift(letter);
    },
    action: function () {
        $('.game-container').fadeIn(1000).css({
            display: 'flex'
        });
    }
};

document.addEventListener("keypress", function (e) {
    if (helper.stored.length > 3) {
        helper.stored.pop();
    }

    var event = e || window.event,
        keyCode = event.keyCode || event.charCode;

    helper.push(keyCode);

    if (helper.checker(helper.allowed, helper.stored)) {
        helper.action();
    }
});
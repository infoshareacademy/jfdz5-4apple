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


// SMOOTH ANIMATED SCROLL ON SNEEK PEAK BUTTON //
$("a, .button-top").on('click', function (event) {


    if (this.hash !== "") {

        event.preventDefault();


        var hash = this.hash;

        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 1400, function () {

            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
        });
    } // End if
});


// KOD NA WYWOLANIE GRY PRZEZ FORMULARZ

$("form").submit(function (event) {
    {
        alert("wywolana");
    }


});


// KOD NA WPISANIE SLOWA "GAME"

var helper = {
    allowed: [101, 109, 97, 103],
    stored: [],
    checker: function (first, second) {
        return first.toString() === second.toString() ? true : false;
    },
    push: function (letter) {
        helper.stored.unshift(letter);
        console.log(helper.stored)
    },
    action: function () {
        $('.game-container').show().css({
            display: 'flex'
        })
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
$(function () {
    var pictures = $('.container-team');
    var picturesPositionTop = pictures.position().top;
    var now = $('.animation');
    var second = $('.animation-first');

    $(window).scroll(function () {
        if (parseInt($(window).scrollTop()+$(window).height()-400) > (picturesPositionTop)) {
            if (now.hasClass('animation')) {
                now.removeClass('animation').addClass('animation-team');
                second.removeClass('animation-first').addClass('animation-second');
            }
        }
    });
});

$("a, .button-top").on('click', function(event) {


    if (this.hash !== "") {

        event.preventDefault();


        var hash = this.hash;

        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 1400, function(){

            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
        });
    } // End if
});

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

$('.carousel').carousel({
    interval: 500
})
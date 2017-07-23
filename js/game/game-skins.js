var skinChoice = function () {
    skins = [];
    var skinIndex = 0;
    for (var skinId = 1; skinId <= 12; skinId++) {
        skins.push('img/skins/ludzik-z-workiem-prawo-' + skinId + '.png')
    }

    skins.map(function (skin) {
        skinIndex += 1;
        $('.skins-tile').append($('<div>').addClass('skin--element').css({
            'background': 'url(' + skin + ') no-repeat center'
        }).attr('data-index', skinIndex))
    });
    $('.button__cancel').click(function () {
        $('.skins--container').animate({
            height:'toggle'
        })
    })
}();


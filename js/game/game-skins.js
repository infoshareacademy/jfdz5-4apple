function skinChoice() {
    $('.game-container').append($('<div>').addClass('skins--container').text('Select skin')
        .append($('<div>').addClass('skins-tile'))
        .append($('<div>').addClass('skin-buttons-container')
            .append($('<button>').addClass('skins--button button__save').attr('id', 'skins-save').text('save'))
            .append($('<button>').addClass('skins--button button__cancel').attr('id', 'skins-cancel').text('cancel'))));

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
            height: 'toggle'
        })
    })
};

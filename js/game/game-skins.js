skinSetup = localStorage.getItem('skinSetup');
if (skinSetup === null) {
    var skinSetup = 0;
}
console.log(skinSetup);
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
    $('.skin--element').click(function () {
        $('.skin--element').css({
            border: '2px #000 solid'
        });
        $(this).css({
            border: '2px #32fc7d solid'
        });
        skinSetup = $(this).attr('data-index');
    });
    $('.button__save').click(function () {
        localStorage.setItem("skinSetup", skinSetup);
        $('.skins--container').animate({
            height: 'toggle'
        })
    });
    $('.button__cancel').click(function () {
        skinSetup = localStorage.getItem('skinSetup');
        $('.skins--container').animate({
            height: 'toggle'
        })
    })
}

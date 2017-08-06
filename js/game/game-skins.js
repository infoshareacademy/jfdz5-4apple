skinSetup = localStorage.getItem('skinSetup');
if (skinSetup === null) {
    var skinSetup = "1";
}

function skinChoiceDraw() {
    $('.game-container').append($('<div>').addClass('skins--container').text('Select skin')
        .append($('<div>').addClass('sale').text('only now!')
            .prepend($('<span>').addClass('sale__price').text('9.99€')))
        .append($('<div>').addClass('skins-tile'))
        .append($('<div>').addClass('skin-buttons-container')
            .append($('<button>').addClass('game--btn save--btn').attr('id', 'skins-save').text('save'))
            .append($('<button>').addClass('game--btn close--btn').attr('id', 'skins-cancel').text('cancel'))));
    skinsDisplay();
}
function skinsDisplay() {
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
    var $skins = $('.skin--element');
    $skins.each(function () {
        if (skinSetup === $(this).attr('data-index')) {
            $(this).addClass('skin--element__clicked');
        }
    });

    $skins.click(function () {
        $('.skin--element').removeClass('skin--element__clicked');
        $(this).addClass('skin--element__clicked');
    });

    $('.save--btn').click(function () {
        skinSetup = $('.skin--element__clicked').attr('data-index');
        localStorage.setItem("skinSetup", skinSetup);
        $('.skins--container').animate({
            height: 'toggle'
        }).remove()
    });

    $('.close--btn').click(function () {
        $('.skins--container').animate({
            height: 'toggle'
        }).remove()
    });
}
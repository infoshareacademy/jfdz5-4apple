var now = new Date();
var day = now.getDate();
var month = now.getMonth() + 1;
var year = now.getFullYear();
var today = day + '/' + month + '/' + year;


highScore = JSON.parse(localStorage.getItem('highScore'));

if (highScore === null) {
    var highScore = [
        {name: 'Paweł', score: 1000, date: today},
        {name: 'Dawid', score: 1000, date: today},
        {name: 'Piotr', score: 1000, date: today},
        {name: 'Noname', score: 1, date: today},
        {name: 'Alek', score: 0, date: today}
    ];
}
var addScore = function () {
    $('#save').click(function () {
        var pointsHighScore = parseInt(sessionStorage.getItem('pointsHighScore'));
        var playerName = $('.add-name--input').val();
        if (playerName === "") {
            $('.required--text').remove();
            $('.add-name--input').after($('<span>').addClass('required--text').text('name required'));
            return
        }
        highScore.splice(4, 1);
        highScore.push({name: playerName, score: pointsHighScore, date: today});
        highScore = highScore.sort(function (a, b) {
            return b.score - a.score
        });
        localStorage.setItem('highScore', JSON.stringify(highScore));
        $('.add-name--container').remove()
    });
};


var checkScore = function () {
    var pointsHighScore = sessionStorage.getItem('pointsHighScore');
    var scores = highScore.map(function (score) {
        return score.score
    });
    if (scores[scores.length - 1] < pointsHighScore) {
        $('.game').append($('<div>').addClass('add-name--container').text('high score!')
            .append($('<input>').addClass('add-name--input').attr('placeholder', 'your name').attr('maxlength', "10"))
            .append($('<button>').addClass('game--btn save--btn').attr('id', 'save').text('save')));
    }
    addScore();
};

var openHighScore = function () {
    $('.game-menu--container')
        .append($('<div>').addClass('high-score--container')
            .append($('<table>').addClass('high-score--table')
                .append($('<tr>').addClass('table__headers')
                    .append($('<th>').text('name'))
                    .append($('<th>').text('score'))
                    .append($('<th>').text('date'))
                )
            ).append($('<div>')
                .append($('<button>').addClass('game--btn close--btn').text('reset'))
                .append($('<button>').addClass('game--btn save--btn').text('close'))
            )
            .append($('<span>').addClass('bomb-first bomb-exploding-animation'))
            .append($('<span>').addClass('bomb-second bomb-exploding-animation'))
        );
    highScore.map(function (record) {
        $('.high-score--table').append($('<tr>')
            .append($('<td>').text(record.name))
            .append($('<td>').text(record.score))
            .append($('<td>').text(record.date))
        )
    });
    $('.save--btn').click(function () {
        $('.high-score--container').remove()
    });
    $('.close--btn').click(function () {
        localStorage.clear('highScore');
        $('.high-score--container').remove();
        highScore = [
            {name: 'Paweł', score: 1000, date: today},
            {name: 'Dawid', score: 1000, date: today},
            {name: 'Piotr', score: 1000, date: today},
            {name: 'Noname', score: 1, date: today},
            {name: 'Alek', score: 0, date: today}
        ];
        openHighScore();
    })

};
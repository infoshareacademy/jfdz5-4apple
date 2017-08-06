var now = new Date();
var day = now.getDate();
var month = now.getMonth() + 1;
var year = now.getFullYear();
var today = day + '/' + month + '/' + year;
var highScoreDefault = [
    {name: 'Paweł', score: 1000, date: today, index: 1},
    {name: 'Dawid', score: 1000, date: today, index: 2},
    {name: 'Piotr', score: 1000, date: today, index: 3},
    {name: 'Alek', score: 1000, date: today, index: 4},
    {name: 'Noname', score: 1, date: today, index: 5}

];

highScore = JSON.parse(localStorage.getItem('highScore'));

if (highScore === null) {
    var highScore = highScoreDefault
}
var addScore = function () {
    $('#save').click(function () {
        var $nameInput = $('.add-name--input');
        var pointsHighScore = parseInt(sessionStorage.getItem('pointsHighScore'));
        var playerName = $nameInput.val();
        if (playerName === "") {
            $('.required--text').remove();
            $nameInput.after($('<span>').addClass('required--text').text('name required'));
            return
        }
        var scoreIndex = 1 + highScore.map(function (score) {
                return score.index
            }).reduce(function (previous, next) {
                return previous > next ? previous : next
            });
        highScore.splice(4, 1);
        highScore.push({name: playerName, score: pointsHighScore, date: today, index: scoreIndex});
        highScore = highScore.sort(function (a, b) {
            return b.score - a.score
        });
        localStorage.setItem('highScore', JSON.stringify(highScore));
        $('.add-name--container').remove();
        openHighScore(scoreIndex);
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
    scoreIndex = highScore.map(function (score) {
        return score.score
    });
    addScore();
};

var openHighScore = function (scoreIndex) {
    $('.game-container')
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
        var $highScoreTable = $('.high-score--table');
        if (record.index === scoreIndex) {
            $highScoreTable.append($('<tr>').addClass('record__highlighted')
                .append($('<td>').text(record.name))
                .append($('<td>').text(record.score))
                .append($('<td>').text(record.date)));
        }
        else {
            $highScoreTable.append($('<tr>')
                .append($('<td>').text(record.name))
                .append($('<td>').text(record.score))
                .append($('<td>').text(record.date)));
        }
    });
    $('.save--btn').click(function () {
        $('.high-score--container').remove()
    });
    $('.close--btn').click(function () {
        localStorage.clear('highScore');
        $('.high-score--container').remove();
        highScore = [
            {name: 'Paweł', score: 1000, date: today, index: 1},
            {name: 'Dawid', score: 1000, date: today, index: 2},
            {name: 'Piotr', score: 1000, date: today, index: 3},
            {name: 'Alek', score: 1000, date: today, index: 4},
            {name: 'Noname', score: 1, date: today, index: 5}
        ];
        openHighScore();
    })
};
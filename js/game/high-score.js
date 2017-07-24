var now = new Date();
var day = now.getDate();
var month = now.getMonth() + 1;
var year = now.getFullYear();
var today = day + '/' + month + '/' + year;


highScore = JSON.parse(localStorage.getItem('highScore'));

if (highScore === null) {
    var highScore = [
        {name: 'Paweł', score: 100, date: today},
        {name: 'Dawid', score: 400, date: today},
        {name: 'Alek', score: 1000, date: today},
        {name: 'Piotr', score: 800, date: today},
        {name: 'Noname', score: 0, date: today}
    ];
}


var checkScore = function () {
    var pointsHighScore = localStorage.getItem('pointsHighScore');
    var scores = highScore.map(function (score) {
        return score.score
    });
    if (scores[4] < pointsHighScore) {
        highScore.splice(4, 1);
        $('.game').append($('<div>').addClass('add-name--container').text('high score!')
            .append($('<form>').addClass('add-name--form').attr('onsubmit', 'highScoreAddName')
                .append($('<input>').addClass('add-name--input').attr('placeholder', 'your name'))
                .append($('<input>').addClass('skins--button button__save').attr('type', 'submit').attr('value', 'save'))));

        var playerName = $('.add-name--input').val();

        function highScoreAddName() {
            highScore.push({name: playerName, score: points, date: today})
        }
    }
    highScore = highScore.sort(function (a, b) {
        return b.score - a.score
    });
    return highScore;
};
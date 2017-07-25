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
            .append($('<input>').addClass('add-name--input').attr('placeholder', 'your name'))
            .append($('<button>').addClass('skins--button button__save').attr('id', 'save').text('save')));
    }
    addScore();
};


(function () {
    var elArrow = document.getElementById('button');

    elArrow.addEventListener('click', scroll);

    function scroll() {
        var scrolling = setInterval(function () {
            window.scrollTo(0, ((windowPosition - (0.10 * windowPosition))));
            if (windowPosition === 0) {
                clearInterval(scrolling);
            }
        }, 1)
    }
})();
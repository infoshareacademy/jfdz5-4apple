(function () {

    var windowPosition;
    var elArrow = document.getElementsByClassName('button-invisible')[0];

    addEventListener('scroll', checkHeight);

    function checkHeight() {
        windowPosition = window.scrollY;

        if (windowPosition > window.innerHeight) {
            elArrow.setAttribute('class', 'button-visible');
        }
        else {
            elArrow.setAttribute('class', 'button-invisible');
        }
    }
})();
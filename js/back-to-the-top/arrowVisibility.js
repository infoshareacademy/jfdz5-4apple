//defining EventListener for scroll
var windowPosition = window.scrollY;

(function () {
    var elArrow = document.getElementById('button');
    var sectionHeight = (window.innerHeight - 70);

    addEventListener('scroll', checkHeight);

    function checkHeight() {
        windowPosition = window.scrollY;

        if (windowPosition > sectionHeight) {
            elArrow.setAttribute('class', 'button-visible');
        }
        else {
            elArrow.setAttribute('class', 'button-invisible');
        }
    }
})();



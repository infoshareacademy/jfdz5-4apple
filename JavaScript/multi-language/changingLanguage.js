(function () {

    var isPolish;

    var elLanguage = document.getElementById('language');
    elLanguage.addEventListener('click', displayLanguage);

    var elLanguageMenu = document.getElementsByClassName('menu-list--language');
    elLanguageMenu[0].addEventListener('click', displayLanguage);

    function displayLanguage() {
        document.querySelectorAll('[data-lang]').forEach(function (el) {
            var text = el.innerText;

            el.innerText = el.getAttribute('data-lang');
            el.setAttribute('data-lang', text);
        });

        if (isPolish === true) {
            elLanguage.setAttribute('class', 'language flag-en');
            isPolish = false;
        }
        else {
            elLanguage.setAttribute('class', 'language flag-pl');
            isPolish = true;
        }
    }
})();
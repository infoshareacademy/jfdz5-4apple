(function () {

    var isPolish;
    var elNamePlaceholder = document.getElementById('form-name');
    var elButton = document.getElementById('sign-in');
    var elSubmitAlert = document.getElementsByClassName('newsletter-form');
    var elCookiesInfoAccept = document.getElementsByClassName('accept-cookies__button');
    var elFlagMenu = document.getElementsByClassName('flag')[0];

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

        if (isPolish === false) {
            elLanguage.setAttribute('class', 'menu-item language flag-en');
            elFlagMenu.setAttribute('class', 'flag flag-en');
            elNamePlaceholder.setAttribute('placeholder', 'Imię');
            elButton.setAttribute('value', 'zapisz się!');
            elSubmitAlert[0].setAttribute('onsubmit', "alert('Uważnie obserwuj swoją pocztę. W nieodległej przyszłości otrzyamasz wiadomość o otwarciu naszego serwisu. Jeśli masz ochotę zagrać w naszą grę, po prostu wpisz 'game' będąc na naszej stronie, po zamknięciu tego komunikatu. Pamiętaj, żeby sprawdzić, czy Caps Lock jest wyłączony! Miłego grania!!)");
            elCookiesInfoAccept[0].setAttribute('value', 'Akceptuję');
            isPolish = true;

        }
        else {
            elLanguage.setAttribute('class', 'menu-item language flag-pl');
            elFlagMenu.setAttribute('class', 'flag flag-pl');
            elNamePlaceholder.setAttribute('placeholder', 'Name');
            elButton.setAttribute('value', 'sign up!');
            elSubmitAlert[0].setAttribute('onsubmit', "alert('Carefully watch your email. In the near future you will receive message about opening our service. If you want to try out our game, just type in 'game' after closing this alert. Remember to check if your Caps Lock is off! Enjoy playing!!')");
            elCookiesInfoAccept[0].setAttribute('value', 'I agree');
            isPolish = false;
        }
    }
})();

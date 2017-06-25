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
            elLanguage.setAttribute('class', 'language flag-en');
            elFlagMenu.setAttribute('class', 'flag flag-en');
            elNamePlaceholder.setAttribute('placeholder', 'Imię');
            elButton.setAttribute('value', 'zapisz się!');
            elSubmitAlert[0].setAttribute('onsubmit', "alert('Uważnie obserwuj swoją pocztę. W nieodległej przyszłości otrzyamasz wiadomość o otwarciu naszego serwisu.')");
            elCookiesInfoAccept[0].setAttribute('value', 'Akceptuję');
            isPolish = true;

        }
        else {
            elLanguage.setAttribute('class', 'language flag-pl');
            elFlagMenu.setAttribute('class', 'flag flag-pl');
            elNamePlaceholder.setAttribute('placeholder', 'Name');
            elButton.setAttribute('value', 'sign up!');
            elSubmitAlert[0].setAttribute('onsubmit', "alert('Carefully watch your email. In the near future you will receive message about opening our service.')");
            elCookiesInfoAccept[0].setAttribute('value', 'I agree');
            isPolish = false;
        }
    }
})();

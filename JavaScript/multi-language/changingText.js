var elLanguage = document.getElementById('language');
elLanguage.addEventListener('click', changeLanguage);

function changeLanguage() {
    document.querySelectorAll('[data-lang]').forEach(function (el) {
        var text = el.innerText;

        el.innerText = el.getAttribute('data-lang');
        el.setAttribute('data-lang', text);
    })
}
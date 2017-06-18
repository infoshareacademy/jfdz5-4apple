
document.querySelectorAll('[data-lang]').forEach(function(el) {
    var text = el.innerText;

    el.innerText = el.getAttribute('data-lang');
    el.setAttribute('data-lang', text);
})
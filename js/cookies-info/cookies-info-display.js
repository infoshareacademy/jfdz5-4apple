(function () {
    var elCookiesInfoContainer = document.getElementsByClassName('cookies-info--display')[0];
    var elCookiesInfoClosure = document.getElementsByClassName('cookies-info__closure')[0];
    var elCookiesInfoAccept = document.getElementsByClassName('accept-cookies__button')[0];

    elCookiesInfoAccept.addEventListener('click', accept);
    elCookiesInfoClosure.addEventListener('click', close);

    document.onload = checkAgreement();

    function close() {
        elCookiesInfoContainer.setAttribute('class', 'cookies-info--hide');
    }

    function accept() {
        elCookiesInfoContainer.setAttribute('class', 'cookies-info--hide');
        var agreement = {
            agreement: 'true',
            date: Date.now()
        };
        localStorage.setItem('agreement', JSON.stringify(agreement));
    }

    function checkAgreement() {

        var cookiesAgreement = localStorage.getItem('agreement');
        cookiesAgreement = JSON.parse(cookiesAgreement);

        if (cookiesAgreement === null) {
            return;
        }

        var now = Date.now();
        var agreementDate = cookiesAgreement.date;
        var monthInMilliseconds = 1000 * 60 * 60 * 24 * 30;

        if (now - agreementDate < monthInMilliseconds) {
            elCookiesInfoContainer.setAttribute('class', 'cookies-info--hide');
        }
        else {
            localStorage.clear();
        }
    }
})();
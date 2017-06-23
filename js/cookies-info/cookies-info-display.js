(function(){

    var elCookiesInfoContainer = document.getElementsByClassName('cookies-info--display')[0];
    var elCookiesInfoClosure = document.getElementsByClassName('cookies-info__closure')[0];
    var elCookiesInfoAccept = document.getElementsByClassName('accept-cookies__button')[0];

    elCookiesInfoAccept.addEventListener('click', accept );
    elCookiesInfoClosure.addEventListener('click', close );

    function close(){
        elCookiesInfoContainer.setAttribute('class', 'cookies-info--hide');
    }
    function accept(){
        elCookiesInfoContainer.setAttribute('class', 'cookies-info--hide');
    }

})();
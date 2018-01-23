var $ = function (selector) {
    var elem = document.querySelectorAll(selector); //selector makes this a versatile function. We can pass it the selector that we want for that one use

    var text = function (textInput) {
        for (var i = 0; i < elem.length; i++) {
            elem[i].innerText = textInput;
        }
    }

    var addClass = function (className) {
        for (var i = 0; i < elem.length; i++) {
            elem[i].classList.add(className);
        }
    }

    var removeClass = function (className) {
        for (var i = 0; i < elem.length; i++) {
            elem[i].classList.remove(className);
        }
    }

    var on = function (action, cb) {
        for (var i = 0; i < elem.length; i++) {
            elem[i].addEventListener(action, cb);
        }
    }

    var toggleClass = function (className) {
        for (var i = 0; i < elem.length; i++) {
            if (elem[i].classList.contains(className)) {
                elem[i].classList.remove(className);
                //this.removeClass(className); also a solution but very memory intensive for longer lists
            }
            else {
                elem[i].classList.add(className);
                //this.addClass(className); also a solution but very memory intensive for longer lists
            }
        }
    }

    var html = function (newHTML) {
        for (var i = 0; i < elem.length; i++) {
            elem[i].innerHTML = newHTML;
        }
    }

    var publicAPI = {
        element: elem,
        text: text,
        addClass: addClass,
        removeClass: removeClass,
        on: on,
        html: html,
        toggleClass: toggleClass
    }

    // var helperFunction = function () {
    //     console.log("More Text");
    // }

    return publicAPI;
}
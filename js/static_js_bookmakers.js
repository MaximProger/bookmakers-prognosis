$(function () {

    "use strict";

    function makeTimer() {

        var endTime = new Date("12 May 2020 19:00:00 GMT+00:00");

        endTime = (Date.parse(endTime) / 1000);

        var now = new Date();
        now = (Date.parse(now) / 1000);

        var timeLeft = endTime - now;

        var days = Math.floor(timeLeft / 86400);
        var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
        var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
        var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

        if (hours < "10") { hours = "0" + hours; }
        if (minutes < "10") { minutes = "0" + minutes; }
        if (seconds < "10") { seconds = "0" + seconds; }

        $("#days").html("<span>дней</span>" + days);
        $("#hours").html("<span>часов</span>" + hours);
        $("#minutes").html("<span>минут</span>" + minutes);
        $("#seconds").html("<span>секунд</span>" + seconds);

    }

    setInterval(function () { makeTimer(); }, 1000);

    let strBook = 'online-bookmakers.ru';
    console.log('%c%s', 'color: #144599; font: 1.2rem/1 Tahoma;', strBook);

    svg4everybody();

    setTimeout(function () {
        $('.gift-count').addClass('gift-count-a');
    }, 1500);

    setTimeout(function () {
        loadScript('static/js/jivosite.js');
    }, 6000);

    $('.lozad').lazy({
        /*
        beforeLoad: function(element) {
            if($(element).hasClass('bookmakers-banner-img')) {
                 Modernizr.on('webp', function (result) {
                    if (result) {
                        $(element).data('src', 'static/banners/webp/780х90.webp');
                    }
                });
            }
        },
        */
        afterLoad: function (element) {
            $(element).addClass('lozad-loaded');
        }
    });

    $('.lang-selector__button').click(function () {
        $('.lang-selector__langs').toggle('fast');
        return false;
    });

    $('.user-auth__guest').click(function () {
        $('body').append('<div class="popup-overlay"></div>');
        $('#login-modal').toggle('fast');
        return false;
    });

    $('#login-modal .modal__close').click(function () {
        $('#login-modal').css('display', 'none');
        $('.popup-overlay').remove();
        return false;
    });

    $('.open-register').click(function () {
        $('#login-modal').css('display', 'none');

        if ($('.popup-overlay').length == 0)
            $('body').append('<div class="popup-overlay"></div>');

        $('#login-modal-reg').toggle('fast');
        return false;
    });

    $('#login-modal-reg .modal__close').click(function () {
        $('#login-modal-reg').css('display', 'none');
        $('.popup-overlay').remove();
        return false;
    });

    $('.open-login').click(function () {
        $('#login-modal-reg').css('display', 'none');

        if ($('.popup-overlay').length == 0)
            $('body').append('<div class="popup-overlay"></div>');

        $('#login-modal').toggle('fast');
        return false;
    });



    // online-bookmakers.ru
    // search autocomplete


    $(".search-desktop").submit(function () {

        $(".search__results-desktop").load("/ajax/searchajax", $(".search-desktop").serialize()).show();

        if ($('.popup-overlay').length == 0)
            $('body').append('<div class="popup-overlay"></div>');

        return false;
    });


    $(".search-desktop .search__input").keyup(function () {

        if (this.value.length > 2) {
            $(".search__results-desktop").load("/ajax/searchajax", $(".search-desktop").serialize()).show();

            if ($('.popup-overlay').length == 0)
                $('body').append('<div class="popup-overlay"></div>');

        } else {
            $(".search__results-desktop").hide();
        }

    });


    $(".search-mobile").submit(function () {

        $(".search__results-mobile").load("/ajax/searchajax", $(".search-mobile").serialize()).show();

        return false;
    });


    $(".search-mobile .search__input").keyup(function () {

        if (this.value.length > 2) {
            $(".search__results-mobile").load("/ajax/searchajax", $(".search-mobile").serialize()).show();
        } else {
            $(".search__results-mobile").hide();
        }

    });


    // click outside popups
    $(window).click(function () {
        $('#login-modal').css('display', 'none');
        $('#login-modal-reg').css('display', 'none');
        $('.popup-overlay').remove();
        $('.gift-text').css('display', 'none');
        $(".search__results-desktop").hide();
        $('.forecast-table-tooltip').css('display', 'none');
        $('.forecast-table-tooltip-bet-value').css('display', 'none');
    });

    $('.modal__dialog, .gift-text, .header__search-wrap, .forecast-table-tooltip, .forecast-table-tooltip-bet-value').click(function (event) {
        event.stopPropagation();
    });

    // online-bookmakers.ru
    // login form ajax

    // todo:
    // preloader

    $('.loginLoginForm').submit(function () {

        let thisUrl = $(location).attr('href');

        let thisModal = $(this).parent().parent();

        let loginField = $('.loginUsername');
        let passwordField = $('.loginPassword');


        // client side validation

        if (loginField.val() == '') {
            $.jGrowl('Введите E-mail', { theme: 'tickets-message-error' });

            $(thisModal).addClass("shake");
            setTimeout(function () { $(thisModal).removeClass("shake"); }, 500);

            return false;
        }

        if (passwordField.val() == '') {
            $.jGrowl('Введите пароль', { theme: 'tickets-message-error' });

            $(thisModal).addClass("shake");
            setTimeout(function () { $(thisModal).removeClass("shake"); }, 500);

            return false;
        }

        $.ajax({
            type: "POST",
            cache: false,
            url: 'ajax/login',
            data: $(this).serializeArray(),

            beforeSend: function () {

                $(loginField).prop("disabled", true);
                $(passwordField).prop("disabled", true);
                $('.loginLoginButton input').prop("disabled", true);

            },

            success: function (response) {

                // server side validation

                let responseError = $(response).find('.loginMessage .error').text();

                if (responseError != '') {
                    $.jGrowl(responseError, { theme: 'tickets-message-error' });
                    $(thisModal).addClass("shake");
                    setTimeout(function () { $(thisModal).removeClass("shake"); }, 500);
                } else {
                    window.location = thisUrl;
                }

            },

            complete: function () {
                $(loginField).prop("disabled", false);
                $(passwordField).prop("disabled", false);
                $('.loginLoginButton input').prop("disabled", false);
            }

        });

        return false;
    });




    // online-bookmakers.ru
    // register form ajax

    // todo:

    // preloader


    $('.register-form').submit(function () {

        let thisUrl = $(location).attr('href');

        let loginField = $('#reg-email');
        let passField = $('#reg-password');
        let passConfField = $('#reg-password-confirm');
        let nameField = $('#reg-fullname');
        //let recaptchaField = $('#g-recaptcha-response');


        // client side validation

        if (loginField.val() == '') {
            $.jGrowl('Введите E-mail', { theme: 'tickets-message-error' });
            return false;
        }

        if (passField.val() == '') {
            $.jGrowl('Введите пароль', { theme: 'tickets-message-error' });
            return false;
        }

        if (passConfField.val() == '') {
            $.jGrowl('Введите пароль ещё раз', { theme: 'tickets-message-error' });
            return false;
        }

        if (passField.val() != passConfField.val()) {
            $.jGrowl('Пароли не совпадают', { theme: 'tickets-message-error' });
            return false;
        }


        $.ajax({
            type: "POST",
            cache: false,
            url: 'ajax/register',
            data: {
                email: loginField.val(),
                password: passField.val(),
                password_confirm: passConfField.val(),
                fullname: nameField.val(),
                registerbtn: 'Регистрация',
                nospam: '',
                //'g-recaptcha-response': recaptchaField.val()
            },

            success: function (response) {

                // server side validation

                let responseErrorEmail = $(response).filter('.error-email').text();

                let responseErrorPass = $(response).filter('.error-password').text();

                let responseErrorConfPass = $(response).filter('.error-cpassword').text();

                //let responseErrorCaptcha = $(response).find('.error-captcha').text();

                if (responseErrorEmail != '') {
                    $.jGrowl(responseErrorEmail, { theme: 'tickets-message-error' });
                    return false;
                }

                if (responseErrorPass != '') {
                    $.jGrowl('Пароль: ' + responseErrorPass, { theme: 'tickets-message-error' });
                    return false;
                }

                if (responseErrorConfPass != '') {
                    $.jGrowl(responseErrorConfPass, { theme: 'tickets-message-error' });
                    return false;
                }

                /*
                if (responseErrorCaptcha != '') {
                    $.jGrowl(responseErrorCaptcha, { theme: 'tickets-message-error' });
                    return false;
                }
                */

                if (response == 'regsuccess') {
                    $.jGrowl('Регистрация прошла успешно, теперь вы можете оставлять комментарии', { theme: 'tickets-message-success' });

                    //$('.register-form').trigger("reset");

                    return false;
                }



            }

        });



        return false;
    });


    $('.bookmaker__brand-more').click(function () {


        let thisTr = $(this).parent().parent().parent().parent();
        let nextTr = $(this).parent().parent().parent().parent().next();

        if ($(this).hasClass('expanded'))
            $(this).removeClass('expanded');
        else
            $(this).addClass('expanded');

        $(nextTr).slideToggle(600);

        if ($(this).hasClass('expanded')) {

            $(this).html('<path d="m256 512c-68.378906 0-132.667969-26.628906-181.019531-74.980469-48.351563-48.351562-74.980469-112.640625-74.980469-181.019531s26.628906-132.667969 74.980469-181.019531c48.351562-48.351563 112.640625-74.980469 181.019531-74.980469s132.667969 26.628906 181.019531 74.980469c48.351563 48.351562 74.980469 112.640625 74.980469 181.019531s-26.628906 132.667969-74.980469 181.019531c-48.351562 48.351563-112.640625 74.980469-181.019531 74.980469zm0-472c-119.101562 0-216 96.898438-216 216s96.898438 216 216 216 216-96.898438 216-216-96.898438-216-216-216zm110 195.980469h-220v40h220zm0 0"/>');

            $(thisTr).addClass('bookmakers__table__expanded');


        } else {

            $(this).html('<use xlink:href="static/svg/defs.svg#icon-add"></use>');

            $(thisTr).removeClass('bookmakers__table__expanded');

        }

    });




    $('.top-menu__item_switcher').click(function () {

        $.ajax({
            method: 'POST',
            url: '/ajax/setday',
            data: { setDay: '' }
        }).done(function (status) {

            if (status == 1) {
                $('body').addClass('show-day');
            } else {
                $('body').removeClass('show-day');
            }

        });

    });





    $('.menu__item-link.collapsed').click(function () {

        if ($(this).hasClass('expanded'))
            $(this).removeClass('expanded');
        else
            $(this).addClass('expanded');

        $(this).next().toggle('slow');

        return false;

    });

    $('.collapsible__head').click(function () {

        let thisParentParent = $(this).parent().parent();

        if ($(thisParentParent).hasClass('home__faq'))
            return false;

        let thisParent = $(this).parent();

        if ($(thisParent).hasClass('collapsible_expanded'))
            $(thisParent).removeClass('collapsible_expanded');
        else
            $(thisParent).addClass('collapsible_expanded');

        $(this).next().toggle('fast');

    });


    if (window.location.hash) {

        let hash = window.location.hash.substring(1);

        if (hash == 'comments') {

            $('html,body').animate({ scrollTop: $('.comments').offset().top }, 'slow');

        }

    }



    $('.bookmaker-card__video-player').one('click', function () {

        let $this = $(this);

        $this.html('<iframe src="https://www.youtube.com/embed/' + $this.data("video") + '?autoplay=1" allow="autoplay";></iframe>');

    });


    $(".search__input").focus(function () {
        $("body").addClass("search__focus");
        $(this).parents().find(".search-bar").addClass("search-bar-focus");
        //   $('.search__results').slideDown();
    });

    $(".search__close").on('click', function () {
        $("body").removeClass("search__focus");
        $(".search-bar").removeClass("search-bar-focus");
        $('.search__results').slideUp();
    });



    $('.header__toggle').click(function () {

        $('body').append('<div class="popup-overlay"></div>');

        $('.panel').toggleClass('open');

        return false;
    });

    $('.panel .menu__close').click(function () {

        $('.popup-overlay').remove();
        $('.panel').removeClass('open');

    });


    $(".menu__list .menu__sublist").hide().prev().click(function (e) {
        e.preventDefault();
        $(this).parents(".menu__list").find(".menu__sublist").not(this).slideUp().prev().removeClass("on");
        $(this).next().not(":visible").slideDown().prev().addClass("on");
    });


    $('.robo-info--head').click(function (e) {
        e.preventDefault();
        $(this).toggleClass('open');
        $('.robo__info-detail').slideToggle(600);

    });



    $(".btn").each(function () {
        $(this).click(function () {
            $(this).addClass("autocapper__links--active");
            $(this).siblings().removeClass("autocapper__links--active");
        });
    });

    $(".js_switch-button-1").click(function () {
        $(".js_second-table").hide();
        $(".js_first-table").show();
        return false;
    });

    $(".js_switch-button-2").click(function () {
        $(".js_second-table").show();
        $(".js_first-table").hide();
        return false;
    });


    $('.bookmakers-list__row').hover(
        function () {
            $('.bookmakers-list__row').css('opacity', '0.5');
            $(this).addClass('bookmakers-list__row-hovered');
            $(this).css('opacity', '1');
        }, function () {
            $('.bookmakers-list__row').css('opacity', '1');
            $(this).removeClass('bookmakers-list__row-hovered');
        }
    );

    $(".close-bookmaker-bottom-banner").click(function () {

        $.ajax({
            method: 'POST',
            url: '/ajax/setbottombanner',
            data: { bottomBanner: '' }
        }).done(function () {

        });

        $('.bookmaker-bottom-banner').css('display', 'none');

        return false;
    });

    $(".top-menu__item_gift").click(function () {

        $('.gift-text').slideToggle(300);

        return false;

    });

    // reset circle style on bookmakers table & start animate on window scroll
    $('svg.radial-progress').each(function (index, value) {
        $(this).find($('circle.complete')).removeAttr('style');
    });

    // reset circle style on bookmakers table expanded content & start animate on window scroll
    $('svg.radial-progress2').each(function (index, value) {
        $(this).find($('circle.complete')).removeAttr('style');
    });


    $(window).resize(function () {
        $('.forecasts-competitions-table-header-inner-border').each(function () {
            setForecastBorder($(this));
        })
    })

    let setForecastBorder = function ($border, $li) {
        let $this = $border;
        let $inner = $this.closest('.forecasts-competitions-table-header-inner');
        let $active = $li || $inner.find('li.active');

        let width = $active.outerWidth();
        let color = $active.data('color') || '#fff';

        let left = $active.position().left + $inner.scrollLeft();

        $this.width(width).css({ 'border-color': color, left: left + 'px' }).addClass('ready');

    }

    $('.forecasts-competitions-table-header-inner-border').each(function () {
        setForecastBorder($(this));
    })

    let borderTimeout;

    $('.forecasts-competitions-table-header-inner li').hover(function () {
        clearTimeout(borderTimeout);
        let $this = $(this);
        let $inner = $this.closest('.forecasts-competitions-table-header-inner');
        let $border = $inner.find('.forecasts-competitions-table-header-inner-border');

        setForecastBorder($border, $this)

    }, function () {
        let $this = $(this);
        let $inner = $this.closest('.forecasts-competitions-table-header-inner');
        let $border = $inner.find('.forecasts-competitions-table-header-inner-border');


        borderTimeout = setTimeout(() => {
            setForecastBorder($border)
        }, 150)

    })


    let forecastTableItems = $('.forecasts-competitions-table-home .forecasts-competitions-table-body-list-item');

    $(forecastTableItems).each(function (i, e) {
        //console.log( i + ": " + $(e) );
        if (i >= 5)
            $(e).css('display', 'none');
    });

    $('.forecasts-competitions-table-bet-type-link').mouseenter(function () {

        let thisLink = $(this);

        let gameId = $(thisLink).data('gameid');

        let gameType = $(thisLink).data('gametype');

        let tooltipContainer = $(thisLink).parent().next();

        $('.forecast-table-tooltip').css('display', 'none');
        $('.forecast-table-tooltip-bet-value').css('display', 'none');

        $(tooltipContainer).css('display', 'block');

        $.ajax({
            method: 'POST',
            url: '/ajax/forecasttablecoefs',
            data: { gameId: gameId, gameType: gameType },

        }).done(function (resp) {
            $(tooltipContainer).find('.forecast-table-tooltip-ajax-wrapper').html(resp);
        });

        return false;
    });

    $('.forecast-table-tooltip-close').click(function () {
        $(this).parent().css('display', 'none');
    });

    $('.forecast-table-show-more').click(function () {
    //$('.forecasts-competitions-table').on('click', '.forecast-table-show-more', function (e) {

        //e.preventDefault();
        $('.forecast-table-show-more').prop('disabled', true);
        $('.forecast-table-show-more').text('Загрузка..');

        let forecastTableItemsCount = $('.forecasts-competitions-table .forecasts-competitions-table-body-list-item').length;
        let limit = forecastTableItemsCount + 20;
        
        let sportId = $('.forecast-table-show-more').data('sportid');
        
        let tpl = $('.forecast-table-show-more').data('tpl');
        
        let game = $('.forecast-table-show-more').data('game');

        $.ajax({
            
            url: 'ajax/forecasttableshowmore',
            method: "GET",
            data: { limit: limit, sportId: sportId, tpl: tpl, game: game }
            
        }).done(function (res) {

            $('.forecasts-competitions-table .forecasts-competitions-table-body-list').html(res);

            $('.forecast-table-show-more').prop('disabled', false);

            $('.forecast-table-show-more').text('Показать еще');

            $('.forecasts-competitions-table-bet-type-link').mouseenter(function () {

                let thisLink = $(this);

                let gameId = $(thisLink).data('gameid');

                let gameType = $(thisLink).data('gametype');

                let tooltipContainer = $(thisLink).parent().next();

                $('.forecast-table-tooltip').css('display', 'none');

                $('.forecast-table-tooltip-bet-value').css('display', 'none');

                $(tooltipContainer).css('display', 'block');

                $.ajax({
                    method: 'POST',
                    url: '/ajax/forecasttablecoefs',
                    data: { gameId: gameId, gameType: gameType },

                }).done(function (resp) {
                    $(tooltipContainer).find('.forecast-table-tooltip-ajax-wrapper').html(resp);
                });

                return false;
            });

            $('.forecast-table-tooltip-close').click(function () {
                $(this).parent().css('display', 'none');
            });

            if (forecastTableItemsCount >= 200) {
                $('.forecast-table-show-more').css('display', 'none');
            }

            $(window).click(function () {
                $('.forecast-table-tooltip').css('display', 'none');
            });

            $('.forecast-table-tooltip').click(function (event) {
                event.stopPropagation();
            });


            $('.forecasts-competitions-table-body-list-item-bet').mouseenter(function () {
        
                $('.forecast-table-tooltip').css('display', 'none');
                $('.forecast-table-tooltip-bet-value').css('display', 'none');
                
                $(this).children('.forecast-table-tooltip-bet-value').css('display', 'block');
                
            });


            $(window).click(function () {
                $('.forecast-table-tooltip-bet-value').css('display', 'none');
            });

            $('.forecast-table-tooltip-bet-value').click(function (event) {
                event.stopPropagation();
            });



        });

        return false;
    });


    $('.nav-bar__item').hover(function () {
                
        let thisItem = $(this);
                
        let thisUl = $(thisItem).children('.nav-bar__sub-list');
                
        let thisUlWidth = $(thisItem).children('.nav-bar__sub-list').width();
                
        let thisUl2 = $(thisUl).find('.nav-bar__sub-list');
                
        $(thisUl2).css({ 'left': thisUlWidth });

    });
    
    
    
    $('.forecasts-competitions-table-body-list-item-bet').mouseenter(function () {
        
        $('.forecast-table-tooltip').css('display', 'none');
        $('.forecast-table-tooltip-bet-value').css('display', 'none');
        
        $(this).children('.forecast-table-tooltip-bet-value').css('display', 'block');
        
    });



});


// Activate progress animation on scroll rating table
$(window).scroll(function () {
    $('svg.radial-progress').each(function (index, value) {
        // If svg.radial-progress is approximately 25% vertically into the window when scrolling from the top or the bottom
        if (
            $(window).scrollTop() > $(this).offset().top - ($(window).height() * 0.75) &&
            $(window).scrollTop() < $(this).offset().top + $(this).height() - ($(window).height() * 0.25)
        ) {
            // Get percentage of progress
            percent = $(value).data('percentage');
            // Get radius of the svg's circle.complete
            radius = $(this).find($('circle.complete')).attr('r');
            // Get circumference (2πr)
            circumference = 2 * Math.PI * radius;
            // Get stroke-dashoffset value based on the percentage of the circumference
            strokeDashOffset = circumference - ((percent * circumference) / 100);
            // Transition progress for 1.25 seconds
            $(this).find($('circle.complete')).animate({ 'stroke-dashoffset': strokeDashOffset }, 1250);
        }
    });
}).trigger('scroll');


// Activate progress animation on scroll rating table expanded content

$(window).scroll(function () {
    $('svg.radial-progress2').each(function (index, value) {
        if (
            $(window).scrollTop() > $(this).offset().top - ($(window).height() * 0.75) &&
            $(window).scrollTop() < $(this).offset().top + $(this).height() - ($(window).height() * 0.25)
        ) {
            percent = $(value).data('percentage');
            radius = $(this).find($('circle.complete')).attr('r');
            circumference = 2 * Math.PI * radius;
            strokeDashOffset = circumference - ((percent * circumference) / 100);
            $(this).find($('circle.complete')).animate({ 'stroke-dashoffset': strokeDashOffset }, 1250);
        }
    });
}).trigger('scroll');


/*! svg4everybody v2.0.0 | github.com/jonathantneal/svg4everybody */

!function (a, b) { "function" == typeof define && define.amd ? define([], function () { return a.svg4everybody = b() }) : "object" == typeof exports ? module.exports = b() : a.svg4everybody = b() }(this, function () {/*! svg4everybody v2.0.0 | github.com/jonathantneal/svg4everybody */
    function a(a, b) { if (b) { var c = !a.getAttribute("viewBox") && b.getAttribute("viewBox"), d = document.createDocumentFragment(), e = b.cloneNode(!0); for (c && a.setAttribute("viewBox", c); e.childNodes.length;)d.appendChild(e.firstChild); a.appendChild(d) } } function b(b) { b.onreadystatechange = function () { if (4 === b.readyState) { var c = document.createElement("x"); c.innerHTML = b.responseText, b.s.splice(0).map(function (b) { a(b[0], c.querySelector("#" + b[1].replace(/(\W)/g, "\\$1"))) }) } }, b.onreadystatechange() } function c(c) { function d() { for (var c; c = e[0];) { var j = c.parentNode; if (j && /svg/i.test(j.nodeName)) { var k = c.getAttribute("xlink:href"); if (f && (!g || g(k, j, c))) { var l = k.split("#"), m = l[0], n = l[1]; if (j.removeChild(c), m.length) { var o = i[m] = i[m] || new XMLHttpRequest; o.s || (o.s = [], o.open("GET", m), o.send()), o.s.push([j, n]), b(o) } else a(j, document.getElementById(n)) } } } h(d, 17) } c = c || {}; var e = document.getElementsByTagName("use"), f = "shim" in c ? c.shim : /\bEdge\/12\b|\bTrident\/[567]\b|\bVersion\/7.0 Safari\b/.test(navigator.userAgent) || (navigator.userAgent.match(/AppleWebKit\/(\d+)/) || [])[1] < 537, g = c.validate, h = window.requestAnimationFrame || setTimeout, i = {}; f && d() } return c
});


/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-passiveeventlisteners-webp-setclasses !*/
!function (e, n, A) { function t(e, n) { return typeof e === n } function o() { var e, n, A, o, a, i, l; for (var f in r) if (r.hasOwnProperty(f)) { if (e = [], n = r[f], n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length)) for (A = 0; A < n.options.aliases.length; A++)e.push(n.options.aliases[A].toLowerCase()); for (o = t(n.fn, "function") ? n.fn() : n.fn, a = 0; a < e.length; a++)i = e[a], l = i.split("."), 1 === l.length ? Modernizr[l[0]] = o : (!Modernizr[l[0]] || Modernizr[l[0]] instanceof Boolean || (Modernizr[l[0]] = new Boolean(Modernizr[l[0]])), Modernizr[l[0]][l[1]] = o), s.push((o ? "" : "no-") + l.join("-")) } } function a(e) { var n = u.className, A = Modernizr._config.classPrefix || ""; if (c && (n = n.baseVal), Modernizr._config.enableJSClass) { var t = new RegExp("(^|\\s)" + A + "no-js(\\s|$)"); n = n.replace(t, "$1" + A + "js$2") } Modernizr._config.enableClasses && (n += " " + A + e.join(" " + A), c ? u.className.baseVal = n : u.className = n) } function i(e, n) { if ("object" == typeof e) for (var A in e) f(e, A) && i(A, e[A]); else { e = e.toLowerCase(); var t = e.split("."), o = Modernizr[t[0]]; if (2 == t.length && (o = o[t[1]]), "undefined" != typeof o) return Modernizr; n = "function" == typeof n ? n() : n, 1 == t.length ? Modernizr[t[0]] = n : (!Modernizr[t[0]] || Modernizr[t[0]] instanceof Boolean || (Modernizr[t[0]] = new Boolean(Modernizr[t[0]])), Modernizr[t[0]][t[1]] = n), a([(n && 0 != n ? "" : "no-") + t.join("-")]), Modernizr._trigger(e, n) } return Modernizr } var s = [], r = [], l = { _version: "3.6.0", _config: { classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0 }, _q: [], on: function (e, n) { var A = this; setTimeout(function () { n(A[e]) }, 0) }, addTest: function (e, n, A) { r.push({ name: e, fn: n, options: A }) }, addAsyncTest: function (e) { r.push({ name: null, fn: e }) } }, Modernizr = function () { }; Modernizr.prototype = l, Modernizr = new Modernizr, Modernizr.addTest("passiveeventlisteners", function () { var n = !1; try { var A = Object.defineProperty({}, "passive", { get: function () { n = !0 } }); e.addEventListener("test", null, A) } catch (t) { } return n }); var f, u = n.documentElement, c = "svg" === u.nodeName.toLowerCase(); !function () { var e = {}.hasOwnProperty; f = t(e, "undefined") || t(e.call, "undefined") ? function (e, n) { return n in e && t(e.constructor.prototype[n], "undefined") } : function (n, A) { return e.call(n, A) } }(), l._l = {}, l.on = function (e, n) { this._l[e] || (this._l[e] = []), this._l[e].push(n), Modernizr.hasOwnProperty(e) && setTimeout(function () { Modernizr._trigger(e, Modernizr[e]) }, 0) }, l._trigger = function (e, n) { if (this._l[e]) { var A = this._l[e]; setTimeout(function () { var e, t; for (e = 0; e < A.length; e++)(t = A[e])(n) }, 0), delete this._l[e] } }, Modernizr._q.push(function () { l.addTest = i }), Modernizr.addAsyncTest(function () { function e(e, n, A) { function t(n) { var t = n && "load" === n.type ? 1 == o.width : !1, a = "webp" === e; i(e, a && t ? new Boolean(t) : t), A && A(n) } var o = new Image; o.onerror = t, o.onload = t, o.src = n } var n = [{ uri: "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=", name: "webp" }, { uri: "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==", name: "webp.alpha" }, { uri: "data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA", name: "webp.animation" }, { uri: "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=", name: "webp.lossless" }], A = n.shift(); e(A.name, A.uri, function (A) { if (A && "load" === A.type) for (var t = 0; t < n.length; t++)e(n[t].name, n[t].uri) }) }), o(), a(s), delete l.addTest, delete l.addAsyncTest; for (var d = 0; d < Modernizr._q.length; d++)Modernizr._q[d](); e.Modernizr = Modernizr }(window, document);


/*! jQuery & Zepto Lazy v1.7.9 - http://jquery.eisbehr.de/lazy - MIT&GPL-2.0 license - Copyright 2012-2018 Daniel 'Eisbehr' Kern */
!function (t, e) { "use strict"; function r(r, a, i, u, l) { function f() { L = t.devicePixelRatio > 1, i = c(i), a.delay >= 0 && setTimeout(function () { s(!0) }, a.delay), (a.delay < 0 || a.combined) && (u.e = v(a.throttle, function (t) { "resize" === t.type && (w = B = -1), s(t.all) }), u.a = function (t) { t = c(t), i.push.apply(i, t) }, u.g = function () { return i = n(i).filter(function () { return !n(this).data(a.loadedName) }) }, u.f = function (t) { for (var e = 0; e < t.length; e++) { var r = i.filter(function () { return this === t[e] }); r.length && s(!1, r) } }, s(), n(a.appendScroll).on("scroll." + l + " resize." + l, u.e)) } function c(t) { var i = a.defaultImage, o = a.placeholder, u = a.imageBase, l = a.srcsetAttribute, f = a.loaderAttribute, c = a._f || {}; t = n(t).filter(function () { var t = n(this), r = m(this); return !t.data(a.handledName) && (t.attr(a.attribute) || t.attr(l) || t.attr(f) || c[r] !== e) }).data("plugin_" + a.name, r); for (var s = 0, d = t.length; s < d; s++) { var A = n(t[s]), g = m(t[s]), h = A.attr(a.imageBaseAttribute) || u; g === N && h && A.attr(l) && A.attr(l, b(A.attr(l), h)), c[g] === e || A.attr(f) || A.attr(f, c[g]), g === N && i && !A.attr(E) ? A.attr(E, i) : g === N || !o || A.css(O) && "none" !== A.css(O) || A.css(O, "url('" + o + "')") } return t } function s(t, e) { if (!i.length) return void (a.autoDestroy && r.destroy()); for (var o = e || i, u = !1, l = a.imageBase || "", f = a.srcsetAttribute, c = a.handledName, s = 0; s < o.length; s++)if (t || e || A(o[s])) { var g = n(o[s]), h = m(o[s]), b = g.attr(a.attribute), v = g.attr(a.imageBaseAttribute) || l, p = g.attr(a.loaderAttribute); g.data(c) || a.visibleOnly && !g.is(":visible") || !((b || g.attr(f)) && (h === N && (v + b !== g.attr(E) || g.attr(f) !== g.attr(F)) || h !== N && v + b !== g.css(O)) || p) || (u = !0, g.data(c, !0), d(g, h, v, p)) } u && (i = n(i).filter(function () { return !n(this).data(c) })) } function d(t, e, r, i) { ++z; var o = function () { y("onError", t), p(), o = n.noop }; y("beforeLoad", t); var u = a.attribute, l = a.srcsetAttribute, f = a.sizesAttribute, c = a.retinaAttribute, s = a.removeAttribute, d = a.loadedName, A = t.attr(c); if (i) { var g = function () { s && t.removeAttr(a.loaderAttribute), t.data(d, !0), y(T, t), setTimeout(p, 1), g = n.noop }; t.off(I).one(I, o).one(D, g), y(i, t, function (e) { e ? (t.off(D), g()) : (t.off(I), o()) }) || t.trigger(I) } else { var h = n(new Image); h.one(I, o).one(D, function () { t.hide(), e === N ? t.attr(C, h.attr(C)).attr(F, h.attr(F)).attr(E, h.attr(E)) : t.css(O, "url('" + h.attr(E) + "')"), t[a.effect](a.effectTime), s && (t.removeAttr(u + " " + l + " " + c + " " + a.imageBaseAttribute), f !== C && t.removeAttr(f)), t.data(d, !0), y(T, t), h.remove(), p() }); var m = (L && A ? A : t.attr(u)) || ""; h.attr(C, t.attr(f)).attr(F, t.attr(l)).attr(E, m ? r + m : null), h.complete && h.trigger(D) } } function A(t) { var e = t.getBoundingClientRect(), r = a.scrollDirection, n = a.threshold, i = h() + n > e.top && -n < e.bottom, o = g() + n > e.left && -n < e.right; return "vertical" === r ? i : "horizontal" === r ? o : i && o } function g() { return w >= 0 ? w : w = n(t).width() } function h() { return B >= 0 ? B : B = n(t).height() } function m(t) { return t.tagName.toLowerCase() } function b(t, e) { if (e) { var r = t.split(","); t = ""; for (var a = 0, n = r.length; a < n; a++)t += e + r[a].trim() + (a !== n - 1 ? "," : "") } return t } function v(t, e) { var n, i = 0; return function (o, u) { function l() { i = +new Date, e.call(r, o) } var f = +new Date - i; n && clearTimeout(n), f > t || !a.enableThrottle || u ? l() : n = setTimeout(l, t - f) } } function p() { --z, i.length || z || y("onFinishedAll") } function y(t, e, n) { return !!(t = a[t]) && (t.apply(r, [].slice.call(arguments, 1)), !0) } var z = 0, w = -1, B = -1, L = !1, T = "afterLoad", D = "load", I = "error", N = "img", E = "src", F = "srcset", C = "sizes", O = "background-image"; "event" === a.bind || o ? f() : n(t).on(D + "." + l, f) } function a(a, o) { var u = this, l = n.extend({}, u.config, o), f = {}, c = l.name + "-" + ++i; return u.config = function (t, r) { return r === e ? l[t] : (l[t] = r, u) }, u.addItems = function (t) { return f.a && f.a("string" === n.type(t) ? n(t) : t), u }, u.getItems = function () { return f.g ? f.g() : {} }, u.update = function (t) { return f.e && f.e({}, !t), u }, u.force = function (t) { return f.f && f.f("string" === n.type(t) ? n(t) : t), u }, u.loadAll = function () { return f.e && f.e({ all: !0 }, !0), u }, u.destroy = function () { return n(l.appendScroll).off("." + c, f.e), n(t).off("." + c), f = {}, e }, r(u, l, a, f, c), l.chainable ? a : u } var n = t.jQuery || t.Zepto, i = 0, o = !1; n.fn.Lazy = n.fn.lazy = function (t) { return new a(this, t) }, n.Lazy = n.lazy = function (t, r, i) { if (n.isFunction(r) && (i = r, r = []), n.isFunction(i)) { t = n.isArray(t) ? t : [t], r = n.isArray(r) ? r : [r]; for (var o = a.prototype.config, u = o._f || (o._f = {}), l = 0, f = t.length; l < f; l++)(o[t[l]] === e || n.isFunction(o[t[l]])) && (o[t[l]] = i); for (var c = 0, s = r.length; c < s; c++)u[r[c]] = t[0] } }, a.prototype.config = { name: "lazy", chainable: !0, autoDestroy: !0, bind: "load", threshold: 500, visibleOnly: !1, appendScroll: t, scrollDirection: "both", imageBase: null, defaultImage: "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==", placeholder: null, delay: -1, combined: !1, attribute: "data-src", srcsetAttribute: "data-srcset", sizesAttribute: "data-sizes", retinaAttribute: "data-retina", loaderAttribute: "data-loader", imageBaseAttribute: "data-imagebase", removeAttribute: !0, handledName: "handled", loadedName: "loaded", effect: "show", effectTime: 0, enableThrottle: !0, throttle: 250, beforeLoad: e, afterLoad: e, onError: e, onFinishedAll: e }, n(t).on("load", function () { o = !0 }) }(window);

/*! jQuery & Zepto Lazy - Picture Plugin v1.3 - http://jquery.eisbehr.de/lazy - MIT&GPL-2.0 license - Copyright 2012-2018 Daniel 'Eisbehr' Kern */
!function (t) { function e(e, a, n) { var o = e.prop("attributes"), c = t("<" + a + ">"); return t.each(o, function (t, e) { "srcset" !== e.name && e.name !== i || (e.value = r(e.value, n)), c.attr(e.name, e.value) }), e.replaceWith(c), c } function a(e, a, r) { var i = t("<img>").one("load", function () { r(!0) }).one("error", function () { r(!1) }).appendTo(e).attr("src", a); i.complete && i.load() } function r(t, e) { if (e) { var a = t.split(","); t = ""; for (var r = 0, i = a.length; r < i; r++)t += e + a[r].trim() + (r !== i - 1 ? "," : "") } return t } var i = "data-src"; t.lazy(["pic", "picture"], ["picture"], function (n, o) { if ("picture" === n[0].tagName.toLowerCase()) { var c = n.find(i), s = n.find("data-img"), u = this.config("imageBase") || ""; c.length ? (c.each(function () { e(t(this), "source", u) }), 1 === s.length ? (s = e(s, "img", u), s.on("load", function () { o(!0) }).on("error", function () { o(!1) }), s.attr("src", s.attr(i)), this.config("removeAttribute") && s.removeAttr(i)) : n.attr(i) ? (a(n, u + n.attr(i), o), this.config("removeAttribute") && n.removeAttr(i)) : o(!1)) : n.attr("data-srcset") ? (t("<source>").attr({ media: n.attr("data-media"), sizes: n.attr("data-sizes"), type: n.attr("data-type"), srcset: r(n.attr("data-srcset"), u) }).appendTo(n), a(n, u + n.attr(i), o), this.config("removeAttribute") && n.removeAttr(i + " data-srcset data-media data-sizes data-type")) : o(!1) } else o(!1) }) }(window.jQuery || window.Zepto);



function loadScript(src) {
    var s = document.createElement('script')
    s.src = src
    document.body.appendChild(s)
}


/*! Passive event listeners !*/
/*
document.addEventListener("touchstart", function(e) {
    // console.log(e.defaultPrevented);  // will be false
    e.preventDefault();   // does nothing since the listener is passive
    // console.log(e.defaultPrevented);  // still false
}, Modernizr.passiveeventlisteners ? {passive: true} : false);
*/


$(document).ready(function () {

    // NAVBAR
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 60) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // STATS COUNTER
    var statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;
        var statsSection = $('.stats-bar');
        if (!statsSection.length) return;
        var sectionTop = statsSection.offset().top;
        var scrollBottom = $(window).scrollTop() + $(window).height();
        if (scrollBottom > sectionTop + 100) {
            statsAnimated = true;
            $('.stat-number').each(function () {
                var $el = $(this);
                var target = parseInt($el.attr('data-target'));
                var duration = 1800;
                var stepTime = 16;
                var steps = duration / stepTime;
                var increment = target / steps;
                var current = 0;
                var timer = setInterval(function () {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    $el.text(Math.floor(current));
                }, stepTime);
            });
        }
    }

    $(window).on('scroll', animateStats);
    animateStats();

    // SCROLL REVEAL
    function revealOnScroll() {
        $('.reveal').each(function () {
            var elemTop = $(this).offset().top;
            var scrollBottom = $(window).scrollTop() + $(window).height();
            if (scrollBottom > elemTop + 60) {
                $(this).addClass('visible');
            }
        });
    }

    $('.why-item, .stat-item, .property-card').addClass('reveal');
    $(window).on('scroll', revealOnScroll);
    revealOnScroll();

    // PROPERTY CARD CLICK - reveals hidden details
    $('.property-card').on('click', function () {
        var $card = $(this);
        var $details = $card.find('.card-details');
        var $hint = $card.find('.click-hint');
        var isOpen = $card.hasClass('card-open');

        $('.property-card').not($card).each(function () {
            $(this).removeClass('card-open');
            $(this).find('.card-details').slideUp(250);
            $(this).find('.click-hint').text('Click to reveal details');
        });

        if (isOpen) {
            $card.removeClass('card-open');
            $details.slideUp(300);
            $hint.text('Click to reveal details');
        } else {
            $card.addClass('card-open');
            $details.slideDown(300);
            $hint.text('Click to hide details');
        }
    });

    // LOCALSTORAGE - greeting message in hero
    var savedName = localStorage.getItem('pe_username');

    if (savedName && $('#userGreeting').length) {
        $('#userGreeting').text('Welcome back, ' + savedName + ' ✦');
    } else if ($('#userGreeting').length) {
        var hour = new Date().getHours();
        var greeting;
        if (hour < 12) {
            greeting = 'Good morning — Welcome to Prime Estates';
        } else if (hour < 18) {
            greeting = 'Good afternoon — Welcome to Prime Estates';
        } else {
            greeting = 'Good evening — Welcome to Prime Estates';
        }
        setTimeout(function () {
            $('#userGreeting').fadeIn(600).text(greeting);
        }, 500);
    }

    // NAVBAR FADE IN on page load
    $('.navbar').hide().fadeIn(600);

});

// VALUE CARD CLICK - about page
    $('.value-card').on('click', function () {
        var $card = $(this);
        var $detail = $card.find('.value-detail');
        var $hint = $card.find('.click-hint');
        var isOpen = $card.hasClass('card-open');

        $('.value-card').not($card).each(function () {
            $(this).removeClass('card-open');
            $(this).find('.value-detail').slideUp(250);
            $(this).find('.click-hint').text('Click to read more');
        });

        if (isOpen) {
            $card.removeClass('card-open');
            $detail.slideUp(300);
            $hint.text('Click to read more');
        } else {
            $card.addClass('card-open');
            $detail.slideDown(300);
            $hint.text('Click to close');
        }
    });

    // TEAM CARD CLICK - about page
    $('.team-card').on('click', function () {
        var $card = $(this);
        var $detail = $card.find('.team-detail');
        var $hint = $card.find('.click-hint');
        var isOpen = $card.hasClass('card-open');

        $('.team-card').not($card).each(function () {
            $(this).removeClass('card-open');
            $(this).find('.team-detail').slideUp(250);
            $(this).find('.click-hint').text('Click to learn more');
        });

        if (isOpen) {
            $card.removeClass('card-open');
            $detail.slideUp(300);
            $hint.text('Click to learn more');
        } else {
            $card.addClass('card-open');
            $detail.slideDown(300);
            $hint.text('Click to close');
        }
    });


    $('#message').on('input', function () {
        var length = $(this).val().length;
        $('#charCount').text(length + ' / 500 characters');
        if (length > 500) {
            $('#charCount').css('color', '#DC2626');
        } else {
            $('#charCount').css('color', '#6B7280');
        }
    });

    // Function 
    function validateField($input) {
        var id = $input.attr('id');
        var value = $input.val().trim();
        var errorId = '#' + id + 'Error';
        var isValid = true;
        var message = '';

        // Different rules for each field
        switch (id) {
            case 'firstName':
            case 'lastName':
                if (value === '') {
                    message = 'This field is required.';
                    isValid = false;
                } else if (value.length < 2) {
                    message = 'Must be at least 2 characters.';
                    isValid = false;
                }
                break;

            case 'email':
                var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (value === '') {
                    message = 'Email address is required.';
                    isValid = false;
                } else if (!emailRegex.test(value)) {
                    message = 'Please enter a valid email address.';
                    isValid = false;
                }
                break;

            case 'phone':
                var phoneRegex = /^[\d\s\+\-\(\)]{7,15}$/;
                if (value === '') {
                    message = 'Phone number is required.';
                    isValid = false;
                } else if (!phoneRegex.test(value)) {
                    message = 'Please enter a valid phone number.';
                    isValid = false;
                }
                break;

            case 'enquiryType':
                if (value === '') {
                    message = 'Please select an enquiry type.';
                    isValid = false;
                }
                break;

            case 'message':
                if (value === '') {
                    message = 'Please enter your message.';
                    isValid = false;
                } else if (value.length < 10) {
                    message = 'Message must be at least 10 characters.';
                    isValid = false;
                } else if (value.length > 500) {
                    message = 'Message must not exceed 500 characters.';
                    isValid = false;
                }
                break;
        }


        if (isValid) {
            $input.removeClass('error');
            $(errorId).text('');
        } else {
            $input.addClass('error');
            $(errorId).text(message);
        }

        return isValid;
    }

    // Validate field when user leaves it
    $('#firstName, #lastName, #email, #phone, #enquiryType, #message').on('blur', function () {
        validateField($(this));
    });

    // Clear error while user is typing
    $('#firstName, #lastName, #email, #phone, #enquiryType, #message').on('input change', function () {
        if ($(this).hasClass('error')) {
            validateField($(this));
        }
    });

    // Form submit
    $('#contactForm').on('submit', function (e) {
        e.preventDefault(); // stops page refreshing

        var allValid = true;

        // Validate all required fields
        var fields = ['#firstName', '#lastName', '#email', '#phone', '#enquiryType', '#message'];
        fields.forEach(function (selector) {
            var result = validateField($(selector));
            if (!result) allValid = false;
        });

        // Validate consent checkbox
        if (!$('#consent').is(':checked')) {
            $('#consentError').text('You must agree to continue.');
            allValid = false;
        } else {
            $('#consentError').text('');
        }

        // If any field failed stop here
        if (!allValid) {
            var firstError = $('.error').first();
            if (firstError.length) {
                $('html, body').animate({
                    scrollTop: firstError.offset().top - 120
                }, 400);
            }
            return;
        }

        // Save first name to localStorage
        var firstName = $('#firstName').val().trim();
        if (firstName) {
            localStorage.setItem('pe_username', firstName);
        }

        // Simulate sending
        var $btn = $('#submitBtn');
        $btn.text('Sending...').prop('disabled', true);

        setTimeout(function () {
            $('#contactForm')[0].reset();
            $('#charCount').text('0 / 500 characters');
            $('#formSuccess').fadeIn(400);
            $btn.text('Send Message').prop('disabled', false);
            $('html, body').animate({
                scrollTop: $('#formSuccess').offset().top - 120
            }, 400);
        }, 1200);
    });

    // COOKIE - newsletter preference
   

    function setCookie(name, value, days) {
        var expires = '';
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + value + expires + '; path=/';
    }

    function getCookie(name) {
        var nameEQ = name + '=';
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var c = cookies[i].trim();
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length);
            }
        }
        return null;
    }

    // Restore newsletter checkbox from cookies
    if (getCookie('pe_newsletter') === 'yes') {
        $('#newsletter').prop('checked', true);
    }

    // Save newsletter preference to cookie
    $('#newsletter').on('change', function () {
        if ($(this).is(':checked')) {
            setCookie('pe_newsletter', 'yes', 30);
        } else {
            setCookie('pe_newsletter', 'no', 30);
        }
    });
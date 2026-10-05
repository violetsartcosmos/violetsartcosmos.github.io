$(document).ready(function() {
    $('.clickable').on('click', function(event) {
        var target = $($(this).attr('href'));
        if (!target.length) {
            return;
        }
        event.preventDefault();
        $('html, body').animate({ scrollTop: target.offset().top }, 1000);
    });

    particlesJS.load('particles-js', './public/javascripts/particles.json', function() {
        console.log('callback - particles.js config loaded');
    });

    $('#contact-form').on('submit', function(event) {
        event.preventDefault();
        var hidden = $('#hidden-field').val();
        var email = $('#email').val();
        var message = $('#message').val();
        var subject = $('#subject').val();

        $('.empty').empty();
        if (hidden !== '') {
            return;
        }
        if (!email) {
            $('#email-empty').text('Please add your email');
        } else if (!subject) {
            $('#subject-empty').text('Please add a subject!');
        } else if (!message) {
            $('#message-empty').text('Please add a message!');
        } else {
            $.ajax({
                url: 'https://formspree.io/bixicodes@gmail.com',
                type: 'post',
                data: { _subject: subject, _replyto: email, message: message },
                dataType: 'json',
                success: function() {
                    $('#contact-form')[0].reset();
                    $('#contact-sent').html('<p class="red-text"><em>Sent email!</em></p>');
                },
                error: function() {
                    $('#contact-sent').html('<p class="red-text"><em>Could not send email. Please try again.</em></p>');
                }
            });
        }
    });
});

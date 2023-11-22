import {
    loginUser
} from '../controllers/user.js';

$(document).ready(function () {
    const form = $('#login-form');

    form.on('submit', async function (e) {
        e.preventDefault();

        const email = $('#email1').val();
        const password = $('#password1').val();

        try {
            const responseData = await loginUser(email, password);

            $('#email1').val('');
            $('#password1').val('');
            if (responseData) {
                location.assign('./../views/producto.html');
            }
        } catch (error) {
            if (error.email) {
                displayErrorMessage(error.email, 'password1');
            } else {
                console.log("Unexpected error structure received from the server:", error);
            }
        }
    });

    function displayErrorMessage(message, location) {
        const errorMessageDiv = $('<div>')
            .text(message)
            .addClass('error-message')
            .css('color', 'red');

        $('#' + location).after(errorMessageDiv);
    }

    function clearErrorMessages() {
        // Remove any existing error messages
        $('.error-message').each(function () {
            $(this).remove();
        });
    }

});
import {
    createUser
} from '../controllers/user.js';
import {
    createUserModel
} from '../models/user.js';

$(document).ready(function () {
    const form = $('#user-form');

    form.on('submit', async function (e) {
        e.preventDefault();

        clearErrorMessages();

        const name = $('#name1').val();
        const last_name = $('#lastName1').val();
        const email = $('#email1').val();
        const password = $('#Password1').val();
        const confirmed_password = $('#Password2').val();


        if (password !== confirmed_password) {
            displayErrorMessage('Passwords do not match', 'Password2');
            return;
        }

        const userModel = createUserModel(name, last_name, email, password);

        try {
            const responseData = await createUser(userModel);
            alert('User added correctly');
            window.location.href = '../views/login.html';

        } catch (error) {
            // Check if the error is a JSON object
            if (error.email) {
                displayErrorMessage(error.email, 'email1');
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
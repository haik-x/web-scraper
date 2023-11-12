import { loginUser } from '../controllers/user.js';

$(document).ready(function () {
    const form = $('#login-form');

    form.on('submit', async function (e) {
        e.preventDefault();

        const email = $('#email1').val();
        const password = $('#password1').val();

        try {
            const responseData = await loginUser(email, password);
            window.location.href = '../views/index.html';
        } catch (error) {
            alert('Something went wrong');
            console.error(error);
        }
    });
});


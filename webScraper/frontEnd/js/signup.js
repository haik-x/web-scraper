/*$(document).ready(function (){
    const apiURL = "http://localhost:3000/";

    function crearEmpleado(e) {
        //use el eveto porque quiero detener el submit
        e.preventDefault(); //evito que se vaya a localhost:3000
        console.log("Vamos a crear al empleado");

        const name = $('#name1').val();
        const last_name = $('#lastName1').val();
        const email = $('#email').val();
        const password = $('#Password1').val();
        const confirmed_password = $('#Password2').val();
       
        
        const data = {
            name,
            last_name,
            email,
            password,
            confirmed_password
        };
    
        $.ajax({
            contentType: 'application/json',
            data:JSON.stringify(data),
            dataType: 'json',
            success: function(data){
                alert('User added correctly')
                window.location.href = '../html/login.html';
            },
            error: function() {
                alert('Something went wrong')
            },
            processData: false,
            type: 'POST',
            url: `${apiURL}user`
        })

        $('#user-form :input').val('');
    }

    //este tipo de convencion te hace saber que es el wrapper (elemento de jquery) y no un html
    //const $form = $('form').eq(0)

    const form = $('form')[0];
    form.addEventListener('submit', crearEmpleado);
})*/

// scripts/signup.js
import { createUser } from '../controllers/user.js';
import { createUserModel } from '../models/user.js';

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
            displayErrorMessage('Passwords do not match');
            return;
        }

        const userModel = createUserModel(name, last_name, email, password);

        try {
            const responseData = await createUser(userModel);

            // Handle the response as needed
            alert('User added correctly');
            window.location.href = '../views/login.html';
        } catch (error) {
            alert('Something went wrong');
            console.error(error);
        }

        $('#user-form :input').val('');
    });

    function displayErrorMessage(message) {
        // Create a div element for the error message
        const errorMessageDiv = $('<div>').text(message).addClass('error-message');

        // Append the error message div after the confirmed password input
        $('#Password2').after(errorMessageDiv);
    }

    function clearErrorMessages() {
    // Remove any existing error messages
        $('.error-message').each(function() {
        $(this).remove();
    });
}
});

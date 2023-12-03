$(document).ready(function () {
    const form = $("#contact-form");
    const username = $("#username");
    const email = $("#email");
    const message = $("#message");

    form.on('submit', async function (e) {
        e.preventDefault();
        checkInputs();

        if (!username.hasClass("error") && !email.hasClass("error") && !message.hasClass("error")) {
            const bodyMesssage = `Name: ${username.val()} <br> Email: ${email.val()} <br> Message: ${message.val()}`; // Updated variable name

            Email.send({
                SecureToken: "a2c1beca-4507-4bbe-86b1-b37f9415446a",
                To: 'pweb1384@gmail.com',
                From: "pweb1384@gmail.com",
                Subject: "Contact Request",
                Body: bodyMesssage
            }).then(
                message => {
                    if (message === "OK") {
                        Swal.fire({
                            title: "OK!",
                            text: "¡Mensaje enviado con éxito!",
                            icon: "success",
                            confirmButtonColor: '#00008b'
                        });
                    }
                }
            );

            form[0].reset();
            return false;
        }
    });
});

function checkInputs() {
    const items = $(".form-control");

    items.each(function () {
        $(this).on("input", function () {
            validateInput($(this));
        });

        validateInput($(this));
    });

    function validateInput(input) {
        if (input.val().trim() === "") {
            input.addClass("error");
            input.parent().addClass("error");
        } else {
            input.removeClass("error");
            input.parent().removeClass("error");
        }
    }
}
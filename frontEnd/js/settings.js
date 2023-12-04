import {
    updateUser
} from '../controllers/user.js';

document.addEventListener('DOMContentLoaded', async function () {

    try {
        // Fetch user data to populate the form
        const response = await fetch('/user/settings');
        if (response.status === 200) {
            const userData = await response.json();
            // Update the DOM
            $('#username').val(userData.username || '');
            $('#name').val(userData.name || '');
            $('#email').val(userData.email || '');
            $('#biography').val(userData.biography || '');
            $('#birth-date').val(userData.birth || '');
            $('#country').val(userData.country || '');
            $('#phone').val(userData.phone || '');
            $('#webpage').val(userData.webpage || '');
            $('#twitter').val(userData.twitter || '');
            $('#tiktok').val(userData.tiktok || '');
            $('#instagram').val(userData.instagram || '');
            $('#p-img').attr('src', userData.profileImage ? 'http://localhost:3000' + userData.profileImage : "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png");

            $('#profile-img').on('change', function (e) {
                const fileInput = e.target;

                if (fileInput.files && fileInput.files[0]) {

                    const reader = new FileReader();

                    reader.onload = function (e) {
                        // Update the image source
                        $('#p-img').attr('src', e.target.result);
                    };

                    reader.readAsDataURL(fileInput.files[0]);
                }
            });

            $('#user-settings-form').on('submit', async function (e) {
                e.preventDefault();
                console.log("Hola")

                const formData = new FormData(this);

                formData.append('username', $('#username').val());
                formData.append('name', $('#name').val());
                formData.append('email', $('#email').val());
                formData.append('biography', $('#biography').val());
                formData.append('birth', $('#birth-date').val());
                formData.append('country', $('#country').val());
                formData.append('phone', $('#phone').val());
                formData.append('webpage', $('#webpage').val());
                formData.append('twitter', $('#twitter').val());
                formData.append('tiktok', $('#tiktok').val());
                formData.append('instagram', $('#instagram').val());
                formData.append('profileImage', $('#profile-img')[0].files[0]);


                for (const entry of formData.entries()) {
                    console.log(entry);
                }

                try {
                    // Send the FormData to the server
                    const updateResponse = await updateUser(formData);
                    console.log('User information and image updated successfully:', updateResponse);
                    location.reload();
                } catch (updateError) {
                    console.error('Error updating user information:', updateError);
                }
            });

            $('#cancel-btn').on('click', function () {
                location.assign('./../views/producto.html');
            })

        } else if (response.status === 401) {
            // Redirect to the login page if the user is not authenticated
            window.location.href = '/';
        } else {
            console.error('Unexpected status code:', response.status);
        }

    } catch (error) {
        console.error('Error fetching user information:', error);
    }
});
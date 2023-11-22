// settings.js

document.addEventListener('DOMContentLoaded', async function () {
    try {
        const response = await fetch('/user/settings');
        if (response.status === 200) {
            const userData = await response.json();

            // Use the user information as needed
            console.log('User Information:', userData);

            // Update the DOM with user-specific content

        } else if (response.status === 401) {
            // Redirect to the login page if the user is not authenticated
            window.location.href = '/login';
        } else {
            // Handle other status codes if needed
            console.error('Unexpected status code:', response.status);
        }

    } catch (error) {
        console.error('Error fetching user information:', error);
    }
});

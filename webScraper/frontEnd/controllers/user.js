export async function createUser(data) {
    try {
        const response = await $.ajax({
            contentType: 'application/json',
            data: JSON.stringify(data),
            dataType: 'json',
            processData: false,
            type: 'POST',
            url: 'http://localhost:3000/user'
        });
        return response; // might want to return something late (?)
    } catch (error) {
        if (error.responseJSON && error.responseJSON.errors) {
            throw error.responseJSON.errors;
        } else {
            throw error;
        }

    }
}


export async function loginUser(email, password) {
    try {
        const response = await $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/user/login',
            contentType: 'application/json',
            data: JSON.stringify({
                email,
                password
            }),
            dataType: 'json'
        });
        if (response && response.user) {
            return response.user;
        } else {
            // Handle unexpected response format
            throw new Error('Unexpected response from the server');
        }
    } catch (error) {
        if (error.responseJSON && error.responseJSON.errors) {
            throw error.responseJSON.errors;
        } else {
            throw error;
        }
    }
}




export async function updateUser(formData) {
    // Make an HTTP request to the server to handle the file upload and user update

    for (const entry of formData.entries()) {
        console.log(entry);
    }
    const response = await fetch('http://localhost:3000/user/update', {
        method: 'PUT', // Use PUT for updates
        body: formData,
    });

    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Failed to update user information and image');
    }
}

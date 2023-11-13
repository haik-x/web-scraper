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
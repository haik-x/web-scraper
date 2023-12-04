export async function createUser(data) {
    try {
        const response = await $.ajax({
            contentType: 'application/json',
            data: JSON.stringify(data),
            dataType: 'json',
            processData: false,
            type: 'POST',
            url: 'https://scraper-back.onrender.com/user'
        });
        return response;
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
            url: 'https://scraper-back.onrender.com/user/login',
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

export async function logoutUser() {
    try {
        const response = await $.ajax({
            type: 'GET',
            url: 'https://scraper-back.onrender.com/user/logout'
        });
        if (response) {
            return response;
        } else {
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

    for (const entry of formData.entries()) {
        console.log(entry);
    }
    const response = await fetch('https://scraper-back.onrender.com/user/update', {
        method: 'PUT',
        body: formData,
    });

    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Failed to update user information and image');
    }
}

export async function getFriends() {
    try {
        const response = await $.ajax({
            contentType: 'application/json',
            type: 'GET',
            url: 'https://scraper-back.onrender.com/users'
        });
        return response;
    } catch (error) {
        if (error.responseJSON && error.responseJSON.errors) {
            throw error.responseJSON.errors;
        } else {
            throw error;
        }
    }
}

export async function addFriend(email) {
    try {
        const response = await $.ajax({
            contentType: 'application/json',
            type: 'POST',
            url: 'https://scraper-back.onrender.com/user/addfriend',
            data: JSON.stringify({
                'friendEmail': email
            }),
            dataType: 'json'
        });
        return response;
    } catch (error) {
        if (error.responseJSON && error.responseJSON.errors) {
            throw error.responseJSON.errors;
        } else {
            throw error;
        }
    }
}
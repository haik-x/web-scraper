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
        throw error; // Propagate the error 
    }
}


export async function loginUser(email, password) {
    try {
        const response = await $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/user/login',
            contentType: 'application/json',
            data: JSON.stringify({ email, password }),
            dataType: 'json',
        });
        return response; 
    } catch (error) {
        throw error; 
    }
}



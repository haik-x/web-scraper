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

        return response; // You might want to return something useful here
    } catch (error) {
        throw error; // Propagate the error for handling in the calling function
    }
}

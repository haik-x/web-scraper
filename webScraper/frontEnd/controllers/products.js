export async function getProducts() {
    try {
        const response = await $.ajax({
            contentType: 'application/json',
            type: 'GET',
            url: 'http://localhost:3000/product/user'
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
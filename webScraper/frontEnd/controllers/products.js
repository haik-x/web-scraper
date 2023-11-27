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

export async function addProduct(data) {
    try {
        const response = await $.ajax({
            contentType: 'application/json',
            data: JSON.stringify(data),
            dataType: 'json',
            processData: false,
            type: 'POST',
            url: 'http://localhost:3000/product'
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

export async function deleteProduct(id) {
    try {
        const response = await $.ajax({
            contentType: 'application/json',
            type: 'DELETE',
            url: 'http://localhost:3000/product/' + id
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

export async function updateProduct(id) {
    try {
        const response = await $.ajax({
            contentType: 'application/json',
            type: 'PUT',
            url: 'http://localhost:3000/product/' + id
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

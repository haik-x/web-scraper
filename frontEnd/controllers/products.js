export async function getProducts(includeFriends) {
    try {
        let includeParam = '';
        if (includeFriends) {
            includeParam = '?includeFriend=true';
        }
        const response = await $.ajax({
            contentType: 'application/json',
            type: 'GET',
            url: 'https://scraper-back.onrender.com/product/user' + includeParam
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
            url: 'https://scraper-back.onrender.com/product'
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

export async function deleteProduct(id) {
    try {
        const response = await $.ajax({
            contentType: 'application/json',
            type: 'DELETE',
            url: 'https://scraper-back.onrender.com/product/' + id
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
            url: 'https://scraper-back.onrender.com/product/' + id
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
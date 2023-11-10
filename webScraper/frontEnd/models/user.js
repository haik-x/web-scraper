export function createUserModel(name, last_name, email, password, confirmed_password) {
    return {
        name,
        last_name,
        email,
        password,
        confirmed_password
    };
}

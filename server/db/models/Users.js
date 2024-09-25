const auth = require('../../middleware/auth');


class UserTable {
    constructor() {
        this.users = [];
    }

    validate({ email, password1, password2 }) {
        if (!email) {
            return [false, "Must supply an email."]
        }
        if (!password1) {
            return [false, "Must supply a password."]
        }
        if (password1 != password2) {
            return [false, "Passwords don't match."];
        }
        if (this.users.map(a => a.email).includes(email)) {
            return [false, "User already exists."];
        }
        return [true, "Success"];
    }

    get(email) {
        for (let user of this.users) {
            if (user.email == email) {
                return user;
            }
        }
        return null;
    }

    create({ email, password1, password2 }) {
        let [validated, errors] = this.validate({ email, password1, password2 });

        if (validated) {
            let user = new User(email, password1);

            this.users.push(user);

            return { "AccessToken": auth.generateAccessToken(email) };
        }
        return { errors: errors };
    }

    login({ email, password }) {
        let user = this.get(email);

        if (user == null) {
            return { errors: "User does not exist." };
        }
        else if (user.password != password) {
            return { errors: "Incorrect password." };
        }
        else {
            return { "AccessToken": auth.generateAccessToken(email) };
        }
    }

}

class User {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

}

Users = new UserTable();

module.exports = Users;
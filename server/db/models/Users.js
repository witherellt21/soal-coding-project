const auth = require('../../middleware/auth');
const BaseTable = require('./BaseTable');

class User {
    constructor({ email, password }) {
        this.email = email;
        this.password = password;
    }

    static primaryKey = 'email';

}

class UserTable extends BaseTable {
    constructor() {
        super(User);
    }

    validate({ email, password, password2 }) {
        if (!email) {
            return [false, "Must supply an email."]
        }
        if (!password) {
            return [false, "Must supply a password."]
        }
        if (password != password2) {
            return [false, "Passwords don't match."];
        }
        return super.validate({ email, password, password2 });
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

    signup(data) {
        let { email, errors } = this.create(data);

        if (errors) {
            return { errors: errors }
        }

        return { "AccessToken": auth.generateAccessToken(email) };
    }

}

Users = new UserTable(User);

module.exports = Users;
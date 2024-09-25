const Users = require('./models/Users');

class Database {
    constructor() {
        this.users = Users;
    }
}

db = new Database();

module.exports = db;
const Database = require("../../Utils/Configs/db");

module.exports = {
    getUser: (req) => {
        let sql = "SELECT * FROM Users";
        return new Promise((resolve, reject) => {
            Database.query(sql, (err, response) => {
                if (!err) resolve(response);
                else reject(err);
            })
        })
        // return Database.execute(sql);
    },
    createUser: (body) => {
        let sql = "INSERT INTO Users (username, password, name) VALUES (?, ?, ?)";
        return new Promise((resolve, reject) => {
            Database.query(sql, [body.username, body.password, body.name], (err, response) => {
                if (!err) resolve(response);
                else reject(err);
            })
        })
        // return Database.execute(sql, [body.username, body.password, body.name]);
    }
};

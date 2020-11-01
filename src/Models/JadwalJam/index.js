const Database = require("../../Utils/Configs/db");

module.exports = {
    getMataKuliah: (req) => {
        let sql = `SELECT * FROM jadwal_jam`;
        return new Promise((resolve, reject) => {
            Database.query(sql, (err, response) => {
                if (!err) resolve(response);
                else reject(err);
            })
        })
    }
}
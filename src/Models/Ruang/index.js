const Database = require("../../Utils/Configs/db");

module.exports = {
    getMataKuliah: (req) => {
        let sql = `SELECT id_ruang,  nama_ruangan FROM ruang;`;
        return new Promise((resolve, reject) => {
            Database.query(sql, (err, response) => {
                if (!err) resolve(response);
                else reject(err);
            })
        })
    }
}
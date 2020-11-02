const Database = require("../../Utils/Configs/db");

module.exports = {
    getMataKuliah: (req) => {
        let sql = `SELECT id_matkul, name_mk, sks  FROM mata_kuliah`;
        return new Promise((resolve, reject) => {
            Database.query(sql, (err, response) => {
                if (!err) resolve(response);
                else reject(err);
            });
        });
    }
};
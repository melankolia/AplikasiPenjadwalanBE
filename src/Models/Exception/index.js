const Database = require("../../Utils/Configs/db");

module.exports = {
    getException: () => {
        let sql = `SELECT * FROM tidak_bersedia`;
        return new Promise((resolve, reject) => {
            Database.query(sql, (err, response) => {
                if (!err) resolve(response);
                else reject(err);
            });
        });
    },
    createException: (payload) => {
        let sql = `INSERT INTO tidak_bersedia (nidn_dosen, id_sesi) VALUES (?, ?)`;
        return new Promise((resolve, reject) => {
            Database.query(sql, [...payload], (err, response) => {
                if (!err) resolve(response);
                else reject(err);
            });
        });
    },
    deleteException: (payload) => {
        let sql = "DELETE FROM tidak_bersedia WHERE id_ex = ?";
        return new Promise((resolve, reject) => {
            Database.query(sql, payload, (err, response) => {
                if (!err) resolve(response);
                else reject(err);
            });
        });
    }
};

const Database = require("../../Utils/Configs/db");

module.exports = {
    getDosen: (_) => {
        let sql = `SELECT * FROM dosen`;
        return new Promise((resolve, reject) => {
            Database.query(sql, (err, response) => {
                if (!err) resolve(response);
                else reject(err);
            });
        });
    },
    createDosen: (payload) => {
        let sql = `INSERT INTO dosen (nidn_dosen, nama, telpon) VALUES (?, ?, ?)`;
        return new Promise((resolve, reject) => {
            Database.query(sql, [...payload], (err, response) => {
                if (!err) resolve(response);
                else reject(err);
            });
        });
    },
    updateDosen: (payload) => {
        let sql = "UPDATE dosen SET nidn_dosen=?,nama=?, telpon=? WHERE nidn_dosen = ?";
        return new Promise((resolve, reject) => {
            Database.query(sql, [...payload], (err, response) => {
                if (!err) resolve(response);
                else reject(err);
            });
        });
    },
    deleteDosen: (payload) => {
        let sql = "DELETE FROM dosen WHERE nidn_dosen = ?";
        return new Promise((resolve, reject) => {
            Database.query(sql, payload, (err, response) => {
                if (!err) resolve(response);
                else reject(err);
            });
        });
    }
};
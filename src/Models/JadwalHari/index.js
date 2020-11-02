const Database = require("../../Utils/Configs/db");

module.exports = {
    getHari: (req) => {
        let sql = `SELECT * FROM jadwal_hari`;
        return new Promise((resolve, reject) => {
            Database.query(sql, (err, response) => {
                if (!err) resolve(response);
                else reject(err);
            })
        })
    },
    createHari: (payload) => {
        let sql = `INSERT INTO jadwal_hari (name_hari) VALUES (?)`;
        return new Promise((resolve, reject) => {
            Database.query(sql, [...payload], (err, response) => {
                if (!err) resolve(response);
                else reject(err);
            });
        });
    },
    updateHari: (payload) => {
        let sql = "UPDATE jadwal_hari SET name_hari=? WHERE id_hari = ?";
        return new Promise((resolve, reject) => {
            Database.query(sql, [...payload], (err, response) => {
                if (!err) resolve(response);
                else reject(err);
            });
        });
    },
    deleteHari: (payload) => {
        let sql = "DELETE FROM jadwal_hari WHERE id_hari = ?";
        return new Promise((resolve, reject) => {
            Database.query(sql, payload, (err, response) => {
                if (!err) resolve(response);
                else reject(err);
            });
        });
    }
}
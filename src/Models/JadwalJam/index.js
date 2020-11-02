const Database = require("../../Utils/Configs/db");

module.exports = {
    getJam: (payload = "") => {
        let sql = `SELECT * FROM jadwal_jam WHERE range_jam LIKE "${payload}"`;
        return new Promise((resolve, reject) => {
            Database.query(sql, (err, response) => {
                if (!err) resolve(response);
                else reject(err);
            })
        })
    },
    createJam: (payload) => {
        let sql = `INSERT INTO jadwal_jam (range_jam) VALUES (?)`;
        return new Promise((resolve, reject) => {
            Database.query(sql, [...payload], (err, response) => {
                if (!err) resolve(response);
                else reject(err);
            })
        })
    },
    updateJam: (payload) => {
        let sql = "UPDATE jadwal_jam SET range_jam=? WHERE id_jam = ?";
        return new Promise((resolve, reject) => {
            Database.query(sql, [...payload], (err, response) => {
                if (!err) resolve(response);
                else reject(err);
            });
        });
    },
    deleteJam: (payload) => {
        let sql = "DELETE FROM jadwal_jam WHERE id_jam = ?";
        return new Promise((resolve, reject) => {
            Database.query(sql, payload, (err, response) => {
                if (!err) resolve(response);
                else reject(err);
            });
        });
    }
}
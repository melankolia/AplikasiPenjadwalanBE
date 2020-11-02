const Database = require("../../Utils/Configs/db");

module.exports = {
    getRuang: (payload) => {
        let sql = `SELECT ${payload ? payload : "id_ruang, nama_ruangan"} FROM ruang;`;
        return new Promise((resolve, reject) => {
            Database.query(sql, (err, response) => {
                if (!err) resolve(response);
                else reject(err);
            })
        })
    },
    createRuang: (payload) => {
        let sql = `INSERT INTO ruang (nama_ruangan, kapasitas, jenis) VALUES (?, ?, ?)`;
        return new Promise((resolve, reject) => {
            Database.query(sql, [...payload], (err, response) => {
                if (!err) resolve(response);
                else reject(err);
            })
        })
    },
    updateRuang: (payload) => {
        let sql = `UPDATE ruang SET nama_ruangan=?, kapasitas=?, jenis=? WHERE id_ruang=?;`
        // let sql = "UPDATE ruang SET nama_ruangan=?,kapasitas=?, jenis=? WHERE id_ruang=?";
        return new Promise((resolve, reject) => {
            Database.query(sql, [...payload], (err, response) => {
                if (!err) resolve(response);
                else reject(err);
            });
        });
    },
    deleteRuang: (payload) => { 
        let sql = `DELETE FROM ruang WHERE id_ruang`;
        return new Promise((resolve, reject) => {
            Database.query(sql, payload, (err, response) => {
                if (!err) resolve(response);
                else reject(err);
            });
        });
    }
}
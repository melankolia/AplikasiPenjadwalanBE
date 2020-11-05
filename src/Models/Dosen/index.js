const Database = require("../../Utils/Configs/db");

module.exports = {
    getDosen: (payload) => {
        let sql = `SELECT * FROM dosen WHERE nama LIKE "%${payload}%"`;
        return new Promise((resolve, reject) => {
            Database.query(sql, (err, response) => {
                if (!err) resolve(response);
                else reject(err);
            });
        });
    },
    getDosenAvailable: () => {
        let sql = `    
            SELECT	dosen.nama as nama_dosen,
                    dosen.nidn_dosen as nidn_dosen 
            FROM mata_kuliah
            INNER JOIN dosen on mata_kuliah.nidn_dosen = dosen.nidn_dosen;`;
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
        let sql =
            "UPDATE dosen SET nidn_dosen=?,nama=?, telpon=? WHERE nidn_dosen = ?";
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
    },
};

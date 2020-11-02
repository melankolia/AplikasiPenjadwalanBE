const Database = require("../../Utils/Configs/db");

module.exports = {
    getMataKuliah: (payload = "", type = "") => {
        let sql =
            type === "All"
                ? `SELECT id_matkul, 
                kode_mk, 
                dosen.nama as nama_dosen,
                name_mk, 
                sks, 
                semester, 
                jenis
                FROM mata_kuliah
        INNER JOIN dosen on mata_kuliah.nidn_dosen = dosen.nidn_dosen
        WHERE name_mk LIKE "%${payload}%";`
                : `SELECT id_matkul, name_mk, sks FROM mata_kuliah`;
        return new Promise((resolve, reject) => {
            Database.query(sql, (err, response) => {
                if (!err) resolve(response);
                else reject(err);
            });
        });
    },
    createMataKuliah: (payload) => {
        let sql = `INSERT INTO mata_kuliah (kode_mk, name_mk, sks, semester, jenis, nidn_dosen) VALUES (?, ?, ?, ?, ?, ?)`;
        return new Promise((resolve, reject) => {
            Database.query(sql, [...payload], (err, response) => {
                if (!err) resolve(response);
                else reject(err);
            });
        });
    },
    updateMataKuliah: (payload) => {
        let sql = `UPDATE mata_kuliah 
                         SET kode_mk=?, name_mk=?, sks=?, semester=?, jenis=?, nidn_dosen=?
                         WHERE id_matkul=?`;
        return new Promise((resolve, reject) => {
            Database.query(sql, [...payload], (err, response) => {
                if (!err) resolve(response);
                else reject(err);
            });
        });
    },
    deleteMataKuliah: (payload) => {
        let sql = "DELETE FROM mata_kuliah WHERE id_matkul = ?";
        return new Promise((resolve, reject) => {
            Database.query(sql, payload, (err, response) => {
                if (!err) resolve(response);
                else reject(err);
            });
        });
    }
};

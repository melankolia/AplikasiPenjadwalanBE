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
    getExceptionList: (payload = "") => {
        let sql = `
        SELECT 	
            GROUP_CONCAT(id_sesi) AS id_sesi,
            name_hari AS nama_hari,
            range_jam
        FROM sesi
        INNER JOIN ruang on sesi.id_ruang = ruang.id_ruang
        INNER JOIN jadwal_hari on sesi.id_hari = jadwal_hari.id_hari
        INNER JOIN jadwal_jam on sesi.id_jam = jadwal_jam.id_jam
        WHERE name_hari LIKE "%${payload}%"
        GROUP BY nama_hari, range_jam
        ORDER BY nama_hari DESC;`;
        return new Promise((resolve, reject) => {
            Database.query(sql, (err, response) => {
                if (!err) resolve(response);
                else reject(err);
            });
        });
    },
    exceptionForGenerate: () => {
        let sql = `SELECT 	nidn_dosen,
                            GROUP_CONCAT(id_sesi) AS id_sesi
                    FROM tidak_bersedia
                    GROUP BY nidn_dosen;`;
        return new Promise((resolve, reject) => {
            Database.query(sql, (err, response) => {
                if (!err) resolve(response);
                else reject(err);
            });
        });
    },
    createException: (payload) => {
        let sql = `INSERT INTO tidak_bersedia (nidn_dosen, id_sesi) VALUES ?`;
        return new Promise((resolve, reject) => {
            Database.query(sql, [payload], (err, response) => {
                if (!err) resolve(response);
                else reject(err);
            });
        });
    },
    checkException: (payload) => {
        let sql =  `SELECT COUNT(nidn_dosen) AS result
                    FROM tidak_bersedia
                    WHERE nidn_dosen="${payload}";`;
        return new Promise((resolve, reject) => {
            Database.query(sql, [payload], (err, response) => {
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
    },
    deleteExceptionDosen: (payload) => {
        let sql =  `DELETE FROM tidak_bersedia
                    WHERE nidn_dosen=${payload}`;
        return new Promise((resolve, reject) => {
            Database.query(sql, (err, response) => {
                if (!err) resolve(response);
                else reject(err);
            });
        });
    },
    cleanUpException: () => {
        let sql = `DELETE FROM tidak_bersedia`;
        return new Promise((resolve, reject) => {
            Database.query(sql, (err, response) => {
                if (!err) resolve(response);
                else reject(err);
            });
        });
    }
};

const Database = require("../../Utils/Configs/db");

module.exports = {
    createSesi: (data) => {
        let sql = `INSERT INTO sesi (id_ruang, id_hari, id_jam) VALUES ?`;
        return new Promise((resolve, reject) => {
            Database.query(sql, [data], (err, response) => {
                if (!err) resolve(response);
                else reject(err);
            });
        });
    },
    getSesi: (data = "", payload = "") => {
        let sql = data
            ? `SELECT * FROM sesi ${data && "LIMIT " + data.JumlahSKS}`
            : `SELECT id_sesi, nama_ruangan, name_hari AS nama_hari, range_jam FROM sesi
            INNER JOIN ruang on sesi.id_ruang = ruang.id_ruang
            INNER JOIN jadwal_hari on sesi.id_hari = jadwal_hari.id_hari
            INNER JOIN jadwal_jam on sesi.id_jam = jadwal_jam.id_jam
            WHERE nama_ruangan LIKE "%${payload}%"
            ORDER BY nama_hari DESC, nama_ruangan ASC, range_jam ASC`;

        return new Promise((resolve, reject) => {
            Database.query(sql, (err, response) => {
                if (!err) resolve(response);
                else reject(err);
            });
        });
    },
    cleanUpSesi: () => {
        let sql = `DELETE FROM sesi`;
        return new Promise((resolve, reject) => {
            Database.query(sql, (err, response) => {
                if (!err) resolve(response);
                else reject(err);
            });
        });
    }
};

const Database = require("../../Utils/Configs/db");

module.exports = {
    getJadwalKuliah: (payload = "") => {
        let sql = `SELECT 	name_mk, 
                        GROUP_CONCAT(id_jadwal) AS id_jadwal,
                        GROUP_CONCAT(DISTINCT nama_dosen) AS nama_dosen,
                        GROUP_CONCAT(DISTINCT kode_mk) AS kode_mk,
                        GROUP_CONCAT(DISTINCT sks) AS sks,
                        GROUP_CONCAT(DISTINCT semester) AS semester,
                        GROUP_CONCAT(DISTINCT nama_ruangan) AS nama_ruangan,
                        GROUP_CONCAT(DISTINCT nama_hari) AS nama_hari,
                        GROUP_CONCAT(range_jam) AS jam
                    FROM jadwal_kuliah
                    INNER JOIN (
                        SELECT 	DISTINCT name_mk, 
                                kode_mk,
                                id_matkul, 
                                dosen.nama as nama_dosen,
                                sks, 
                                semester, 
                                jenis
                        FROM mata_kuliah
                        INNER JOIN dosen on mata_kuliah.nidn_dosen = dosen.nidn_dosen
                    ) AS mata_kuliah_temp on jadwal_kuliah.id_matkul = mata_kuliah_temp.id_matkul
                    INNER JOIN (
                        SELECT id_sesi, nama_ruangan, name_hari AS nama_hari, range_jam FROM sesi
                        INNER JOIN ruang on sesi.id_ruang = ruang.id_ruang
                        INNER JOIN jadwal_hari on sesi.id_hari = jadwal_hari.id_hari
                        INNER JOIN jadwal_jam on sesi.id_jam = jadwal_jam.id_jam
                    ) AS sesi_temp on jadwal_kuliah.id_sesi = sesi_temp.id_sesi
                    WHERE name_mk LIKE "%${payload}%"
                    GROUP BY name_mk;`;
        return new Promise((resolve, reject) => {
            Database.query(sql, (err, response) => {
                if (!err) resolve(response);
                else reject(err);
            });
        });
    },
    checkTotal: (_) => {
        let sql = `SELECT   (SELECT COUNT(id_sesi) FROM sesi) AS JumlahSesi,
                            (SELECT SUM(sks) FROM mata_kuliah) AS JumlahSKS,
                            (SELECT COUNT(id_matkul) FROM mata_kuliah) AS JumlahMatkul`;
        return new Promise((resolve, reject) => {
            Database.query(sql, (err, response) => {
                if (!err) resolve(response);
                else reject(err);
            });
        });
    },
    generateJadwalKuliah: (data) => {
        let sql = `INSERT INTO jadwal_kuliah (id_matkul, id_sesi) VALUES ?`;
        return new Promise((resolve, reject) => {
            Database.query(sql, [data], (err, response) => {
                if (!err) resolve(response);
                else reject(err);
            });
        });
    },
    cleanUpJadwal: () => {
        let sql = `DELETE FROM jadwal_kuliah`;
        return new Promise((resolve, reject) => {
            Database.query(sql, (err, response) => {
                if (!err) resolve(response);
                else reject(err);
            });
        });
    },
};

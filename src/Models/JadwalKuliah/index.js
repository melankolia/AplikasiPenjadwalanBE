const Database = require("../../Utils/Configs/db");

module.exports = {
    getJadwalKuliah: (req) => {
        let sql = 
        `SELECT id_jadwal, 
                kode_mk, 
                name_mk, 
                nama_dosen,
                nama_ruangan, 
                nama_hari, 
                range_jam 
        FROM jadwal_kuliah
        INNER JOIN (
            SELECT 	id_matkul, 
                    kode_mk, 
                    dosen.nama as nama_dosen,
                    name_mk, 
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
        ) AS sesi_temp on jadwal_kuliah.id_sesi = sesi_temp.id_sesi`;
        return new Promise((resolve, reject) => {
            Database.query(sql, (err, response) => {
                if (!err) resolve(response);
                else reject(err);
            })
        })
    },
    createSesi: (data) => {
        let sql = `INSERT INTO sesi (id_ruang, id_hari, id_jam) VALUES ?`
        return new Promise((resolve, reject) => {
            Database.query(sql, [data], (err, response) => {
                if (!err) resolve(response);
                else reject(err);
            })
        })
    }
}
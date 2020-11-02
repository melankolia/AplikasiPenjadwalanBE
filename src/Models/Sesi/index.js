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
    getSesi: (data) => {
        console.log(data.JumlahSKS);
        let sql = `SELECT * FROM sesi ${ data && "LIMIT " + data.JumlahSKS }`;
        return new Promise((resolve, reject) => {
            Database.query(sql, (err, response) => {
                if (!err) resolve(response);
                else reject(err);
            });
        })
    }
}
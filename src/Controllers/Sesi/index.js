const Model = require("../../Models/Sesi");
const Response = require("../../Utils/Helper/Responses");

module.exports = {
    getSesi: (req, res, next) => {
        let payload = req.query && req.query.nama_ruangan;

        Model.getSesi(null, payload)
            .then((response) => {
                Response.success(res, response);
            })
            .catch((err) => {
                Response.failed(res, err, next);
            });
    },
    cleanUpSesi: (req, res, next) => {
        Model.cleanUpSesi()
            .then((response) => {
                !response.affectedRows && Response.failed(res, "Gagal Menghapus Data Sesi");
                Response.success(res, true);
            })
            .catch((err) => {
                Response.failed(res, err, next);
            });
    },
};

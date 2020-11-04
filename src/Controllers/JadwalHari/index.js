const Model = require("../../Models/JadwalHari");
const Response = require("../../Utils/Helper/Responses");

module.exports = {
    getHari: (req, res, next) => {
        let payload = req.query && req.query.name_hari || "";
        Model.getHari(payload)
            .then((result) => {
                Response.success(res, result);
            })
            .catch((err) => {
                Response.failed(res, err, next);
            });
    },
    createHari: (req, res, next) => {
        let payload = [req.body && req.body.name_hari];
        Model.createHari(payload)
            .then((_) => {
                Response.success(res, true);
            })
            .catch((err) => {
                Response.failed(res, err, next);
            });
    },
    updateHari: (req, res, next) => {
        let payload = [
            req.body && req.body.name_hari,
            req.query && req.query.id_hari
        ];
        Model.updateHari(payload)
            .then((_) => {
                Response.success(res, true);
            })
            .catch((err) => {
                Response.failed(res, err, next);
            });
    },
    deleteHari: (req, res, next) => {
        let payload = req.query && req.query.id_hari;
        !payload && Response.badRequest(res, "Param Salah");

        Model.deleteHari(payload)
            .then((result) => {
                !result.affectedRows &&
                    Response.failed(res, "id_hari Tidak Ditemukan");
                Response.success(res, true);
            })
            .catch((err) => {
                Response.failed(res, err);
            });
    },
};

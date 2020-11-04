const Model = require("../../Models/Exception");
const Response = require("../../Utils/Helper/Responses");

module.exports = {
    getException: (req, res, next) => {
        Model.getException()
            .then((result) => {
                Response.success(res, result);
            })
            .catch((err) => {
                Response.failed(res, err, next);
            });
    },
    createException: (req, res, next) => {
        let payload = [
            req.body && req.body.nidn_dosen,
            req.body && req.body.id_sesi,
        ];
        Model.createException(payload)
            .then((_) => {
                Response.success(res, true);
            })
            .catch((err) => {
                Response.failed(res, err, next);
            });
    },
    deleteException: (req, res, next) => {
        let payload = req.query && req.query.id_ex;
        !payload && Response.badRequest(res, "Param Salah");

        Model.deleteException(payload)
            .then((result) => {
                !result.affectedRows &&
                    Response.failed(res, "id_ex Tidak Ditemukan");
                Response.success(res, true);
            })
            .catch((err) => {
                Response.failed(res, err);
            });
    },
};

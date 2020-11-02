const Model = require("../../Models/Dosen");
const Response = require("../../Utils/Helper/Responses");

module.exports = {
    getDosen: (req, res, next) => {
        let payload = req.query && req.query.nama_dosen || "";
        Model.getDosen(payload)
            .then((result) => {
                Response.success(res, result);
            })
            .catch((err) => {
                Response.failed(res, err, next);
            });
    },
    createDosen: (req, res, next) => {
        let payload = [
            req.body && req.body.nidn_dosen,
            req.body && req.body.nama,
            (req.body && req.body.telp) || "",
        ];
        Model.createDosen(payload)
            .then((_) => {
                Response.success(res, true);
            })
            .catch((err) => {
                Response.failed(res, err, next);
            });
    },
    updateDosen: (req, res, next) => {
        let payload = [
            req.body && req.body.nidn_dosen,
            req.body && req.body.nama,
            (req.body && req.body.telp) || "",
            req.body && req.body.nidn_dosen,
        ];
        Model.updateDosen(payload)
            .then((_) => {
                !result.affectedRows &&
                    Response.failed(res, "nidn_dosen Tidak Ditemukan");
                Response.success(res, true);
            })
            .catch((err) => {
                Response.failed(res, err);
            });
    },
    deleteDosen: (req, res, next) => {
        let payload = req.query && req.query.nidn_dosen;
        !payload && Response.badRequest(res, "Param Salah");

        Model.deleteDosen(payload)
            .then((result) => {
                !result.affectedRows &&
                    Response.failed(res, "nidn_dosen Tidak Ditemukan");
                Response.success(res, true);
            })
            .catch((err) => {
                Response.failed(res, err);
            });
    },
};

const Model = require("../../Models/Dosen");
const Response = require("../../Utils/Helper/Responses");

module.exports = {
    getDosen: (req, res, next) => {
        let payload = (req.query && req.query.nama_dosen) || "";
        Model.getDosen(payload)
            .then((result) => {
                Response.success(res, result);
            })
            .catch((err) => {
                Response.failed(res, err, next);
            });
    },
    getDetailDosen: (req, res, next) => {
        let payload = req.params && req.params.nidn_dosen;
        Model.getDetailDosen(payload)
            .then((result) => {
                result[0]
                    ? (result = result[0])
                    : Response.badRequest(res, "nidn_dosen Tidak Ditemukan");
                Response.success(res, result);
            })
            .catch((err) => {
                Response.failed(res, err, next);
            });
    },
    getDosenAvailable: (req, res, next) => {
        Model.getDosenAvailable()
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
            req.body && req.body.address,
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
            req.body && req.body.address,
            (req.body && req.body.telp) || "",
            req.params && req.params.nidn_dosen,
        ];
        Model.updateDosen(payload)
            .then((result) => {
                console.log(result);
                !result.affectedRows &&
                    Response.failed(res, "nidn_dosen Tidak Ditemukan");
                Response.success(res, true);
            })
            .catch((err) => {
                Response.failed(res, err, next);
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

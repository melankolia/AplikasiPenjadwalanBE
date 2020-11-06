const Model = require("../../Models/MataKuliah");
const Response = require("../../Utils/Helper/Responses");

module.exports = {
    getMataKuliah: (req, res, next) => {
        let payload = [req.query && req.query.name_mk];
        let type = "All";
        Model.getMataKuliah(payload, type)
            .then((result) => {
                Response.success(res, result);
            })
            .catch((err) => {
                Response.failed(res, err);
            });
    },
    getDetailMataKuliah: (req, res, next) => {
        let payload = req.params && req.params.id_matkul;
        Model.getDetailMataKuliah(payload)
            .then((result) => {
                result[0]
                    ? (result = result[0])
                    : Response.badRequest(res, "id_matkul Tidak Ditemukan");
                Response.success(res, result);
            })
            .catch((err) => {
                Response.failed(res, err, next);
            });
    },
    countMataKuliah: (req, res, next) => {
        Model.countMataKuliah()
            .then((result) => {
                result = result[0];
                Response.success(res, result);
            })
            .catch((err) => {
                Response.failed(res, err);
            });
    },
    createMataKuliah: (req, res, next) => {
        let payload = [
            req.body && req.body.kode_mk,
            req.body && req.body.name_mk,
            req.body && req.body.sks,
            req.body && req.body.semester,
            req.body && req.body.jenis,
            req.body && req.body.nidn_dosen,
        ];
        Model.createMataKuliah(payload)
            .then((_) => {
                Response.success(res, true);
            })
            .catch((err) => {
                Response.failed(res, err, next);
            });
    },
    updateMataKuliah: (req, res, next) => {
        let payload = [
            req.body && req.body.kode_mk,
            req.body && req.body.name_mk,
            req.body && req.body.sks,
            req.body && req.body.semester,
            req.body && req.body.jenis,
            req.body && req.body.nidn_dosen,
            req.params && req.params.id_matkul,
        ];
        !payload[6] && Response.badRequest(res, "Param Salah");

        Model.updateMataKuliah(payload)
            .then((result) => {
                !result.affectedRows &&
                    Response.failed(res, "id_matkul Tidak Ditemukan");
                Response.success(res, true);
            })
            .catch((err) => {
                Response.failed(res, err);
            });
    },
    deleteMataKuliah: (req, res, next) => {
        let payload = req.query && req.query.id_matkul;
        !payload && Response.badRequest(res, "Param Salah");

        Model.deleteMataKuliah(payload)
            .then((result) => {
                !result.affectedRows &&
                    Response.failed(res, "id_matkul Tidak Ditemukan");
                Response.success(res, true);
            })
            .catch((err) => {
                Response.failed(res, err);
            });
    },
};

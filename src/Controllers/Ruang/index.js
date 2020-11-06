const Model = require("../../Models/Ruang");
const Response = require("../../Utils/Helper/Responses");

module.exports = {
    getRuang: (req, res, next) => {
        let payload = req.query && req.query.nama_ruang || "";
        let type = "*";

        Model.getRuang(payload, type)
            .then((result) => {
                Response.success(res, result);
            })
            .catch((err) => {
                Response.failed(res, err);
            });
    },
    getDetailRuang: (req, res, next) => {
        let payload = req.params && req.params.id_ruang;
        Model.getDetailRuang(payload)
            .then((result) => {
                result[0]
                    ? (result = result[0])
                    : Response.badRequest(res, "id_ruang Tidak Ditemukan");
                Response.success(res, result);
            })
            .catch((err) => {
                Response.failed(res, err, next);
            });
    },
    createRuang: (req, res, next) => {
        let payload = [
            req.body && req.body.name_ruangan,
            req.body && req.body.kapasitas,
            req.body && req.body.jenis,
        ];
        Model.createRuang(payload)
            .then((_) => {
                Response.success(res, true);
            })
            .catch((err) => {
                Response.failed(res, err, next);
            });
    },
    updateRuang: (req, res, next) => {
        let payload = [
            req.body && req.body.nama_ruangan,
            req.body && req.body.kapasitas,
            req.body && req.body.jenis,
            req.query && req.query.id_ruang,
        ];
        !payload[3] && Response.failed(res, "Param Salah");

        console.log("payload : ", payload);

        Model.updateRuang(payload)
            .then((result) => {
                !result.affectedRows &&
                    Response.failed(res, "id_ruang Tidak Ditemukan");
                Response.success(res, true);
            })
            .catch((err) => {
                Response.failed(res, err);
            });
    },
    deleteRuang: (req, res, next) => {
        let payload = req.query && req.query.id_ruang;
        !payload && Response.badRequest(res, "Param Salah");

        Model.deleteRuang(payload)
            .then((result) => {
                !result.affectedRows &&
                    Response.failed(res, "id_ruang Tidak Ditemukan");
                Response.success(res, true);
            })
            .catch((err) => {
                Response.failed(res, err);
            });
    },
};

const Model = require("../../Models/JadwalJam");
const Response = require("../../Utils/Helper/Responses");

module.exports = {
    getJam: (req, res, next) => {
        let payload = req.query && req.query.range_jam || "";
        Model.getJam(payload)
            .then((result) => {
                Response.success(res, result);
            })
            .catch((err) => {
                Response.failed(res, err);
            });
    },
    getDetailJam: (req, res, next) => {
        let payload = req.params && req.params.id_jam;
        Model.getDetailJam(payload)
            .then((result) => {
                result[0]
                    ? (result = result[0])
                    : Response.badRequest(res, "id_jam Tidak Ditemukan");
                Response.success(res, result);
            })
            .catch((err) => {
                Response.failed(res, err, next);
            });
    },
    createJam: (req, res, next) => {
        let payload = [req.body && req.body.range_jam];
        !payload[0] && Response.badRequest(res, "Param Salah");

        Model.createJam(payload)
            .then((_) => {
                Response.success(res, true);
            })
            .catch((err) => {
                Response.failed(res, err);
            });
    },
    updateJam: (req, res, next) => {
        let payload = [
            req.body && req.body.range_jam,
            req.params && req.params.id_jam,
        ];
        !payload[1] && Response.badRequest(res, "Param Salah");

        Model.updateJam(payload)
            .then((result) => {
                !result.affectedRows &&
                    Response.failed(res, "range_jam Tidak Ditemukan");
                Response.success(res, true);
            })
            .catch((err) => {
                Response.failed(res, err);
            });
    },
    deleteJam: (req, res, next) => {
        let payload = req.query && req.query.id_jam;
        !payload && Response.badRequest(res, "Param Salah");

        Model.deleteJam(payload)
            .then((result) => {
                !result.affectedRows &&
                    Response.failed(res, "id_jam Tidak Ditemukan");
                Response.success(res, true);
            })
            .catch((err) => {
                Response.failed(res, err);
            });
    },
};

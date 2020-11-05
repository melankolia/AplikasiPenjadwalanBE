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
    getExceptionList: async (req, res, next) => {
        let payload = (req.query && req.query.name_hari) || "";
        await Model.getExceptionList(payload)
            .then((result) => {
                result.map((e) => (e.id_sesi = e.id_sesi.split(",")));
                Response.success(res, result);
            })
            .catch((err) => {
                Response.failed(res, err, next);
            });
    },
    createException: async (req, res, next) => {
        let checkPayload = (req.query && req.query.nidn_dosen) || "";

        if (checkPayload) {
            try {
                let checkDosen;
                await Model.checkException(checkPayload)
                    .then((result) => {
                        checkDosen = result[0] && result[0].result;
                    })
                    .catch((err) => {
                        throw new Error(err);
                    });

                if (checkDosen > 0) {
                    await Model.deleteExceptionDosen(checkPayload)
                        .then((result) => {
                            console.log("result : ", result);
                        })
                        .catch((err) => {
                            throw new Error(err);
                        });
                }
            } catch (error) {
                Response.failed(res, error, next);
            }
        }

        let prePayload = [];

        if (req.body.length > 0) {
            req.body.map((e) => {
                const {id_sesi, ...etc} = e;
                let tempPayload = {
                    ...etc,
                };
                e.id_sesi.map((e2) => {
                    tempPayload = {
                        id_sesi: e2,
                        ...etc,
                    };
                    prePayload = [...prePayload, tempPayload];
                });
            });
    
            let payload = prePayload.map((e) => [e.nidn_dosen, e.id_sesi]);
            Model.createException(payload)
                .then((_) => {
                    Response.success(res, true);
                })
                .catch((err) => {
                    Response.failed(res, err, next);
                });
        } else {
            Response.success(res, true);
        }
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

const Model = require("../../Models/JadwalKuliah");
const Response = require("../../Utils/Helper/Responses");

module.exports = {
    getJadwalKuliah: (_, res) => {
        Model.getJadwalKuliah()
            .then((result) => {
                Response.success(res, result);
            })
            .catch((err) => {
                Response.failed(res, err);
            });
    },
};

const Model = require("../../Models/Sesi");
const Response = require("../../Utils/Helper/Responses");

module.exports = {
    getSesi: (_, res, next) => {
        Model.getSesi()
            .then((response) => {
                Response.success(res, response);
            })
            .catch((err) => {
                Response.failed(res, err, next);
            });
    },
};

const Model = require("../../Models/Users");
const Response = require("../../Utils/Helper/Responses");

module.exports = {
    getUser: (_, res) => {
        Model
            .getUser()
            .then(([result, fieldData]) => {
                Response.success(res, result);
            })
            .catch(err => {
                Response.failed(res, err);
            });
    },
    register: (req, res) => {
        const {body} = req;
        Model
            .createUser(body)
            .then(_ => {
                Response.success(res, true);
            })
            .catch(err => {
                Response.failed(res, err);
            });
    },
};

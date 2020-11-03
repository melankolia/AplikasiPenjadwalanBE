const Model = require("../../Models/Users");
const Response = require("../../Utils/Helper/Responses");

module.exports = {
    getUser: (_, res) => {
        Model.getUser()
            .then((result) => {
                Response.success(res, result);
            })
            .catch((err) => {
                Response.failed(res, err);
            });
    },
    register: (req, res) => {
        const {body} = req;
        Model.createUser(body)
            .then((_) => {
                Response.success(res, true);
            })
            .catch((err) => {
                console.log(err);
                Response.failed(res, false);
            });
    },
    loginUser: (req, res) => {
        let payload = [
            req.body && req.body.username,
            req.body && req.body.password
        ]
        Model.loginUser(payload)
            .then((result) => {
                result.length === 0 && Response.badRequest(res, "Username atau Password Salah");
                Response.success(res, ...result);
            })
            .catch((err) => {
                Response.failed(res, false);
            });
    },
};

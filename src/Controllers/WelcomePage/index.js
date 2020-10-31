const Response = require("../../Utils/Helper/Responses");

exports.WelcomePage = (req, res) => {
        let result = "Selamat Datang di Backend Aplikasi Penjadwalan";
        Response.success(res, result);
}
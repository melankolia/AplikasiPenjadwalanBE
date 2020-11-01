const Model = require("../../Models/JadwalKuliah");
const ModelHari = require("../../Models/JadwalHari");
const ModelJam = require("../../Models/JadwalJam");
const ModelRuang = require("../../Models/Ruang");
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
    createSesi: async (_, res) => {
        let result = {};
        try {
            await ModelJam.getJam()
                .then((response) => {
                    result.jam = [...response];
                })
                .catch((err) => console.log(err));

            await ModelHari.getHari()
                .then((response) => {
                    result.hari = [...response];
                })
                .catch((err) => console.log(err));

            await ModelRuang.getRuang()
                .then((response) => {
                    result.ruang = [...response];
                })
                .catch((err) => console.log(err));
        } catch (err) {
            Response.failed(res, err || "Gagal Membuat Sesi");
        }

        if (
            !(Object.keys(result).length === 0 && result.constructor === Object)
        ) {
            let sesi = [];
            result.ruang.forEach((el1) => {
                result.hari.forEach((el2) => {
                    result.jam.forEach((el3) => {
                        console.log(
                            `Ruang : ${el1.id_ruang}, Hari : ${el2.id_hari}, Jam : ${el3.id_jam}`
                        );
                        sesi = [
                            ...sesi,
                            [el1.id_ruang, el2.id_hari, el3.id_jam],
                        ];
                    });
                });
            });
            Model.createSesi(sesi)
                .then((_) => {
                    Response.success(res, true);
                })
                .catch((err) => {
                    Response.failed(res, err);
                });
        } else {
            Response.badRequest(res, { result: "Gagal Membuat Sesi" });
        }
    },
};

const Model = require("../../Models/JadwalKuliah");
const ModelMatkul = require("../../Models/MataKuliah");
const ModelHari = require("../../Models/JadwalHari");
const ModelJam = require("../../Models/JadwalJam");
const ModelRuang = require("../../Models/Ruang");
const ModelSesi = require("../../Models/Sesi");
const Response = require("../../Utils/Helper/Responses");

module.exports = {
    getJadwalKuliah: (_, res, next) => {
        Model.getJadwalKuliah()
            .then((result) => {
                Response.success(res, result);
            })
            .catch((err) => {
                Response.failed(res, err, next);
            });
    },
    createSesi: async (_, res, next) => {
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
            Response.failed(res, err || "Gagal Membuat Sesi", next);
        }

        if (
            !(Object.keys(result).length === 0 && result.constructor === Object)
        ) {
            let sesi = [];
            result.ruang.forEach((el1) => {
                result.hari.forEach((el2) => {
                    result.jam.forEach((el3) => {
                        sesi = [
                            ...sesi,
                            [el1.id_ruang, el2.id_hari, el3.id_jam],
                        ];
                    });
                });
            });
            ModelSesi.createSesi(sesi)
                .then((_) => {
                    Response.success(res, true);
                })
                .catch((err) => {
                    Response.failed(res, err, next);
                });
        } else {
            Response.badRequest(res, {result: "Gagal Membuat Sesi"});
        }
    },
    generateJadwalKuliah: async (_, res, next) => {
        let total;
        let sesi = [];
        let mataKuliah = [];
        let jadwalMatKul = [];

        try {
            await Model.checkTotal()
                .then((result) => {
                    if (result[0]) result = result[0];
                    else Response.failed(res, {result: "Result Kosong"}, next);

                    result.JumlahSKS = parseInt(result.JumlahSKS);
                    total = {...result};

                    if (total.JumlahSKS > total.JumlahSesi)
                        Response.failed(
                            res,
                            {
                                result: `Sesi Tidak Mencukupi, Kurang ${
                                    total.JumlahSKS - total.JumlahSesi
                                } Sesi`,
                            },
                            next
                        );
                })
                .catch((err) => {
                    Response.failed(res, err, next);
                });

            await ModelSesi.getSesi(total)
                .then((response) => {
                    sesi = [...response];
                })
                .catch((err) => {
                    Response.failed(res, err, next);
                });

            await ModelMatkul.getMataKuliah()
                .then((result) => {
                    mataKuliah = [...result];
                })
                .catch((err) => {
                    Response.failed(res, err, next);
                });

            let pointerMatKul = 0;
            let pointerIndex = 0;
            sesi.forEach((e) => {
                if (pointerIndex < mataKuliah[pointerMatKul].sks) {
                    jadwalMatKul = [
                        ...jadwalMatKul,
                        [mataKuliah[pointerMatKul].id_matkul, e.id_sesi],
                    ];
                    pointerIndex++;
                } else {
                    pointerMatKul++;
                    pointerIndex = 0;
                    jadwalMatKul = [
                        ...jadwalMatKul,
                        [mataKuliah[pointerMatKul].id_matkul, e.id_sesi],
                    ];
                }
            });

            Model.generateJadwalKuliah(jadwalMatKul)
                .then((result) => {
                    Response.success(res, result);
                })
                .catch((err) => {
                    Response.failed(res, err, next);
                });
        } catch (error) {
            response.failed(res, error, next);
        }
    },
};

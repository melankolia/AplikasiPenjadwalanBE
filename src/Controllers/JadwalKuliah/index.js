const Model = require("../../Models/JadwalKuliah");
const ModelException = require("../../Models/Exception");
const ModelMatkul = require("../../Models/MataKuliah");
const ModelHari = require("../../Models/JadwalHari");
const ModelJam = require("../../Models/JadwalJam");
const ModelRuang = require("../../Models/Ruang");
const ModelSesi = require("../../Models/Sesi");
const Response = require("../../Utils/Helper/Responses");
const Helper = require("../../Utils/Helper/Checker");

module.exports = {
    getJadwalKuliah: (req, res, next) => {
        let payload = (req.query && req.query.name_mk) || "";

        Model.getJadwalKuliah(payload)
            .then((result) => {
                result.forEach((e) => {
                    let tempJam = e.jam.split(",");
                    let tempString = `${tempJam[0].slice(0, 5)} - ${tempJam[
                        tempJam.length - 1
                    ].slice(-5)}`;
                    e.jam = tempString;
                });
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
        let exception = [];

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

            await ModelSesi.getSesi("generate")
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

            await ModelException.exceptionForGenerate()
                .then((result) => {
                    result.map((e) => (e.id_sesi = e.id_sesi.split(",")));
                    exception = [...result];
                })
                .catch((err) => {
                    Response.failed(res, err, next);
                });

            let pointerMatkul = 0;
            let pointerSesi = 0;
            let pointerLoop = 0;

            while (pointerLoop < sesi.length) {
                if (pointerMatkul < mataKuliah.length) {
                    if (pointerSesi < mataKuliah[pointerMatkul].sks) {
                        let filtered = exception.find(
                            (e) =>
                                e.nidn_dosen ===
                                mataKuliah[pointerMatkul].nidn_dosen
                        );

                        if (filtered) {
                            let checkException = filtered.id_sesi.find(
                                (e) => e == sesi[pointerLoop].id_sesi
                            );
                            if (checkException) {
                                pointerLoop++;
                                continue;
                            }
                        }

                        // Assign Matakuliah dan Id Sesi
                        jadwalMatKul = [
                            ...jadwalMatKul,
                            [
                                mataKuliah[pointerMatkul].id_matkul,
                                sesi[pointerLoop].id_sesi,
                            ],
                        ];

                        // Jika sudah diassign maka akan dihapus dari sesi
                        sesi.splice(pointerLoop, 1);
                        pointerSesi++;
                    } else {
                        
                        // Looping sesi dari awal lagi
                        pointerMatkul++;
                        pointerLoop = 0;
                        pointerSesi = 0;
                    }
                } else {
                    break;
                }
            }

            console.log(jadwalMatKul);
            Model.generateJadwalKuliah(jadwalMatKul)
                .then((result) => {
                    Response.success(res, result);
                })
                .catch((err) => {
                    Response.failed(res, err, next);
                });
        } catch (error) {
            Response.failed(res, error, next);
        }
    },
    cleanUpJadwal: async (_, res, next) => {
        try {
            await ModelSesi.cleanUpSesi()
                .then((response) => {
                    console.log(response);
                })
                .catch((err) => {
                    throw new Error(err);
                });
            await ModelException.cleanUpException()
                .then((response) => {
                    Response.success(res, true);
                })
                .catch((err) => {
                    throw new Error(err);
                });
        } catch (error) {
            console.log(error);
            Response.failed(res, error, next);
        }
    },
};

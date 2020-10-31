module.exports = {
    success: (res, result) => {
        res.status(200).send({
            message: "OK",
            result
        })
    },
    badRequest: (res, result) => {
        res.status(200).send({
            message: "BAD_REQUEST",
            result
        })
    },
    failed: (res, result) => {
        res.status(400).send({
          message: "ERROR",
          result
        });
    },
}
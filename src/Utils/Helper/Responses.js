module.exports = {
    success: (res, result) => {
        res.status(200).send({
            message: "OK",
            result
        });
    },
    badRequest: (res, result) => {
        res.status(200).send({
            message: "BAD_REQUEST",
            result
        });
        throw new Error(result);
    },
    failed: (res, result, next) => {
        res.status(400).send({
          message: "ERROR",
          result
        });
        next(result);
        throw new Error(result);
    },
}
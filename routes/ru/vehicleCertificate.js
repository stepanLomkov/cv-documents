function postVehicleCertificate(req, res) {
    console.log(req.files.photo);

    res.status(200).json(req.files.photo)
}

module.exports = {
    /** Получение данных из свидетельства регистрации ТС. */
    post: postVehicleCertificate,
};

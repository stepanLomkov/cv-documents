const { OCR } = require('../../cv');

async function postVehicleCertificate(req, res) {
    const pathToPhoto = `buffer/${req.files.photo.name}`;
    await req.files.photo.mv(pathToPhoto);

    const result = await OCR(pathToPhoto);

    res.status(200).json(result);
}

module.exports = {
    /** Получение данных из свидетельства регистрации ТС. */
    post: postVehicleCertificate,
};

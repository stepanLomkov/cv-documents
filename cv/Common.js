const Tesseract = require('tesseract.js');

// сохранение фото
async function saveImage(img, imgConf) {
    const { dir, imgSave } = imgConf;

    imgName = `${dir}${imgSave.length + 1}.jpg`;
    await img.save(imgName);
    imgSave.push(imgName);
}

function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}

const readImg = async function(save){
    // чтение фото
    let req = await Tesseract.recognize(save, 'rus+eng');

    let info = req.data;

    // проверка на достоверность ответа (уверенность >= 50%)
    if (info.confidence < 50) {
        return 'notPSD';
    }

    return info.text.replace('\n', '');
}

module.exports = {
    readImg,
    saveImage,
    sleep,
}

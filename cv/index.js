const cv = require('opencv');
const rimraf = require('rimraf');
const { getFullscreenPhoto } = require('./Processing');
const { saveImage, sleep, readImg } = require('./Common');
const { cutImage } = require('./Cut');
const { ITIN_RESULT, FIELDS } = require('./Const');

function getImgConfig(imgPath) {
    return {
        // путь
        dir: imgPath,
        // зеленый цвет
        green: [0,255,0],
        //массив с сохранненых фото
        imgSave: [],

        // диапозоны контуров
        lower1: [0, 0, 0],
        upper1: [185, 193, 165],

        // минимальная площадь контуров
        minArea: 20000,
        // параметры сглаживания
        arcLength: 0.05,
        //демо режим (с сохранением промежуточных фото)
        demo: false,
    }
};

async function OCR(imgPath) {
    try{
        const imgConf = getImgConfig(imgPath);
        const result = ITIN_RESULT;

        // TODO: Костыль, дождаться выхода ассинхронного метода чтения (cv.readImage) и заменить.
        let end = false

        // чтение фото
        await cv.readImage(imgConf.dir, async function (err, img) {
            if (err) {
                throw err;
            }

            const warpImg = await getFullscreenPhoto(img, imgConf);
            
            for (const field of FIELDS) {
                //сохранение фото
                await saveImage(cutImage(warpImg, field), imgConf);
                //распознание фото
                result[field] = await readImg(imgConf.imgSave[imgConf.imgSave.length - 1]);
            }

            // TODO: Костыль, дождаться выхода ассинхронного метода чтения (cv.readImage) и заменить.
            end = true;
        })
 
        // TODO: Костыль, дождаться выхода ассинхронного метода чтения (cv.readImage) и заменить.
        while (!end) {
            await sleep(1000);
        } 

        !imgConf.demo && rimraf('buffer/*', () => { console.log('Буффер отчищен') });

        console.log(result);
        return result;
    } catch(err) {
        throw err;
    }
}

module.exports = {
    OCR,
}

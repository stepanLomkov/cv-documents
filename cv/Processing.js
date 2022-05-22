const _ = require('lodash');
const { saveImage } = require('./Common');

async function getFullscreenPhoto(img, imgConf) {
    try {
        const { lower1, upper1, green } = imgConf;
        // копирование исходного фото
        const process = img.copy();
        // ковектирование в HSV
        process.convertHSVscale();
        // извлечение определенного диапозона
        process.inRange(lower1, upper1);
        // сохранение
        await saveImage(process, imgConf);

        // копирование исходного фото
        const contourImg = img.copy();
        
        // поиск контуров
        const contours = process.findContours();
        const possibleContour = getPossibleContour(contours, imgConf, contourImg);
        // сохранение фото
        await saveImage(contourImg, imgConf);
        
        // работа с контурами
        const warpImg = getWarpImg(possibleContour, img);
        // сохранение транформированного фото
        await saveImage(warpImg, imgConf)

        return warpImg;
    } catch(err) {
        throw err;
    }
}

// нахождение расстояния между точками
function pointWidth(p1, p2) {
    return Math.sqrt(Math.pow((p2.x-p1.x), 2) + Math.pow((p2.y-p1.y), 2));;
}

// определение максимальной длинны и ширины
function getMaxSize(p1, p2, p3, p4) {
    return Math.round(_.max([ pointWidth(p1, p2), pointWidth(p3, p4) ]));
}

// выравнивание координат точек контуров в необходимом порядке (top-left, top-right, bottom-right, bottom-left)
function pointOrder(point) {
    const ordered = [];

    const sum = [];
    for (const i in point) {
        sum[i] = point[i].x+point[i].y;
    }

    ordered[0] = point[sum.indexOf(_.min(sum))];
    ordered[2] = point[sum.indexOf(_.max(sum))];

    const diff = [];
    for (const i in point) {
        diff[i] = point[i].x-point[i].y;
    }

    ordered[1] = point[diff.indexOf(_.max(diff))];
    ordered[3] = point[diff.indexOf(_.min(diff))];

    return ordered;
}

function getPossibleContour(contours, imgConf, contourImg) {
    for (let i = 0; i < contours.size(); i++) {
        // условие минимальной площади контура
        if (contours.area(i) < imgConf.minArea) continue;

        // корректировка контуров
        const arcLength = contours.arcLength(i, true);
        contours.approxPolyDP(i, imgConf.arcLength * arcLength, true);

        if (contours.cornerCount(i) === 4) {
            //вырисовка контуров
            contourImg.drawContour(contours, i, imgConf.green);
            // сортировка координат в необходимом порядке
            return pointOrder(contours.points(i));
        }
    }
}

function getWarpImg(possibleContour, img) {
    // копирование исходного фото
    const tmpWarpImg = img.copy();

    if(!possibleContour){
        return tmpWarpImg;
    }

    const point = possibleContour;

    // определение максимальной длинны и ширины
    const maxWidth = getMaxSize(point[0], point[1], point[3], point[2]); 
    const maxHeight = getMaxSize(point[0], point[3], point[1], point[2]);

    // запись координат
    const srcWarp = [point[0].x, point[0].y, point[1].x, point[1].y, point[2].x, point[2].y, point[3].x, point[3].y];
    // запись расстояний 
    const dstWarp = [0, 0, maxWidth, 0, maxWidth, maxHeight, 0, maxHeight];
    // трансформация перспективы
    const perspective = tmpWarpImg.getPerspectiveTransform(srcWarp, dstWarp);
    tmpWarpImg.warpPerspective(perspective, maxWidth, maxHeight, [255, 255, 255]);
    return tmpWarpImg;
}

module.exports = {
    getFullscreenPhoto,
}
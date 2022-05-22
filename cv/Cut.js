const { VIM, VIM_COORDINATES, BRAND, BRAND_COORDINATES, YEAR, YEAR_COORDINATES, COLOR, COLOR_COORDINATES, POWER, POWER_COORDINATES } = require('./Const');

function cutImage(warpImg, payload) {
    const data = warpImg.copy(), height = warpImg.height(), width = warpImg.width();
    const { x1C, y1C, x2C, y2C } = getCoordinates(payload);
    
    // определение координат участка текста (опираясь на пропорцианальность)
    const x1 = Math.round(width * x1C), y1 = Math.round(height * y1C), x2 = Math.round(width * x2C), y2 = Math.round(height * y2C);
    const srcWarp1 = [x1, y1, x2, y1, x2, y2, x1, y2];
    const dstWarp1 = [0, 0, x2-x1, 0,x2-x1, y2-y1, 0, y2-y1];

    // транформация фото
    const perspective1 = data.getPerspectiveTransform(srcWarp1, dstWarp1);
    data.warpPerspective(perspective1, x2-x1, y2-y1, [255, 255, 255]);

    return data;
}

function getCoordinates(fieldType) {
    switch(fieldType) {
        case VIM:
            return VIM_COORDINATES;
        case BRAND:
            return BRAND_COORDINATES;
        case YEAR:
            return YEAR_COORDINATES;
        case COLOR:
            return COLOR_COORDINATES
        case POWER:
            return POWER_COORDINATES;
        default:
            throw new Error(`Координаты с типом ${fieldType} не найдены!`)
    }
}

module.exports = {
    cutImage,
}
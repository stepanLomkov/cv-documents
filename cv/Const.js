// Поля СТС
const VIM = 'VIM';
const BRAND = 'brand';
const YEAR = 'year';
const COLOR = 'color';
const POWER = 'power';

// Координаты полей относительно высоты
const VIM_COORDINATES = Object.freeze({
    x1C: .115389786,
    y1C: .2950962,
    x2C: .5907295,
    y2C: .3385876,
});
const BRAND_COORDINATES = Object.freeze({
    x1C: .44073,
    y1C: .329253,
    x2C: .966261,
    y2C: .364575,
});
const YEAR_COORDINATES = Object.freeze({
    x1C: .531915,
    y1C: .449957,
    x2C: .653495,
    y2C: .503549,
});
const COLOR_COORDINATES = Object.freeze({
    x1C: .212766,
    y1C: .571862,
    x2C: .509119,
    y2C: .628853,
});
const POWER_COORDINATES = Object.freeze({
    x1C: .780274,
    y1C: .614523,
    x2C: .957447,
    y2C: .658446,
});

// Список полей
const FIELDS = [
    BRAND,
    COLOR,
    POWER,
    VIM,
    YEAR,
]
// Изначальное состояние полей
const ITIN_RESULT = FIELDS.reduce((acc, field) => ({ ...acc, [field]: undefined}), {});

module.exports = {
    BRAND_COORDINATES,
    BRAND,
    COLOR_COORDINATES,
    COLOR,
    ITIN_RESULT,
    FIELDS,
    POWER_COORDINATES,
    POWER,
    VIM_COORDINATES,
    VIM,
    YEAR_COORDINATES,
    YEAR,
}

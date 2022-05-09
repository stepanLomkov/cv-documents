const express = require('express');
const vehicleCertificate = require('./vehicleCertificate');

const router = express.Router();

/** Роутер распознания свидетельства ТС. */
router.post('/vehicle-certificate', vehicleCertificate.post);

module.exports = router;

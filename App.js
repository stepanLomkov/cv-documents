const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors')
const ruDocuments = require('./routes').ru;

const app = express();

const port = 1701

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

app.use(cors());
app.use(fileUpload());

/** Роутер распознания российских документов. */
app.use('/api/cv-document/ru', ruDocuments);

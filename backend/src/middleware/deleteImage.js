const fs = require('fs')
const path = require('path');
const root = path.dirname(require.main.filename);

exports.deleteImage = async (req, res, next) => {
    await res.on('finish', () => {
        fs.unlink(root + '/src/resources/certificate.png', err => {
            console.log(err);
        });
    });

    next();
};
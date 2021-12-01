const fs = require('fs')

exports.deleteImage = async (req, res, next) => {
    await res.on('finish', () => {
        fs.unlink('/home/jelly/Desktop/DB/course_project-db/backend/src/resources/certificate.png', err => {
            console.log(err);
        });

        console.log('File removed');
    });

    next();
};
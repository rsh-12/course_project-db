const Jimp = require('jimp');
const path = require('path');
const root = path.dirname(require.main.filename);

const resources = root + '/src/resources/';
const template = resources + 'certificate-template.png';

exports.createCertificate = async (text) => {
    const image = await Jimp.read(template);
    const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);

    await image.print(font, 270, 310, {text, alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER}, 370, 150);

    const createdCertificate = resources + 'certificate.png';
    await image.writeAsync(createdCertificate);

    return createdCertificate;
}



const path = require('path');
const fs = require('fs-extra');
const { randomNumber } = require('../helpers/libs');
const { Image } = require('../models/index');
const ctrl = {};

ctrl.index = (req, res) => {

};

ctrl.create =  (req, res) => {

    const saveImage = async () => {

        const imgURL = randomNumber();
        const images = await Image.find({ filename: imgURL });
        if (images.length > 0) {
            saveImage();
        } else {

            console.log(imgURL);
            const imageTempPath = req.file.path;
            const extension = path.extname(req.file.originalname).toLowerCase();
            const targetPath = path.resolve(`src/public/upload/${imgURL}${extension}`);
            //console.log(req.file);

            if (extension === '.png' || extension === '.jpg' || extension == 'jpeg' || extension === '.gif') {
                
                await fs.rename(imageTempPath, targetPath);
                const newImg = new Image({
                    title: req.body.title,
                    filename: imgURL + extension,
                    description: req.body.description
                });
                //guardamos en la base de datos
                const imageSaved = await newImg.save();
                //res.redirect('/images/:image_id');
                res.send('funciona');
            } else {

                await fs.unlink(imageTempPath);
                res.status(500).json({ error: 'Solo se puede cargar Imagenes' });
            }
            
        }


    };

    saveImage();


};

ctrl.like = (req, res) => {

};


ctrl.comment = (req, res) => {

};

ctrl.remove = (req, res) => {

};
module.exports = ctrl;
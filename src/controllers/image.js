const path = require('path');
const fs = require('fs-extra');
const md5 = require('md5');
const { randomNumber } = require('../helpers/libs');
const { Image, Comment } = require('../models/index');



const ctrl = {};

ctrl.index = async (req, res) => {
    const image = await Image.findOne({filename: {$regex: req.params.image_id}});
    console.log(image);
    res.render('image', {image});
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
                res.redirect('/images/' + imgURL);
                //res.send('funciona');
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


ctrl.comment = async (req, res) => {
    
    const image = await Image.findOne({filename: {$regex: req.params.image_id}});
    if (image) {
        const newComment = new Comment(req.body);
        newComment.gravatar = md5(newComment.email);
        newComment.image_id = image._id;
        //console.log(newComment);
        await newComment.save();
        res.redirect('/images/' + image.uniqueId);
    }
    
    //console.log(newComment);
    
};

ctrl.remove = (req, res) => {

};
module.exports = ctrl;
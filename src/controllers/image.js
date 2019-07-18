const path = require('path');
const fs = require('fs-extra');
const { randomNumber } = require('../helpers/libs');
const ctrl = {};

ctrl.index = (req,res) => {

};

ctrl.create = async (req,res) => {
    
    const imgURL = randomNumber();
    console.log(imgURL);
    const imageTempPath = req.file.path;
    const extension = path.extname(req.file.originalname).toLowerCase();
    const targetPath = path.resolve(`src/public/upload/${imgURL}${extension}`);
    //console.log(req.file);
    if(extension === '.png' || extension === '.jpg' || extension == 'jpeg' || extension === '.gif'){
        await fs.rename(imageTempPath, targetPath);
    }
    res.send('funciona');
};

ctrl.like = (req,res) => {
    
};


ctrl.comment = (req,res) => {
    
};

ctrl.remove = (req,res) => {
    
};
module.exports = ctrl;
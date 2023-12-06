const photo = require("../models/Photo");
const Photo = require('../models/Photo');
const fs = require('fs');

exports.getAllphoto = async (req, res) => {

    const page = req.query.page || 1;
    console.log(page);
    const photosPerPage = 3;
    const totalPhotos = await Photo.find().countDocuments();

    const photos = await photo.find({}).sort('-dateCreated')
    .skip((page-1) * photosPerPage)
    .limit(photosPerPage);

    res.render('index', {
        photos , 
        current : page , 
        pages : Math.ceil( totalPhotos / photosPerPage)
    })
}

exports.getPhoto = async (req, res) => {
    const photoGelen = await photo.findById(req.params.id);
    res.render("photo", {
        photoGelen
    })
}

exports.createPhoto = async (req, res) => {

    const uploadDir = 'public/uploads';

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    sampleFile = req.files.photo;
    uploadPath = __dirname + '/../public/uploads/' + sampleFile.name;

    sampleFile.mv(uploadPath, function (err) {
        if (err) {
            return res.status(500).send(err);
        }
    })

    const olusturulanPhoto = {
        title: req.body.title,
        description: req.body.description,
        image: '/uploads/' + sampleFile.name
    }
    await photo.create(olusturulanPhoto);
    console.log(olusturulanPhoto);
    res.redirect('/')
}

exports.updatePhoto = async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id });
    photo.title = req.body.title
    photo.description = req.body.description
    photo.save()

    res.redirect(`/photos/${req.params.id}`)
}

exports.deletePhoto = async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id });
    let deletedImage = __dirname + '/../public' + photo.image;
    console.log(deletedImage)
    if (fs.existsSync(deletedImage)) {
        fs.unlinkSync(deletedImage);
    }
    await Photo.findByIdAndDelete(req.params.id);
    res.redirect('/');
}
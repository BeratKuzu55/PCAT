//console.log("merhaba");
const express = require('express');
const ejs = require("ejs");
const path = require('path');
const fs = require("fs");
const mongoose = require("mongoose");
const methodOverride = require('method-override');
const fileupload = require("express-fileupload");
const photo = require("./models/Photo");
const Photo = require('./models/Photo');
const { getAllphoto, getPhoto, updatePhoto, deletePhoto, createPhoto } = require('./controllers/photoControllers');
const { getAboutPage, getAddPage, getEditPage } = require('./controllers/pageController');
const app = express();

mongoose.connect("mongodb://localhost/pcat-test-db");

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileupload());
app.use(methodOverride('_method' , {
  methods : ['POST' , 'GET']
}));

app.get('/', getAllphoto);
app.get('/about', getAboutPage);
app.get('/add', getAddPage);
app.get('/photo', (req, res) => {
  res.render("photo");
});
app.get('/photos/edit/:id', getEditPage);
app.put('/photos/:id', updatePhoto);
app.delete('/photos/:id', deletePhoto);
app.get("/photos/:id", getPhoto);
app.post('/photos', createPhoto);



const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
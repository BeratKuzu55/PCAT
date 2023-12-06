const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/pcat-test-db');

const PhotoSchema = new Schema({
    title: String,
    description: String,
})

const Photo = mongoose.model('Photo', PhotoSchema);

Photo.create({
    title: 'Photo Title 2',
    description: 'Photo description 2 lorem ipsum',
});

//read a photo
Photo.find({}, (err, data) => {
    console.log(data);
  });
  
  //update photo
  const id1 = '';
  /*
  Photo.findByIdAndUpdate(
    id,
    {
      title: 'Photo Title 111 updated',
      description: 'Photo description 111 updated',
    },
    {
        new: true
    },
    (err, data) => {
      console.log(data);
    }
  );  */
  
  //delete a photo
  const id2 = '';
  /*
  Photo.findByIdAndDelete(id, (err, data) => {
    console.log('Photo is removed..');
  });  */
//require the nedb module
var Datastore = require('nedb'),
    fs = require('fs');

//initialize two nedb databases. Notice the autoload parameter
var photos = mew Datastore({filename: __dirname + '/data/photos', autoload:true}),
    users = new Datastore ({filename:__dirname + '/data/users', autoload:true});

// create a unique index for the photo name and user ip
photos.ensureIndex({filedName: 'name', unique: true});
users.ensureIndex({fieldname: 'ip', unique: true});

//load all images from the public/photos in the database
var photos_on_disk = fs.readdirSync(__dirname + '/public/photos');

//Insert the photos in the database.  This is executed on every
//start up of your application, but because there is a unique constraing
//on the name field, subsequent writes will fail
//and you will still have only one record per image

photos_on_disk.forEach(function(photo){
    photos.insert({
        name:photo,
        likes: 0,
        dislikes: 0;
    });
});

module.exports = {
    photos: photos,
    users: users
};
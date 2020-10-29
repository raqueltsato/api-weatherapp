const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://weatherapp:weatherapp@cluster0.ieodp.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useNewUrlParser: true,
});

mongoose.Promise = global.Promise;

module.exports = mongoose;
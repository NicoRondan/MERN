const mongoose = require('mongoose');

//Creamos la base de datos
const URI = process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost/databasetest';


mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const connection = mongoose.connection;

//Una vez realizada la conexión
connection.once('open', () => {
    console.log('DB is connected');
})
//RECETA DE COCINA
//Establecer conexión con la BBDD de MongoDB

import mongoose, { ConnectionOptions } from 'mongoose';
import config from './config/config';

const dbOptions: ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}

mongoose.connect(config.DB.URI, dbOptions);

mongoose.set('useFindAndModify', false);

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Conexión a MongoDB establecida');
})

connection.on('error', err => {
    console.log(err);
    process.exit(0);
})
//Importar el paquete express
const express = require('express');
const path = require('path');

//Leer el archivo env. para establecer las variavles de entoro
require('dotenv').config();

//Crear una aplicación de Express
const app = express();

//Crear el Node Server
 //Al recibir como parámetro el app, toma toda la configuración que viene en app
 //y a su vez anexa (crea la relación) lo que la app
const server = require('http').createServer(app);
//Configuración del servidor de Socket. Recibe como argumento el
//servidor que acabamos de crear
//const io = require('socket.io')(server);

//Como se separaron los eventos al socket.js, se debe exportar el io
module.exports.io = require('socket.io')(server);

//Mensajes de Sockets
require('./sockets/socket');


//Path publico
//__dirname esto apuntda a donde sea que este montado el servidor
//El siguiente parámetro indica a que carpeta debe apuntar
const publicPath = path.resolve( __dirname, 'public');

//Indicar a la aplicación que meustre el publicpath
app.use( express.static(publicPath));

//Escuchar peticiones, en este caso el 3000 y llamar el callback,
//en caso de que haya un error como que el puerto este ocupado
//puerto fijo
//app.listen(3000, (err) =>{
//Puerto desde las variables de entorno 
server.listen(process.env.PORT, (err) =>{
    //Si hay un error, mostrarlo en consola
    if (err) throw new Error(err);
    //Si no hay error, mostrar el siguiente mensaje
    console.log('Servidor corriendo en puerto !!', process.env.PORT);    
});
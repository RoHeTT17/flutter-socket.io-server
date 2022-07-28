
//importar el io del index.js. 
//Es un importanción con nombre por eso va entre {}
const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

//Cada cambio que se hace  vuelve a ejecutar todo el codigo de este archivo
//La idea es que este arreglo se mantenga persistente, a menos que se 
//haga un cambio en el backend.
const bands = new Bands();

bands.addBand(new Band('Mana') );
bands.addBand(new Band('Enanitos') );
bands.addBand(new Band('Heroes') );
bands.addBand(new Band('Hombres G') );
bands.addBand(new Band('Scorpions') );

//console.log(bands);
//Mensajes de Sockets

//El client es un dispositivo que se acaba de conectar al socket server
io.on('connection', client => {
    //Cuando la pagina web (index.html en este caso), se carga, crea una
    //conexión al socket server y esa conexión del navegador web, cae (guarda)
    //en este client
    console.log('Cliente conectado');

    //Emitir el mensaje unicamente al cliente que se esta conectando, manda el 
    //arreglo de las bands que estan registradas en el servidor
    client.emit('active-bands',bands.getBands());

    //Este es el callbak que se va a disparar cuando este cliente 
    //en particular se desconecte
    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
     });

     //Escuchar evento "mensaje"
     client.on('mensaje',(payload) =>{
        console.log('Mensaje!!', payload);

        //El servidor mande un mensaje
        //client para el cliente en particular
        //io para todo el servidor (todos los clientes conectados)
        io.emit('mensaje',{admin: 'nuevo mensaje'});

     });

     //"Aguien" hara que el servidor escuche este mensaje y asu vez este emitira el mensaje a los clientes 
     client.on('emitir-mensaje', (payload)=>{
         //emitira un nuevo-msj que es lo que la app esta escuchando
         /*
           io.emit                =>Emite a todos los clientes, incluyendo al mismo que lo emitio
           client.broadcast.emit  =>Emite a todos los clientes, excluye a quien lo emitio
          */ 
         //io.emit('nuevo-msj',payload); 

          //console.log(payload)

         client.broadcast.emit('nuevo-msj',payload); 
     });

     
     //Escucha el evento (se manda desde flutter)
     client.on('vote-band', (payload) =>{

        //console.log(payload.id);
        //incrementar votos    
        bands.voteBand(payload.id);   

        //avisa a todos los dispositivos conectados que hagan un "refesh" con la información
        //actualizada del arreglo bands
        io.emit('active-bands',bands.getBands());

        //console.log(payload); 

     });

     //Escuchando evento add-band
     client.on('add-band', (payload)=>{
         //console.log(payload.name);   
         //Crear el "objeto" pasandole el nombre
        const newBand = new Band (payload.name);

        bands.addBand(newBand);
        io.emit('active-bands',bands.getBands());
    });

    client.on('delete-band', (payload) =>{

        //console.log(payload.id);
        //incrementar votos    
        bands.deleteBand(payload.id);   

        //avisa a todos los dispositivos conectados que hagan un "refesh" con la información
        //actualizada del arreglo bands
        io.emit('active-bands',bands.getBands());

        //console.log(payload); 

     });


  });
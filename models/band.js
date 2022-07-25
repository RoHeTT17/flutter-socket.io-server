//importar el paquete de uuid, le agrego un alias, dice que para
//mas información, revisar la documentación, lo primero al parecer
//es la versión v4 y después el alias
const{v4:uuidV4} = require('uuid');


class Band{

    //En javaScript las propiedades se definen en el constructor
    constructor (name = 'no-name'){

           this.id          = uuidV4();
           this.name        = name;
           this.votes       = 0; 
    }

}

//Para poder usar esta clase en otro lugar, se debe exportar.
//PAra exportar la clase
module.exports = Band; 
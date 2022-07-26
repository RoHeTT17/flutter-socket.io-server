//Esta clase es una colección de band, esla que va a manejar las de 
//clase Band de Flutter

const Band = require("./band");

class Bands{

    constructor(){
        this.bands = [];
    }

    addBand(band = new Band()){

        //console.log('addBand: '+band)
        //Agregar una nueva band
        this.bands.push(band); 

    }    

    //Obtener las Bands
    getBands(){
        return this.bands;
    }

    //Borrar una band
    deleteBand(id = ''){
        //Solo se esta "simulando el borrado", porque realmente solo esta filtrando
        this.bands = this.bands.filter (band => band.id != id);
    }

    voteBand ( id = ''){
        //Si esto estuviera a la base de datos, no se necesitaría este barrido.
        this.bands = this.bands.map(band =>{

            // console.log("bandid "+band.id);   
            // console.log("id.....");
            // console.log(id); 

            if(band.id == id){
                band.votes++;
                return band;
            }else{
                return band;
            }

        });
    }
}

module.exports = Bands;
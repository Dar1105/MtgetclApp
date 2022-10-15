import { Document, model, Schema } from "mongoose";


const cartaSchema = new Schema({

    nombre:{
        type: String,
        require : [true,'El nombre es requerido']
    },
    edicion:{
        type: String,
    },
    tipoCarta:{
        type: String,
        require: [true, 'El tipo de carta es requerido']
    },
    colorCarta:{
        type: String,
    },
    imagen:{
        type: String,
        require: [true, 'La imagen es requeridad']
    }

});

interface ICarta extends Document{
    nombre:string,
    edicion:string,
    tipoCarta:string,
    colorCarta:string,
    imagen:string,


};

export const Carta = model<ICarta>('Carta',cartaSchema);
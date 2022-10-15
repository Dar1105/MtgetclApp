"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Carta = void 0;
const mongoose_1 = require("mongoose");
const cartaSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es requerido']
    },
    edicion: {
        type: String,
    },
    tipoCarta: {
        type: String,
        require: [true, 'El tipo de carta es requerido']
    },
    colorCarta: {
        type: String,
    },
    imagen: {
        type: String,
        require: [true, 'La imagen es requeridad']
    }
});
;
exports.Carta = (0, mongoose_1.model)('Carta', cartaSchema);

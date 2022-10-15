"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carta_model_1 = require("../models/carta.model");
const cartaRoutes = (0, express_1.Router)();
cartaRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cartas = yield carta_model_1.Carta.find();
    return res.json({
        ok: true,
        cartas
    });
}));
cartaRoutes.get('/paging', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cardPage = 5;
    let page = Number(req.query.page) || 1;
    let skip = page - 1;
    skip = skip * cardPage;
    const cartas = yield carta_model_1.Carta.find().skip(skip).limit(cardPage);
    return res.json({
        ok: true,
        cartas
    });
}));
cartaRoutes.post('/', (req, res) => {
    const body = req.body;
    const carta = {
        nombre: body.nombre,
        edicion: body.edicion,
        tipoCarta: body.tipoCarta,
        colorCarta: body.colorCarta,
        imagen: body.imagen
    };
    carta_model_1.Carta.create(carta).then(cartaDb => {
        return res.json({
            ok: true,
            cartaDb
        });
    }).catch(err => {
        return res.json({
            ok: false,
            err
        });
    });
});
// Toda la informacion del cliente se almacena en req
cartaRoutes.put('/:id', (req, res) => {
    const cartaId = req.params.id;
    const body = req.body;
    const carta = {
        nombre: body.nombre,
        edicion: body.edicion,
        tipoCarta: body.tipoCarta,
        colorCarta: body.colorCarta,
        imagen: body.imagen
    };
    carta_model_1.Carta.findByIdAndUpdate(cartaId, carta).then(cartaDb => {
        return res.json({
            ok: true,
            cartaDb
        });
    });
});
cartaRoutes.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cartaId = req.query.id;
    if (!cartaId) {
        return res.json({
            ok: false,
            msj: "El registro solicitado no existe"
        });
    }
    carta_model_1.Carta.findByIdAndDelete(cartaId).then(carta => {
        return res.json({
            ok: true,
            msj: "Eliminado correctamente"
        });
    }).catch(err => {
        return res.json({
            ok: false,
            msj: "El registro solicitado no existe"
        });
    });
}));
exports.default = cartaRoutes;

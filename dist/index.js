"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const server_1 = __importDefault(require("./classes/server"));
const carta_routes_1 = __importDefault(require("./routes/carta.routes"));
const default_routes_1 = __importDefault(require("./routes/default.routes"));
const server = new server_1.default();
server.app.use(body_parser_1.default.json());
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use('/', default_routes_1.default);
server.app.use('/cartas', carta_routes_1.default);
mongoose_1.default.connect('mongodb+srv://usr_cartas:cartas2022@cluster0.tnz5agi.mongodb.net/mtgDb', (error) => {
    if (error) {
        throw error;
    }
    console.log('Base de datos ONLINE');
});
server.Start(() => {
    console.log(`Servidor corriendo en puerto: ${server.port}`);
});

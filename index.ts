import bodyParser from "body-parser";
import mongoose from "mongoose";
import Server from "./classes/server";
import cartaRoutes from "./routes/carta.routes";
import defaultRoutes from "./routes/default.routes";

const server = new Server();
server.app.use(bodyParser.json());
server.app.use(bodyParser.urlencoded({extended:true}));

server.app.use('/',defaultRoutes);
server.app.use('/cartas',cartaRoutes)

mongoose.connect('mongodb+srv://usr_cartas:cartas2022@cluster0.tnz5agi.mongodb.net/mtgDb',(error)=>{
    if(error){
        throw error
        }
    console.log('Base de datos ONLINE');
});

server.Start(()=>{
    console.log(`Servidor corriendo en puerto: ${server.port}`);
});
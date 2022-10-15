import { Request, Response, Router } from "express";
import { Carta } from "../models/carta.model";

const cartaRoutes = Router();

cartaRoutes.get('/',async(req:Request,res:Response)=>{

    const cartas = await Carta.find();

    return res.json({
        ok:true,
        cartas
    })
});

cartaRoutes.get('/paging', async(req:Request,res:Response)=>{
    
    let cardPage=5;
    let page =Number(req.query.page) || 1;
    let skip = page-1;
    skip=skip*cardPage;

    const cartas = await Carta.find().skip(skip).limit(cardPage);

    return res.json({
        ok:true,
        cartas
    })

});

cartaRoutes.post('/',(req:Request,res:Response)=>{

    const body = req.body;
    const carta = {
        nombre:body.nombre,
        edicion:body.edicion,
        tipoCarta:body.tipoCarta,
        colorCarta:body.colorCarta,
        imagen:body.imagen
    }

    Carta.create(carta).then(cartaDb =>{

        return res.json({
            ok:true,
            cartaDb
        })

    }).catch(err=>{
        return res.json({
            ok:false,
            err
        })
    })
})

// Toda la informacion del cliente se almacena en req

cartaRoutes.put('/:id',(req:Request,res:Response)=>{
    
    const cartaId = req.params.id;
    const body = req.body;

    const carta = {
        nombre:body.nombre,
        edicion:body.edicion,
        tipoCarta:body.tipoCarta,
        colorCarta:body.colorCarta,
        imagen:body.imagen
    }
    
    Carta.findByIdAndUpdate(cartaId,carta).then(cartaDb=>{

        return res.json({

            ok:true,
            cartaDb
        
            })


        })

    })


    cartaRoutes.delete('/', async (req:Request,res:Response)=>{

        const cartaId =req.query.id;

        if(!cartaId){

            return res.json({

                ok:false,
                msj:"El registro solicitado no existe"
            })
        }

        Carta.findByIdAndDelete(cartaId).then(carta=>{
                return res.json({
                ok:true,
                msj:"Eliminado correctamente"
            })
            
        }).catch(err=>{
            return res.json({
            ok:false,
            msj:"El registro solicitado no existe"
        })
        
    })

})
            export default cartaRoutes;

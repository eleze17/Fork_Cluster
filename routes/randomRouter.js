import { Router } from "express"
export const randomRouter = Router()
import {fork} from 'child_process'



randomRouter.get('/',(req,res)=>{

    const forked = fork('./api/child.js')
    forked.on('message',msg => {
    if (msg== 'listo' ) {
        req.query.cantidad  = req.query.cantidad == undefined? 1000 :  req.query.cantidad 
        console.log( req.query.cantidad )
        forked.send(req.query.cantidad)
    } else{
        res.send({msg})
    }
})



})
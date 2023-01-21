import mongoose from 'mongoose'
import {usuarios} from '../modelos/modelo.js'
import * as dotenv from 'dotenv' 
dotenv.config()

mongoose.set('strictQuery', true)

 export class crudMongo{
    constructor(model){
        this.model = model
    }

        async conectar() { const connection = await mongoose.connect(process.env.cadenaConex, {
        useNewUrlParser: true,
        useUnifiedTopology: true })
        }

    async  insertar(docu){

        try { 
            
         this.conectar()
            
                     
                
                if (this.model == "productos"){
                console.log('mongo conectado')
                    const docNuevo =  new productos(docu)
                    await docNuevo.save() 
                   }
                 else if(this.model == "carritos") {
                console.log('mongo conectado')
                    const docNuevo = new  carritos(docu)
                    await docNuevo.save()
                  
                }
                else{
                    console.log('mongo conectado')
                    const docNuevo = new  usuarios(docu)
                    await docNuevo.save()
                    return docNuevo;
                }
            
            console.log('documento agregado!')
        }  catch(error){(console.log(error))  }   
    
    
}


async  eliminar(dato,res){

    try { 
        
     this.conectar()
        
                 
            
            if (this.model == "productos"){
            console.log('mongo conectado')
            let filtro = {"id":dato}
            let del = await productos.deleteMany(filtro) 
            res.send('documento borrado!')}

             else if(this.model == "carritos") {
            console.log('mongo conectado')
            let filtro = {"id":dato}
            let del = await carritos.deleteMany(filtro)  
            res.send('documento borrado!')}

            else {  console.log('mongo conectado')
            let filtro = {"id":dato}
            let del = await usuarios.deleteMany(filtro)  
            res.send('documento borrado!')

            }
     

        
        
    }  catch(error){(console.log(error))  }   


}



async  actualizar(dato,nuevovalor,res){

    try { 
        
     this.conectar()
        
                 
            
            if (this.model == "productos"){
            console.log('mongo conectado')
            let filtro = {"id":dato}
            let campo = nuevovalor.dato
            console.log(campo)
            let upd = await productos.updateMany(filtro,{$set: campo }) 
            res.send('documento actualizado!')
      
             }
             else if  (this.model == "carritos") {
            console.log('mongo conectado')
            let filtro = {"id":dato}
            let campo = nuevovalor.dato
            let upd = await carritos.updateMany(filtro,{$set: campo }) 
            res.send('documento actualizado!')}
            else{
                console.log('mongo conectado')
                let filtro = {"id":dato}
                let campo = nuevovalor.dato
                let upd = await usuarios.updateMany(filtro,{$set: campo }) 
                res.send('documento actualizado!')


            }
        
    }  catch(error){(console.log(error))  }   

}
    async leer (dato,res){

        try { 
            
         this.conectar()
            
                     
                
                if (this.model == "productos"){
                console.log('mongo conectado')
                let buscado = await productos.find(dato==undefined?{}:{id:dato}) 
                console.log('documento buscado!' + buscado)
                res.send(buscado)
          
                 }
                 else if  (this.model == "carritios"){
                console.log('mongo conectado')
                let buscado = await carritos.find(dato) 
                console.log('documento buscado!' + buscado)
                res.send(buscado)}
                else{
                    console.log('mongo conectado')
                    let buscado = await usuarios.find(dato) 
                   
                    if (buscado.length > 0){
                    console.log('documento buscado!' + buscado[0].nombre)
                    return buscado[0]
                    }else
                    {
                        return 
                        // res.send('Validar usuario y contraseña')
                    }
                }
            
        }  catch(error){(console.log(error))  }   
    
    
    }
    










}

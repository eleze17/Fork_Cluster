import mongoose from 'mongoose'

const postColeccion = 'productos';

const postSchema= new mongoose.Schema({
                id_post : {type: Number,required:true},
                id_autor:{type: Number,required:true,max:200},
                comentario:{type: String,required:false,max:2000},
                imagen:{type: Number,required:true},
                stock:{type: Number,required:true}


})


 export const posteo = mongoose.model(postColeccion,postSchema);

const carritosColeccion = 'carritos';

const carritosSchema= new mongoose.Schema({
                id : {type: Number,required:true},
                prods:{type: Array,required:true},
                monto:{type: String,required:false,max:200},
                usuarioCarrito:{type: String,required:true},
                time:{type: Date, default: Date.now}


})

 export const carritos = mongoose.model(carritosColeccion,carritosSchema);

 const usuarioColeccion = 'usuarios';

 const usuarioSchema= new mongoose.Schema({
                 id : {type: String,required:true},
                 nombre:{type: String,required:true},
                 apellido:{type: String,required:false,max:200},
                 email:{type: String,required:true},
                 contrasena:{type: String,required:true}
               
 
 })
  
export const usuarios = mongoose.model(usuarioColeccion,usuarioSchema);

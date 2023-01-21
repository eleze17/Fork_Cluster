import { Router } from "express"
export const regRouter = Router()
import {crudMongo} from '../contenedorMongo/mongo.js'
import  {v4 as uuidv4} from 'uuid';
const mongoProd = new crudMongo('usuarios')
import session from 'express-session'
import passport from 'passport'
import Stra from 'passport-local'

let LocalStrategy = Stra.Strategy   
passport.use('signup', new LocalStrategy({
    passReqToCallback:true},(req,username,password,done) =>{
  async function consultarUser  () { 
    let user = await mongoProd.leer({'email':username,'contrasena':password})
    console.log(user)

    if (!user){/*aca se ingresa el usuario*/
   
            let {nombre,apellido,username,password} = req.body
            let id = uuidv4();
            
           let usuario_nuevo = await mongoProd.insertar({'id':id,
                       'nombre':nombre,
                       'apellido':apellido,
                        'email':username,
                     'contrasena':password
   })
   console.log(usuario_nuevo)
    return  done(null,usuario_nuevo)}
 else     {
    console.log('ya existe el usuario   ' + user.email)
    return done(null,false)    
   
    }}
  
    consultarUser  ()

    
}
))

passport.serializeUser(function (user, done) {
    done(null, user.email);
  });
  
  passport.deserializeUser(function (email, done) {

    async function consultarUser  () { 
        let user = await mongoProd.leer({'email':email})
       console.log(user)
       if (!user){
              console.log('Usuario no encontrado  ' +  user )
              return  done(null,false)}
          
       done(null,user)}
      consultarUser  ()

   
  });

  regRouter.use(session({
    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000
}
  }))
  
  regRouter.use(passport.initialize());
  regRouter.use(passport.session());

regRouter.get('/',
(req,res)=>{
  // mongoProd.leer(req.params.id,res)
    res.render('registro')

}
)



regRouter.post('/',passport.authenticate('signup', { failureRedirect: '/api/register/failregister', successRedirect: '/api/register/ok' }))


regRouter.get('/failregister', (req, res) => {
    res.send('Ya existe un usuario con ese Mail');
  })


regRouter.get('/ok', (req, res) => {
    let usuario = req.session.passport
    console.log(usuario)
    res.render('formulario',{usuario});
  })
 
  function getLogout(req,res,next){
    req.logout(function(err) {
        if (err) { return next(err); }
        next()
 } )}

regRouter.get('/logout',getLogout,(req,res)=>{ res.render('registro')
})
 


   regRouter.put('/:id?',
    (req,res)=>{
        mongoProd.actualizar(req.params.id,req.body,res)}
    )


    regRouter.delete('/:id?',(req,res)=>{
    mongoProd.eliminar(req.params.id,res)
})


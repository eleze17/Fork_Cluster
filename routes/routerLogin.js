
import { Router } from "express"
export const logRouter = Router()
import {crudMongo} from '../contenedorMongo/mongo.js'
const mongoProd = new crudMongo('usuarios')
import session from 'express-session'
import passport from 'passport'
import Stra from 'passport-local'
let LocalStrategy = Stra.Strategy   
passport.use('login', new LocalStrategy((username,password,done) =>{
  async function consultarUser  () { 
    let user = await mongoProd.leer({'email':username,'contrasena':password})
   console.log(user)
   if (!user){
          console.log('Usuario no encontrado  ' + username + user )
          return  done(null,false)}
      
  return done(null,user)    }
  
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

logRouter.use(session({
    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000
}
  }))
  
  logRouter.use(passport.initialize());
  logRouter.use(passport.session());



logRouter.get('/',
(req,res)=>{
   res.render('login')})

logRouter.post('/',passport.authenticate('login', { failureRedirect: '/api/login/faillogin', successRedirect: '/api/login/ok' }))

logRouter.get('/faillogin', (req, res) => {
        res.send('login-error');
      })


logRouter.get('/ok', (req, res) => {
  let usuario = req.session.passport
  console.log(usuario)
  res.render('formulario',{usuario});

      })

  
   logRouter.put('/:id?',
    (req,res)=>{
        mongoProd.actualizar(req.params.id,req.body,res)}
    )


    logRouter.delete('/:id?',(req,res)=>{
    mongoProd.eliminar(req.params.id,res)
})


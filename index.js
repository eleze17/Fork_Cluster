import express from 'express' 
const app = express()
import {logRouter} from './routes/routerLogin.js'
import {regRouter} from './routes/routerRegister.js'
import {infoRouter} from './routes/infoRouter.js'
import {randomRouter} from './routes/randomRouter.js'
import { engine } from 'express-handlebars'
import yargs  from 'yargs' 
import cluster from 'cluster' 
import os from 'os' 
const numCPUs = os.cpus().length
const argv = yargs(process.argv.slice(2))

console.log(argv.argv)
const args =  argv
.alias({
    p: 'puerto',
    m: 'modo'
})
.default({
    puerto : 8080,
    modo: 'FORK'
})
.argv

const puerto = args.p
const modo = args.m

console.log(puerto + '    ' + modo)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/api/login', logRouter)
app.use('/api/register', regRouter)
app.use('/info', infoRouter)
app.use('/api/randoms', randomRouter)

app.engine('handlebars', engine());
app.set('view engine', 'handlebars')
app.set('views', './views')

 
/*
const PORT = puerto
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))
*/

if (cluster.isPrimary) {
    console.log(numCPUs)
    console.log(`PID MASTER ${process.pid}`)

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }

    cluster.on('exit', worker => {
        console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString())
        cluster.fork()
    })
}
/* --------------------------------------------------------------------------- */
/* WORKERS */
else {
    //console.log(parseInt(process.argv[2]))
    
    app.get('/', (req, res) => {
        res.send(`Servidor express en ${puerto} - <b>PID ${process.pid}</b> - ${new Date().toLocaleString()}`)
    })

    app.listen(puerto, err => {
        if (!err) console.log(`Servidor express escuchando en el puerto ${puerto} - PID WORKER ${process.pid}`)
    })
}


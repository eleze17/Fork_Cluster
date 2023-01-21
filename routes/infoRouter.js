import { Router } from "express"
export const infoRouter = Router()
import os from 'os' 
const numCPUs = os.cpus().length


let  parametros = process.argv[3]
let rutaEjecucion = process.execPath
let version =  process.version;
let id = process.pid;
let sistema = process.platform
let directorio = process.cwd()
let memoria = process.memoryUsage().rss
infoRouter.get('/',
(req,res)=>{
   res.send ({"parametro de entrada ":  parametros,
              "ruta de ejecucion ":  rutaEjecucion,
              "version de node ": version,
              "id del proceso ": id,
              "sistema operativo ": sistema,
              "directorio ":directorio,
              "memoria":memoria,
               "procesadores":numCPUs
})})


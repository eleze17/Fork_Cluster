function getRandomIntInclusive() {
   let min = 1;
   let  max = 1000;
    return Math.floor(Math.random() * (max - min + 1) + min); 
}

let aleatorios = []
let resultado = []
let par = {}
let clave = 0
let c = 0
let i = 0
let suma = 1

process.on('message', msg =>{
    let cantidad =  msg
         
         for (let i = 0 ; i<=cantidad ; i++){
          let aleatorio = getRandomIntInclusive()
          aleatorios.push(aleatorio)
         }
         aleatorios.sort((a,b)=>(a-b))
       

      
         for( c ;c < aleatorios.length;c++ ){
              
            par = {"clave": aleatorios[c],
                "cantidad": 1}
               
                i = c
                while(aleatorios[i]===aleatorios[i+1]){
                    suma = suma + 1
                    clave = aleatorios[i]
                    i++
                    par = {"clave": clave,
                    "cantidad": suma}
                    
                  }
                  suma = 1
                  
            c = i
            resultado.push (par)
            
          
                
           
          //  resultado.push(r)
            //console.log(resultado)
         }
        
         process.send(resultado)
         process.exit()
    }

)

process.send('listo')
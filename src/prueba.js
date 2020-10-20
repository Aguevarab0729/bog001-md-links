const path = require('path');
const fs = require('fs');
const { rejects } = require('assert');
const archivo = './README.md';

const rutaAbsoluta = path.resolve(archivo);

const readFile = (route) => {
  const promise = new Promise((resolve, reject) => {
    fs.readFile(route, 'utf8', (err, data) =>{
      if(err){
        reject('archivo invalido')
      }
      else{
        resolve(data)
      }
    })
  })
  return promise;
}

readFile(rutaAbsoluta)
.then((data) => {
  console.log(data)
})

const extension = path.extname(archivo);


/* const validarRuta = (ruta) => {
  if(path.extname(ruta) === '.md'){
    readFile(ruta)
  }
  else{
    alert('Archivo NO tiene extencion md')
  }
}

const LeerArchivo = (archivo) => {
  fs.readFile(archivo, 'utf8', (err, data) => {
    if(err){
      console.log(error);
      return
    }
    else{
      mark(data)
    }
  })
}
 */

const path = require('path');
const http = require('http');
const https = require('https')
const fs = require('fs');
const { rejects } = require('assert');
const file = './README.md';
const marked = require('marked');

//path resolve es el método que resuelve una secuencia de rutas o segmentos de ruta en una ruta absoluta 
//devuelve una cadena 
const absoluteRoute = path.resolve(file);

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

readFile(absoluteRoute)
.then((data) => {
  console.log(data)
})

/* const extension = path.extname(file); 
console.log(extension);*/

//Verifica si es Archivo o Directorio 
const fileOrDirectory = (route) => {
  const files = [];
  if (path.extname(route) === '.md') {
      files.push(route)
      return files
  } else {
      const directory = fs.readdir(route);
      const filterFile = directory.filter(file => path.extname(file) === '.md')
      filterFile.forEach((elem) => {
          const validFiles = path.join(route, elem);
          files.push(validFiles);
      })
      return files
  }
}
console.log(fileOrDirectory(absoluteRoute));

const extractLinks = (route => {
  return new Promise((resolve, reject) => {
    readFile(route).then(res => {
      const links = [];
      const renderer = new marked.Renderer();
      renderer.link = function(href,title,text){
          links.push({
            href:href,
            text:text,
            file:route})  
      } 
        marked(res,{renderer:renderer}); 
        resolve(links)
    })
    .catch(err => {
      reject(err)
      })
  })
})
extractLinks(absoluteRoute)
.then((links)=>{
  console.log(links)
}).catch((error)=>{
  console.log(error)
})

/* //Extraer links
const extraclinks = () => {
  const FDom = new JSDOM(`<!DOCTYPE html> <p>Hello world</p>`);
  //console.log(dom.window.querySelector("p").textContent);
  let document = dom.window.document;
  let verLinks = document.querySelectorAll("a");
  console.log(verLinks) 
}*/

/* const validarRuta = (path) => {
  if(path.extname(path) === '.md'){
    readFile(path)
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

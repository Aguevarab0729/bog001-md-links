const path = require('path');
const http = require('http');
const https = require('https')
const fs = require('fs');
const { rejects } = require('assert');
const file = './prueba.md';
const marked = require('marked');
const fetch = require('node-fetch');

//path resolve es el método que resuelve una secuencia de rutas o segmentos de ruta en una ruta absoluta 
//devuelve una cadena 
const absoluteRoute = path.resolve(file);

const readFile = (route) => {
  const promise = new Promise((resolve, reject) => {
    fs.readFile(route, 'utf8', (err, data) => {
      if(err){
        reject('archivo invalido');
      }
      else{
        resolve(data);
      }
    })
  })
  return promise;
}

readFile(absoluteRoute)
.then((data) => {
  console.log(data);
})

//Verifica si es Archivo o Directorio 
const fileOrDirectory = (route) => {
  const files = [];
  if (path.extname(route) === '.md') {
      files.push(route);
      return files;
  } else {
      const directory = fs.readdir(route);
      const filterFile = directory.filter(file => path.extname(file) === '.md')
      filterFile.forEach((elem) => {
        const validFiles = path.join(route, elem);
        files.push(validFiles);
      })
      return files;
  }
}
console.log(fileOrDirectory(absoluteRoute));


// funcion para extraer Links en un archivo md

const extractLinks = (route => {
  return new Promise((resolve, reject) => {
    readFile(route)
    .then(res => {
      const links = [];
      const renderer = new marked.Renderer();
      renderer.link = function(href,title,text){
          links.push({
            href:href,    // Url o direccion link
            text:text,    // Texto o descripcion del link 
            file:route})  // Ruta, lugar donde se encontró el link
      } 
        marked(res,{renderer:renderer}); 
        resolve(links);
    })
    .catch(err => {
      reject(err);
      })
  })
});

extractLinks(absoluteRoute)
.then((links) => {
  console.log(links);
}).catch((error) => {
  console.log(error);
})


//[option --validate]
const validateLinks = (route) => {
  return new Promise((resolve, reject) => {
    extractLinks(route).then(links => { 
      let fetchLinks = links.map(element => {  
        return fetch(element.href)
        .then(res => {
          if (res.status > 299) {
            element.statusCode = res.status;
            element.status = "FAIL";
          } else {
            element.statusCode = res.status;
            element.status = "OK";
          }
        })
        .catch((err) => {
          element.status = err.code;
        }) 
    })
      Promise.all(fetchLinks).then(res => {
          resolve(links);
      })
    })
    .catch(err=>{
      reject(err);
    })
  })
}

validateLinks(absoluteRoute)
.then((links) => {
  console.log(links);
})
.catch((err) => {
  console.log(err);
}) 

/* // [option --stats]
const statsLinks = (path) => {
  return new Promise((resolve, reject) => { 
    fileOrDirectory(path)
    .then(links => {
      const uniqueLinks = new Set(links.map(element => element.href))
      resolve({
        total:links.length,
        unique : uniqueLinks.size
      })
    })
    .catch(err => {
      reject(err)
    })
  })
  } */
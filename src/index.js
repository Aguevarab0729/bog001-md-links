const path = require('path');
const http = require('http');
const https = require('https')
const fs = require('fs');
const { rejects } = require('assert');
const file = './src/prueba.md';
const marked = require('marked');
const fetch = require('node-fetch');

//path resolve es el método que resuelve una secuencia de rutas o segmentos de ruta en una ruta absoluta 
//devuelve una cadena 
const absoluteRoute = path.resolve(file);

const readFile = (route) => {
  const promise = new Promise((resolve, reject) => {
    fs.readFile(route, 'utf8', (err, data) => {
      if(err){
        reject('archivo invalido, necesitas un archivo con extension .md');
      }
      else{
        resolve(data);
      }
    })
  })
  return promise;
}
/* readFile(absoluteRoute)
.then((data) => {
  console.log(data);
}) */

//Valida si es directorio que sea un archivo con extencion .md
const fileOrDirectory = (route) => {
  const files = [];
  if (path.extname(route) === '.md') {
    files.push(route);
    return files;
  } 
  else {
    const directory = fs.readdir(route);
    const filterFile = directory.filter(file => path.extname(file) === '.md')
    filterFile.forEach((elem) => {
      const validFiles = path.join(route, elem);
      files.push(validFiles);
    })
    return files;
  }
}
/* console.log(fileOrDirectory(absoluteRoute)); */

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
          file:route
        })  // Ruta, lugar donde se encontró el link
      } 
      marked(res,{renderer:renderer}); 
      resolve(links);
    })
    .catch(err => {
      reject(err);
    })
  })
});

/* extractLinks(absoluteRoute)
.then((links) => {
  console.log(links);
}).catch((error) => {
  console.log(error);
}) */

//[option --validate]
const validateLinks = (route, options = {}) => {
  let broke = 0;
  return new Promise((resolve, reject) => {
    extractLinks(route)
    .then(links => { 
      let fetchLinks = links.map(elem => {  
        return fetch(elem.href)
        .then(res => {
          if (res.status > 299) {
            elem.status = "FAIL";
            elem.statusCode = res.status;
          }
          else {
            elem.status = "OK";
            elem.statusCode = res.status;
          }
        })
        .catch((err) => {
          elem.status = err.code;
          elem.statusCode = 500;
        }) 
      })
      
      Promise.all(fetchLinks)
      .then(res => {
        resolve(links);
        //console.log(res);
      })
    })
    .catch(err => {
      reject(err);
    })
  })
}

/* validateLinks(absoluteRoute, {validate: true})
.then((links) => {
  console.log(links);
})
.catch((err) => {
  console.log(err);
}) */

//option stats
const statsLinks = (route, options = {}) => {
  return new Promise((resolve, reject) => { 
    extractLinks(route)
    .then(links => {
      const uniqueLinks = new Set(links.map(elem => elem.href))
      resolve({
        total:links.length,
        unique : uniqueLinks.size
      })
    })
    .catch(err => {
      reject(err);
    })
  })
} 

/* statsLinks(absoluteRoute, {validate: false})
  .then((links) => {
    console.log(links);
  })
  .catch((err) => {
    console.log(err);
  }) */

//--validate --stats
const statsAndValidateLinks = (route) => {
  return new Promise((resolve,reject) => {
    validateLinks(route)
    .then(links => {
      const statusLinks = links.map(element => element.status)
      const totalLinks = links.length;
      
      let linksOk = statusLinks.toString().match(/OK/g)   //Pasamos a string el status y utilizando expresiones regulares, en este caso literal y el método .match() buscamos coincidencia globalmente con la palabra entre barra /OK/ y las devuelve en un array.
      if(linksOk != null){            // es null cuando no encuentra ninguna coincidencia
        linksOk = linksOk.length;
      }
      else{
        linksOk =  0;
      }

      let brokenLinks = statusLinks.toString().match(/FAIL/g)
      if(brokenLinks != null){
        brokenLinks = brokenLinks.length;
      }
      else{
        brokenLinks =  0;
        brokenLinks++;
      }
      resolve({
        total: totalLinks,
        ok: linksOk,
        broken: brokenLinks
      })
    })
    .catch(err=>{
      reject(err);
    })
  })
}

/* statsAndValidateLinks(absoluteRoute, options = {})
.then((links) => {
  console.log(links);
})
.catch((err) => {
  console.log(err);
}) */

const mdLinks = (route, options = {}) => {
  return new Promise((resolve, reject) => {
    const getFiles = fileOrDirectory(route);
    let result = getFiles.map((elem) => {
      if (options.validate && !options.stats) {
        return validateLinks(elem);
      } 
      else if (options.stats && !options.validate) {
        return statsLinks(elem);
      } 
      else if (options.validate && options.stats) {
        return statsAndValidateLinks(elem);
      } 
      else if (options) {
        return extractLinks(elem);
      }
    })
    
    //promise.all toma un array de promesas y devuelve una sola promesa
    //Esta se resuelve solo cuando se cumplen todas las promesas y sus resultados se convierten en el resultado 
    Promise.all(result)
    .then((res) => {
      let resultArray = [].concat.apply([], res);
      resolve(resultArray);
    })
    .catch(err => {
      reject(err)
    })
  })
}

/* mdLinks(absoluteRoute,{validate: false})
.then(console.log).catch(console.log); */

module.exports = {mdLinks, extractLinks, fileOrDirectory, validateLinks, statsLinks, statsAndValidateLinks};

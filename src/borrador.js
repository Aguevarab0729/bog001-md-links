module.exports = () => {
  // ...
};

// Ejemplo proyecto mdlinks
const mdLinks = require("md-links");

mdLinks("./src/README.md")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);

mdLinks("./src/README.md", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }]
  })
  .catch(console.error);

mdLinks("./some/dir")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error); 


/* // Funcion mdLinks 
const mdLinks = require("md-links");

const result = md.render('# md-links rulezz')

let md = require("md-links") ({
  href: true,
  text: true,
  file: true
}); */

//[option --validate]
/* const validateLinks = (route) => {
  let broke = 0;
  return new Promise((resolve, reject) => {
    extractLinks(route).then(links => { 
      let fetchLinks = links.map(elem => {  
        return fetch(elem.href)
        .then(res => {
          if (res.status > 299) {
            elem.status = "FAIL";
            elem.statusCode = res.status;
          } 
          else if (res.status === 404){
            broke++;
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
      
      Promise.all(fetchLinks).then(res => {
        resolve(links);
      })
    })
    .catch(err=>{
      reject(err);
    })
  })
} */

/* const mdLinks = ( route, options = {} ) => {
  return extractLinks(route)
  .then(links => { 
    if(options.validate){
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
          return elem;
        })
        .catch((err) => {
          elem.status = err.code;
          elem.statusCode = 500;
        }) 
      })
      return Promise.all(fetchLinks)
    }
    else{
      return links;
    }
  })
  .catch(err=>{
    reject(err);
  })
} */

// Este codigo deberia llamar la funcion cuando el usuario escribe en los argumentos --validate
//option stats - Tener en cuenta si el usuario pide validate o no
// opcion de stats diferente
/* const statsLinks = (route, options = {} ) => {
  return new Promise((resolve, reject) => { 
    if(options.validate){
      //Asi debo crear una variable, llamando una funcion y guardando el retorno en la variable...El valor es una promesa
      let promesaDevueltaMdLinks = mdLinks(route, options);
      promesaDevueltaMdLinks
      .then(
        // Registrar el valor de la promesa cumplida
        function(val) {
          //console.log(val);
          val.forEach(element => console.log(element));
        })
      .catch(
        // Registrar la razón del rechazo
        function(err) {
          console.log(err);
        });
    }
    else{
      mdLinks(route, options)
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
    }
  })
}

statsLinks(absoluteRoute, {validate: true}); */

#!/usr/bin/env node
// instancia de linea shebang
// usada para que npm funcione en todas las plataformas compatibles, incluso en windows
const mdLinks = require('./index').mdLinks;
const extractLinks = require('./index').extractLinks
const linksValidate = require('./index').validateLinks;
const linksStats = require('./index').statsLinks;
const linksValidateAndStats = require('./index').statsAndValidateLinks;
const process = require('process');
//const path = require('path');

let route = process.argv[2];
let firstOption = process.argv[3]; //opción de 'validate' o 'stats'
let secondOption = process.argv[4]; // opción de 'stats' o 'validate'

//Opciones
let options = {
    validate: false,
    stats: false
}

//Si el usuario ingresa la opción 'validate',cambia a verdadero
if (firstOption === '--validate' || secondOption === '--validate') {
    options.validate = true;
    console.log('VALIDATE: ', options.validate);
} 

//Si el usuario ingresa la opción 'stats',cambia a verdadero
if (firstOption === '--stats' || secondOption === '--stats') {
    options.stats = true;
    console.log('STATS:', options.stats);
}

//Si no ingresa ningun archivo, que le pida al usuario porfavor ingresar
if (route === false || route === undefined) {
    console.log('Por favor ingresa una ruta o archivo');
}

mdLinks(route, options)
.then((res) => {
    if(options.validate && options.stats) {
        linksValidateAndStats(route)
        .then(res => {
            console.log(res);
        })
    }
    if(options.validate && !options.stats) {
        let validate = res.map((elem) => (elem.file) + " " + (elem.href) + " " + (elem.status) + " " + (elem.statusCode) + " " + (elem.text) + " " + ("\n "));
        return console.log(validate.join(" "));
        /* linksValidate(route, options)
        .then(res => {
            console.log(res);
        }) */
    }
    if(options.stats && !options.validate) {
        for(const i in res) {
            let linksStats = res.map(() => (route) + ("\n ") + (`Total: ${res[i].total}`) + ("\n ") + (`Unique: ${res[i].unique}`));
            return console.log (linksStats.join(" "));     
        };
    }
    if(!options.validate && !options.stats) {
        extractLinks(route)
        .then(res => {
            console.log(res)
        })
    }
})
.catch(err => {
    console.error(`Algo salio mal: ${err}`)
});

//!= (no es igual que)
// operadores logicos && (and) el resultado es true si los dos valores dados son verdaderos
// || (or) devuelve verdadero si cualquiera de los dos valores dado es verdadero
//! (not) voltea el valor que se le de true produce false y false true 


/* mdLinks(route, options)
.then((res) => {
    if(options.validate) {
        let linksValidate = res.map((elem) => (elem.file) + " " + (elem.href) + " " + (elem.status) + " " + (elem.statusCode) + " " + (elem.text) + " " + ("\n "));
        return console.log(linksValidate.join(" "));
    }
    else if(options.stats) {
        for(const i in res) {
            let linksStats = res.map(() => (route) + ("\n ") + (`Total: ${res[i].total}`) + ("\n ") + (`Unique: ${res[i].unique}`));
            return console.log (linksStats.join(" "));     
        };
    }
    else if(options.validate && options.stats) {
        for(const i in res) {
            statsAndValidateLinks = res.map(() => (route) + ("\n ") + (`Total: ${res[i].total}`) + ("\n ") + (`Unique: ${res[i].unique}`) + ("\n ") + (`Broken: ${res[i].broken}`));
            return console.log(linksValidateAndStats.join(" "));
        }
    }
    else if (firstOption && secondOption != options) {
        console.log('Debes ingresar una opcion valida !!!');
    } 
})
.catch(err => {
    console.error(`Algo salio mal: ${err}`)
}); */



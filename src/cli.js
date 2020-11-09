#!/usr/bin/env node
const { mdLinks } = require('./prueba.js');
const { validateLinks, statsLinks, statsAndValidateLinks } = require('./prueba.js')

const routeLinks = process.argv.slice(2);  //usamos el metodo slice para NO visualizar elementos anteriores a la posicion 2
console.log('routeLinks: ', routeLinks);      //probamos que command nos da un array vacío


//!= (no es igual que)
// operadores logicos && (and) el resultado es true si los dos valores dados son verdaderos
// || (or) devuelve verdadero si cualquiera de los dos valores dado es verdadero
//! (not) voltea el valor que se le de true produce false y false true 

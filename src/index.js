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

const mdLinks = require('../src/index.js');
const path = require('path');
const axios = require('axios');
const file = '../src/prueba.md';

const absoluteRoute = path.resolve(file);

jest.mock('axios');

/* describe('mdLinks', () => {

  it('should ', () => {
    console.log('FIX ME!');
  });

}); */

describe('mdLinks', () => {

  it('should be a function', () => {
    expect(typeof mdLinks).toBe('function');
    console.log('it is a function');
  });

  /* it('read the md file and return the array with links information', done => {
    return mdLinks(absoluteRoute, {validate:false, stats: false})
    .then((res) => {
      expect(res).toStrictEqual(extractLinks);
      done();
    });
  }); */
});


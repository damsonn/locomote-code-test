'use strict';
const should = require('should');

// magic function, could also be called 'partial'
Function.prototype.magic = function(/* arguments */) {
  const fn = this,
        slice = Array.prototype.slice,
        magicArgs = slice.call(arguments);

  return function(/* arguments */) {
    return fn.apply(this, magicArgs.concat(slice.call(arguments)));
  };
}

// Spec for question 1
describe('Magic', () => {
  it('should handle "add"', () => {
    const add = (a, b) => a + b;
    const addTo = add.magic(2);
    addTo(5).should.be.equal(7);
  });

  it('should handle "welcome"', () => {
    const say = (something) => something;
    const welcome = say.magic('Hi, how are you?');
    welcome().should.be.equal('Hi, how are you?');
  })
});

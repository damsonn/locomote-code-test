'use strict';
const should = require('should');

function deepCopy(obj) {
  let copy;

  // primitives types (immutables)
  if (null == obj || "object" != typeof obj) return obj;

  if (obj instanceof Date) {
     copy = new Date();
     copy.setTime(obj.getTime());
     return copy;
   }

  if (obj instanceof Array) {
    return obj.map( o => deepCopy(o) );
  }

  if (obj instanceof Object) {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key] = deepCopy(obj[key]);
      return acc;
    }, {});
  }
}

describe('deepCopy', () => {
  it('works with objects', () => {
    const original = { name: 'Mary Smith', address: { postcode: 6018} };
    const copy = deepCopy(original);

    // the the copy contains the values
    copy.name.should.equal('Mary Smith');
    copy.address.postcode.should.equal(6018);

    // modify the copy
    copy.name = 'John Smith';
    copy.address.postcode = 4000;

    // source should be unchanged
    original.name.should.equal('Mary Smith');
    original.address.postcode.should.equal(6018);
  });

  it('works with arrays', () => {
    const original = [1,2,3];
    const copy = deepCopy(original);

    copy.push(4);

    // original should be unchanged
    original.length.should.equal(3);

    // copy should have 4 elements
    copy.length.should.equal(4);
  });
});

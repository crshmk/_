const expect = require('chai').expect

const _ = require('../index.js')

describe('Array functions', () => {

  it('chunk', () => {
    let chunks = _.chunk(2, [1,2,3,4,5])
    expect(chunks).to.deep.equal([ [1,2], [3,4], [5] ]);
  })

  it('diff', () => {
    let diff = _.diff([1, 2, 3, 4], [3, 4, 5, 6]);
    expect(diff).to.deep.equal([ [1, 2], [5, 6] ]);
  })

  it('filt', () => {
    let gt10 = x => x > 10
    let filt = _.filt(gt10, [5, 7, 11, 13])
    expect(filt).to.deep.equal([11, 13])
  })

  it('filtMany', () => {
    let gt10 = x => x > 10
    let isEven = x => x % 2 === 0

    let fm = _.filtMany([gt10, isEven], [2, 3, 12, 13, 14])
    expect(fm).to.deep.equal([12, 14]);
  })

  it('first', () => {
    expect( _.first([1, 2, 3]) ).to.equal(1)
  })

  it('includes', () => {
    expect( _.includes(42, [42, 56, 'tree']) ).to.be.true
    expect( _.includes(42, [43, 56, 'tree']) ).to.be.false
  })

  it('intersection', () => {
    expect( _.intersection([1, 2, 3], [2, 3, 4]) ).to.deep.equal([2,3]);
  })

  it('last', () => {
    expect( _.last([42, 'red', {one: 1}, 43])).to.equal(43)
  })

  it('map', () => {
    let inc = x => x+1
    expect( _.map(inc, [1, 2]) ).to.deep.equal([2, 3])
  })

  it('nth', () => {
    expect( _.nth(2, [0, 1, 2, 3]) ).to.deep.equal([0, 1, 3]);
  })

  it('reduce', () => {
    let sum = xs => _.reduce((acc, x) => acc + x, 0, xs)

    expect( sum([1, 2, 3]) ).to.equal(6)
  })

  it('rest', () => {
    expect( _.rest([1, 2, 3]) ).to.deep.equal([2, 3])
  })

  it('uniq', () => {
    expect( _.uniq([1, 1, 1, true, true, null, null, {one: 1}, {one: 1}]) )
      .to.deep.equal([1, true, null, {one: 1}, {one: 1}]);
  })

  it('zip', () => {
    expect( _.zip([1, 2, 3], [4, 5, 6]) ).to.deep.equal([ [1, 4], [2, 5], [3, 6] ])
  })

  it('zipWith', () => {
    let add = (x,y) => x+y
    expect( _.zipWith(add, [1, 2, 3], [4, 5, 6]) ).to.deep.equal([5, 7, 9])
  })

})

describe('Object functions', () => {

  it('isObject', () => {
    expect( _.isObject([1,2,3]) ).to.be.false
    expect( _.isObject({one: 1}) ).to.be.true
  })

  it('prop', () => {
    expect( _.prop('x', {x: 42, y: 43}) ).to.equal(42)
    expect( _.prop('x', {x: x => x})(42) ).to.equal(42)
  })

  it('propEq', () => {
    expect( _.propEq(1, 'one', {one: 1}) ).to.be.true
    expect( _.propEq(3, 'one', {one: 1}) ).to.be.false
  })

  it('propSatisfies', () => {
    expect( _.propSatisfies(k => _.equals(k, 'blue'), 'hair', {hair: 'blue'}) )
      .to.be.true
    expect( _.propSatisfies(k => _.equals(k, 'blue'), 'hair', {hair: 'red'}) )
      .to.be.false
  })

  it('deepClone', () => {
    expect( _.deepClone({one: 1, two: {three: 3}}) )
      .to.deep.equal({one: 1, two: {three: 3}})
  })

  it('extend', () => {
    let defaults = {baseURL: '/api/', auth: {apiKey: true, admin: false}}
    let ex = _.extend(defaults, {baseURL: '/catalogue', auth: {admin: true}})
    expect(ex).to.deep.equal({
      baseURL: '/catalogue',
      auth: {apiKey: true,
        admin: true
      }
    })
  })

  it('equals', () => {
    expect( _.equals(42, 42) ).to.be.true
    expect( _.equals('red', 'red') ).to.be.true
    expect( _.equals(false, null) ).to.be.false
  })

  it('hasText', () => {
    expect( _.hasText('green', 'the green thing') ).to.be.true
  })

})

describe('Utility functions', () => {

  it('empty', () => {
    expect( _.empty({}) ).to.be.true
    expect( _.empty('') ).to.be.true
    expect( _.empty( () => 42 ) ).to.be.true
    expect( _.empty([]) ).to.be.true
    expect( _.empty(null) ).to.be.true
    expect( _.empty(undefined) ).to.be.true
  })

  it('partial', () => {
    let addup = (x, y, z) => x+y+z
    let addTen = _.partial(addup, 4, 6)
    expect(addTen(5)).to.equal(15)
    expect(addTen(2)).to.equal(12)
  })

  it('partial', () => {
    var products = [
      {id: 1, name: 'nice chair', category: 'modern'},
      {id: 2, name: 'nice book', category: 'modern'},
      {id: 3, name: 'bad chair', category: 'modern'},
      {id: 4, name: 'nice chair', category: 'vintage'}
    ]

    var isModern = _.filt(o => o.category === 'modern')
    var isNice = _.filt(o => _.hasText('nice', o.name))
    var names = _.map(_.prop('name'))

    var modernAndNice = _.pipe(isModern, isNice, names)

    expect(modernAndNice(products)).to.deep.equal(["nice chair", "nice book"])
  })

})

const expect = require('chai').expect

const _ = require('../index.js')

describe('Array functions', () => {

  it('chunk', () => {
    let len = 2
    let xs = [1,2,3,4,5]
    let expected = [ [1,2], [3,4], [5] ]
    expect( _.chunk(len, xs) ).to.deep.equal(expected)

    // these are the autocurry tests
    expect( _.chunk([]) ).to.be.a('function')
    expect( _.chunk(len)(xs) ).to.deep.equal(expected)
  })

  it('diff', () => {
    let xs = [1, 2, 3, 4]
    let ys = [3, 4, 5, 6]
    let expected = [ [1, 2], [5, 6] ]
    expect( _.diff(xs, ys) ).to.deep.equal(expected)

    expect( _.diff(xs) ).to.be.a('function')
    expect( _.diff(xs)(ys) ).to.deep.equal(expected)

  })

  it('filt', () => {
    let gt10 = x => x > 10
    let xs = [5, 7, 11, 13]
    let expected = [11, 13]
    expect( _.filt(gt10, xs) ).to.deep.equal(expected)

    expect( _.filt(gt10) ).to.be.a('function')
    expect( _.filt(gt10)(xs) ).to.deep.equal(expected)
  })

  it('filtMany', () => {
    let gt10 = x => x > 10
    let isEven = x => x % 2 === 0
    let xs = [2, 3, 12, 13, 14]
    let expected = [12, 14]

    expect( _.filtMany([gt10, isEven], xs) ).to.deep.equal(expected)

    //filtMany is not autocurried
  })

  it('first', () => {
    expect( _.first([1, 2, 3]) ).to.equal(1)
  })

  it('includes', () => {
    expect( _.includes(42, [42, 56, 'tree']) ).to.be.true
    expect( _.includes(42, [43, 56, 'tree']) ).to.be.false

    expect ( _.includes(1) ).to.be.a('function')
    expect( _.includes(42)([42, 56, 'tree']) ).to.be.true
  })

  it('intersection', () => {
    let xs = [1, 2, 3]
    let ys = [2, 3, 4]
    let expected = [2,3]
    expect( _.intersection(xs, ys) ).to.deep.equal(expected)

    expect( _.intersection([]) ).to.be.a('function')
    expect( _.intersection(xs)(ys) ).to.deep.equal(expected)
  })

  it('last', () => {
    expect( _.last([42, 'red', {one: 1}, 43])).to.equal(43)
  })

  it('map', () => {
    let inc = x => x+1
    let xs = [1, 2]
    let expected = [2, 3]
    expect( _.map(inc, xs) ).to.deep.equal(expected)

    expect( _.intersection(inc) ).to.be.a('function')
    expect( _.map(inc)(xs) ).to.deep.equal(expected)
  })

  it('nth', () => {
    let i = 2;
    let xs = [0, 1, 2, 3]
    let expected = [0, 1, 3]
    expect( _.nth(i, xs) ).to.deep.equal(expected)

    expect( _.intersection(i) ).to.be.a('function')
    expect( _.nth(i)(xs) ).to.deep.equal(expected)
  })

  it('reduce', () => {
    let adder = (acc, x) => acc + x
    let init = 0
    let xs = [1, 2, 3]
    let sum = xs => _.reduce(adder, init, xs)
    expect( sum(xs) ).to.equal(6)

    expect( _.reduce(adder) ).to.be.a('function')
    expect( _.reduce(adder, init) ).to.be.a('function')
    expect( _.reduce(adder)(init) ).to.be.a('function')
    expect( _.reduce(adder)(init)(xs) ).to.equal(6)
  })

  it('rest', () => {
    expect( _.rest([1, 2, 3]) ).to.deep.equal([2, 3])
  })

  it('uniq', () => {
    expect( _.uniq([1, 1, 1, true, true, null, null, {one: 1}, {one: 1}]) )
      .to.deep.equal([1, true, null, {one: 1}, {one: 1}])
  })

  it('zip', () => {
    let xs = [1, 2, 3]
    let ys = [4, 5, 6]
    let expected = [ [1, 4], [2, 5], [3, 6] ]
    expect( _.zip(xs, ys) ).to.deep.equal(expected)

    expect( _.zip([]) ).to.be.a('function')
    expect( _.zip(xs)(ys) ).to.deep.equal(expected)
  })

  it('zipWith', () => {
    let add = (x,y) => x+y
    let xs = [1, 2, 3]
    let ys = [4, 5, 6]
    let expected = [5, 7, 9]
    expect( _.zipWith(add, xs, ys) ).to.deep.equal(expected)

    expect( _.zipWith(add) ).to.be.a('function')
    expect( _.zipWith(add)(xs) ).to.be.a('function')
    expect( _.zipWith(add)(xs)(ys) ).to.deep.equal(expected)
  })

})

describe('Object functions', () => {

  it('isObject', () => {
    expect( _.isObject([1,2,3]) ).to.be.false
    expect( _.isObject({one: 1}) ).to.be.true
  })

  it('prop', () => {
    expect( _.prop('x', {x: 42, y: 43}) ).to.equal(42)

    expect( _.prop('x') ).to.be.a('function')
    expect( _.prop('x', {x: x => x})(42) ).to.equal(42)
  })

  it('propEq', () => {
    let k = 'one'
    let o = {one: 1}
    expect( _.propEq(1, k, o) ).to.be.true
    expect( _.propEq(3, k, o) ).to.be.false

    expect( _.propEq(1) ).to.be.a('function')
    expect( _.propEq(1)(k) ).to.be.a('function')
    expect( _.propEq(1)(k)(o) ).to.be.true
  })

  it('propSatisfies', () => {
    let isBlue = k => _.equals(k, 'blue')
    let blueHair = _.propSatisfies(isBlue, 'hair')
    expect( _.propSatisfies(isBlue, 'hair', {hair: 'blue'}) )
      .to.be.true
    expect( _.propSatisfies(k => _.equals(k, 'blue'), 'hair', {hair: 'red'}) )
      .to.be.false

    expect( _.propSatisfies(isBlue) ).to.be.a('function')
    expect( _.propSatisfies(isBlue)('hair') ).to.be.a('function')
    expect( _.propSatisfies(isBlue)('hair')({hair: 'blue'}) ).to.be.true
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

})

describe('Primitive functions', () => {

  it('equals', () => {
    expect( _.equals(42, 42) ).to.be.true
    expect( _.equals('red', 'red') ).to.be.true
    expect( _.equals(false, null) ).to.be.false

    expect( _.equals(42) ).to.be.a('function')
    expect( _.equals(42)(42) ).to.be.true
  })

  it('hasText', () => {
    expect( _.hasText('green', 'the green thing') ).to.be.true

    expect( _.hasText('a') ).to.be.a('function')
    expect( _.hasText('a')('abc') ).to.be.true
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
    expect( addTen(5) ).to.equal(15)
  })

  it('pipe', () => {
    let products = [
      {id: 1, name: 'nice chair', category: 'modern'},
      {id: 2, name: 'nice book', category: 'modern'},
      {id: 3, name: 'bad chair', category: 'modern'},
      {id: 4, name: 'nice chair', category: 'vintage'}
    ]

    let name = _.prop('name')
    let isModern = o => _.equals(_.prop('category', o), 'modern')
    let isNice = o => _.hasText('nice', name(o))

    let moderns = _.filt(isModern)
    let nices = _.filt(isNice)
    let names = _.map(name)

    let modernAndNice = _.pipe(moderns, nices, names)

    expect(modernAndNice(products)).to.deep.equal(["nice chair", "nice book"])
  })

})

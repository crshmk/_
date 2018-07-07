let _ = require('../index');
let people = require('./people.json');

// some unary functions to pass around
let sum = _.reduce((acc, x) => acc + x, 0)
let avg = xs => sum(xs) / xs.length
let isEven = x => x % 2 === 0


// get specific properties from a collection
let pluck = (k, os) => _.map(_.prop(k), os)
pluck('name', people)
// -> [ 'jane', 'joe', 'bill', 'sarah', 'tom', ...]

// prop returns an object when given an array of keys
pluck(['name', 'age'], people)
// ->
//   [ { name: 'jane', age: 42 },
//     { name: 'joe', age: 12 }, ...]


// get the average age of adults with blue hair
let avgAgeAdultsBlueHair = (function() {

  let adults = _.filt(_.propSatisfies(a => a > 17, 'age'))
  let haveBlueHair = _.filt(_.propEq('blue', 'hair'))
  let ages = _.map(_.prop('age'))

  return _.pipe(adults, haveBlueHair, ages, avg)

})();
avgAgeAdultsBlueHair(people)
// -> 42


// create functions to get values in an objects by id
let valById = k => (id, os) =>
  _.pipe(_.filt(_.propEq(id, 'id')), _.first)(os)[k]

let ageById = valById('age')
ageById(3, people)
// -> 32
let hairById = valById('hair')
hairById(3, people)
// -> 'gray'


// sum all award points for all active people
 _.reduce( (acc, p) => !p.active ? acc : acc + sum(p.awards), 0)(people)
// -> 20

 _.pipe(
   _.filt(_.propEq(true, 'active')),
   _.map(_.prop('awards')), _.map(sum),
   sum
 )(people)
// -> 20

let actives = _.filt(_.propEq(true, 'active'))
let awards = _.map(_.prop('awards'))
_.pipe(actives, awards, _.map(sum), sum)(people)
// -> 20


// multiple filters can use filtMany
let isAdult = o => o.age > 17
let hasMultipleAwards = o => o.awards.length > 1
let hasBrownHair = _.propEq('brown', 'hair')
_.filtMany([isAdult, hasMultipleAwards, hasBrownHair], people)
// -> [
//      {id: 6, name: "miles", age: 19, hair: "brown", awards: Array(2), …},
//      {id: 7, name: "betty", age: 43, hair: "brown", awards: Array(2), …}
 //  ]


// implement your own reduceWhile
let reduceWhile = (cond, fn, acc) => xs => _.pipe(_.filt(cond), fn)(xs)
let addIfEven = reduceWhile(isEven, sum, 0)
addIfEven([1,2,3,4])
// -> 6

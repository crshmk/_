let _ = require('../index');
let people = require('./people.json');

let sum = xs => _.reduce((acc, x) => acc + x, 0, xs)
let avg = xs => sum(xs) / xs.length


//  get people names
let pluck = (k, os) => _.map(_.prop(k), os)
pluck('name', people)
// -> [ 'jane', 'joe', 'bill', 'sarah', 'tom', ...]


// get the average age of adults with blue hair
let avgAgeAdultsBlueHair = (function() {
  let adult = _.propSatisfies(a => a > 17, 'age')
  let blueHair = _.propEq('blue', 'hair')
  return _.pipe(_.filt(adult), _.filt(blueHair), _.map(_.prop('age')), avg)
})();
avgAgeAdultsBlueHair(people)
// -> 42


// get the total award points for active people
 _.reduce( (acc, p) => !p.active ? acc : acc + sum(p.awards), 0)(people)
 // -> 20

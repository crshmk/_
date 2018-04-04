let _ = require('./index');
let people = require('./people.json');



// get people names
let pluck = (k, data) => _.map(_.prop(k), data)
pluck('name', people)
// [ 'jane', 'joe', 'bill', 'sarah', 'tom', 'miles', 'betty', 'vance', 'fanny' ]


// get the average age of adults with blue hair
let avgAgeAdultsBlueHair = (function() {
  let sum = xs => xs.reduce((acc, x) => acc + x, 0)
  let avg = xs => sum(xs) / xs.length

  let adult = _.propSatisfies(a => a > 17, 'age')
  let blueHair = _.propEq('blue', 'hair')

   return _.pipe(_.filt(adult), _.filt(blueHair), _.map(_.prop('age')), avg)
})();


avgAgeAdultsBlueHair(people)
// -> 42

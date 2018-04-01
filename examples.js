let _ = require('./index');
let people = require('./people.json');

let sum = xs => xs.reduce((acc, x) => acc + x, 0)
let avg = xs => sum(xs) / xs.length



// get the average age of adults with blue hair

let adult = _.propSatisfies(a => a > 17, 'age')

let blueHair = _.propEq('hair', 'blue')

_.pipe(_.filt(adult), _.filt(blueHair), _.map(_.prop('age')), avg)(people)
// -> 42

// ARRAYS

/**
 * @param len length of each chunk
 * @return array
 * chunks one level deep
 * autocurries a length
 */
let chunk = function(len, xs) {
  return args(arguments).length === 1 ? ys => chunk(len, ys) :
    xs.length === 0 ? [] : [xs.slice(0, len)].concat(chunk(len, xs.slice(len)))
}

/**
 * @return array[0] -> xs not found in ys
 * @return array[1] -> ys not found in xs
 */
let diff = function(xs, ys) {
  return args(arguments).length === 1 ? zs => diff(xs, zs) :
    [xs.filter(x => ys.indexOf(x) === -1), ys.filter(y => xs.indexOf(y) === -1)]
}

/**
 * @param f unary function returning a boolean
 * @return array of filtered items
 * auto curries when passed one param
 *
 * let isOne = propEq(1)
 * let oneIsOne = isOne('one')
 * let getOnes = filt(oneIsOne)
 * getOnes([{one: 1}, {two: 2}]) // -> [{one: 1}]
 */
let filt = function(f, os) {
  //return args(arguments).length > 1 ? os.filter(o => f(o)) : curryLast(filt, f)
  return args(arguments).length > 1 ? os.filter(o => f(o)) : ps => filt(f, ps)
}

let find = function(f, xs) {
  return args(arguments).length > 1 ? xs.filter(f) : xs => xs.filter(f)
}

let first = function(xs) {
  return args(arguments).length > 0 && xs != null && xs.length ? xs[0] : null
}

/**
 * @return boolean
 */
//let includes = (val, xs) => xs.indexOf(val) > -1;

let includes = function(val, xs) {
  //return args(arguments).length > 1 ? xs.indexOf(val) > -1 : curryLast(includes, val)
  return args(arguments).length > 1 ? xs.indexOf(val) > -1 : ys => includes(val, ys)
}

/**
 * @return array
 */
//let intersection = (arr1, arr2) => arr1.reduce( (acc, x) =>
//  includes(arr2, x) ? acc.concat([x]) : acc, []);
let intersection = function(arr1, arr2) {
  return args(arguments).length > 1 ? arr1.reduce( (acc, x) =>
    includes(x, arr2) ? acc.concat([x]) : acc, []) :
    curryLast(intersection, arr1);
    //arr3 => includes(arr1, arr3)
}

/**
 * @return array
 */
let last = xs => xs.slice(xs.length - 1)

/**
 * @return array
 */
let map = function(f, xs) {
  return args(arguments).length > 1 ? xs.map(f) : xs => xs.map(f)
}

/**
 * @return array with element at index removed
 */
let nth = function(i, xs) {
  return args(arguments).length > 1 ? xs.slice(0, i).concat(xs.slice(i+1)) :
    xs => xs.slice(0, i).concat(xs.slice(i+1))
}

/**
 * @return array
 */
let rest = xs => xs.slice(1)

/**
 * @return array of unique primitives
 */
let uniq = arr => arr.reduce((acc, x) =>
  includes(x, acc) ? acc : acc.concat(x), [])

/**
 * @return array without values in first argument
 */
let without = (rejects, arr) => arr.filter(x => !includes(rejects, x))


// OBJECTS

let isObject = (arg) => typeof arg === 'object' && !Array.isArray(arg)
  && arg !== null

/**
 * @return value for key k
 */
let prop = function(k, o) {
  return args(arguments).length > 1 ?
   !isObject(o) ? undefined : o[k] !== null ? o[k] : undefined :
   curryLast(prop, k)
}

/**
 * @return function
 * propEq(1, 'one')({one: 1}) // -> true
 */
let propEq = function(k, v) {
  return args(arguments).length > 1 ? o => equals(o[k], v) : curryLast(propEq, k)
}

/**
 * propSatisfies(x => equals(x, 'blue'), 'hair', {hair: 'blue'}) // -> true
 */
let propSatisfies = function(f, k, o) {
  return args(arguments).length > 2 ? f(o[k]) : partial(propSatisfies, f, k)
}

/**
 * o: object literal - breaks with and object referring to a closed state
 * don't use constructed instances
 */
 let deepClone = o => o != null ? JSON.parse(JSON.stringify(o)) : {}

/**
 * default options to be overridden (like jQuery extend)
 * works with nested objects
 */
let extend = (defaults, over) => {
    let opts = deepClone(defaults)
    for (k in over) {
      opts[k] =  !isObject(over[k]) ? over[k] : extend(opts[k] || {}, over[k])
    }
    return opts
}

// PRIMITIVES

/**
 * @return boolean
 * simple equality check for primitives only
 * Ramda has a more comprehensive solution http://ramdajs.com/docs/#equals
 */
let equals = function(x, y) {
  return args(arguments).length > 1 ? x === y : y => x === y
}

let hasText = function(search, data) {
  return args(arguments).length > 1 ?
    data.toLowerCase().indexOf(search.trim().toLowerCase()) > -1 :
    curryLast(hasText, search)
}

// UTILITIES

let args = function(agts) {
  return Array.prototype.slice.call(agts)
}

/**
* curry all but last argument
* @param n[0] function to be curried
* @param n[1] first argument to the function
* @return function x => curried execution on x
*/
let curryLast = function(fn, x) {
  return y => fn(x,y)
}

/**
 * @return boolean
 * empty array
 * empty string
 * function of zero arity
 * empty object
 * null
 * undefined
 */
let empty = x => Array.isArray(x) || typeof x === 'string' || typeof x === 'function' ?
  !x.length : null == x || Object.keys(x).length === 0 && x.constructor === Object

  /**
  * @function partial :: any, any, ... -> partially applied fn || executed fn on params
  * partially apply arguments until all are received; then return application
  */
let partial = function() {
    let a = args(arguments)
    let f = a.splice(0, 1)[0]
    if (typeof f !== 'function') {
      throw new TypeError('first argument to partial must be a function')
    }
    function again(oldArgs) {
      return function() {
        let ags = oldArgs.concat(args(arguments));
        return ags.length >= f.length ? f.apply(this, ags) : again(ags)
      }
    }
    return a.length >= f.length ? f.apply(this, a) : again(a)
  }

  /**
* @function pipe :: function, function, ... -> function
* create a pipeline of unary functions
*/
let pipe = function() {
  let fs = args(arguments)
  function caller(fs, acc) {
    return fs.length === 0 ? acc
      : caller(rest(fs), first(fs)(acc))
  }
  return data => caller(rest(fs), first(fs)(data))
}

module.exports = {
  chunk,
  diff,
  filt,
  find,
  first,
  includes,
  intersection,
  last,
  map,
  nth,
  rest,
  uniq,
  without,
  isObject,
  prop,
  propEq,
  propSatisfies,
  deepClone,
  extend,
  equals,
  hasText,
  empty,
  partial,
  pipe
}

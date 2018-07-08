// ARRAYS

/**
 * @param number len
 * @param array xs
 * @return array
 */
let chunk = function(len, xs) {
  return args(arguments).length === 1 ? ys => chunk(len, ys) :
    xs.length === 0 ? [] : [xs.slice(0, len)].concat(chunk(len, xs.slice(len)))
}

/**
 * @param array xs
 * @param array ys
 * @return array
 */
let diff = function(xs, ys) {
  return args(arguments).length === 1 ? zs => diff(xs, zs) :
    [xs.filter(x => ys.indexOf(x) === -1), ys.filter(y => xs.indexOf(y) === -1)]
}

/**
 * @param function f
 * @param array xs
 * @return array
 */
let filt = function(f, xs) {
  return args(arguments).length < 2 ? curryLast(filt, f) :
  Array.isArray(f) ? filtMany(f, xs) : xs.filter(f)
}

/**
 * @param array of functions - filters
 * @param array data
 * @return array
 */
 filtMany = (f, d) => 
   f.length < 2 ? d.filter(f[0]) : filtMany(f, d.filter(f.shift()))

/**
 * @param array xs
 * @return any
 */
let first = function(xs) {
  return args(arguments).length > 0 && xs != null && xs.length ? xs[0] : null
}

/**
 * @param primitive val
 * @param array xs
 * @return boolean
 */
let includes = function(val, xs) {
  return args(arguments).length > 1 ? xs.indexOf(val) > -1 : ys => includes(val, ys)
}

/**
 * @param array xs
 * @param array ys
 * @return array
 */
let intersection = function(xs, ys) {
  return args(arguments).length > 1 ? xs.reduce( (acc, x) =>
    includes(x, ys) ? acc.concat([x]) : acc, []) :
    curryLast(intersection, xs);
}

/**
 * @param array xs
 * @return any
 */
let last = xs => xs.slice(xs.length - 1)[0]

/**
 * @param function f
 * @param array xs
 * @return array
 */
let map = function(f, xs) {
  return args(arguments).length > 1 ? xs.map(f) : xs => xs.map(f)
}

/**
 * @param int i
 * @param array xs
 * @return array
 */
let nth = function(i, xs) {
  return args(arguments).length > 1 ? xs.slice(0, i).concat(xs.slice(i+1)) :
    xs => xs.slice(0, i).concat(xs.slice(i+1))
}

let reduce = function(fn, acc, xs) {
  return args(arguments).length > 2 ? xs.reduce(fn, acc) :
    partial(reduce, fn, acc)
}

/**
 * @param array xs
 * @return array
 */
let rest = xs => xs.slice(1)

/**
 * @param array xs
 * @return array
 */
let uniq = xs => xs.reduce((acc, x) =>
  includes(x, acc) ? acc : acc.concat(x), [])

/**
 * @param array xs
 * @param array ys
 * @return array
 */
let zip = function(xs, ys) {
  return args(arguments).length > 1 ? zipWith( (x,y) => [x,y], xs, ys) :
    zs => zip(xs, zs)
}

/**
 * @param function fn
 * @param array xs
 * @param array ys
 * @return array
 */
let zipWith = function(fn, xs, ys) {
  return args(arguments).length > 2 ?
    xs.reduce( (acc, x, i) => {
      return ys[i] == null ? acc : acc.concat( [fn(x, ys[i]) ])
    }, []) :
  partial(zipWith, fn, xs);
}

// OBJECTS

/**
 * @param any arg
 * @return boolean
 */
let isObject = arg => typeof arg === 'object' && !Array.isArray(arg)
  && arg !== null

/**

 * moved to overloaded prop

 * @param ks array of strings
 * @param o object
 * @return object


 let pick = function(ks, o) {
   if (args(arguments).length < 2) return curryLast(pick, ks)
   var picked = {};
   ks.forEach(k => {picked[k] = o[k] != null ? o[k] : null})
   return picked;
 }
 */

/**
 * @param string k
 * @param object o
 * @return any
 */
 /*
let prop = function(k, o) {
  return args(arguments).length > 1 ?
   !isObject(o) ? undefined : o[k] !== null ? o[k] : undefined :
   curryLast(prop, k)
}
*/

// returns an array of values when passed a key string
//    or an array of objects when passed an array of key strings

let prop = function(k, o) {
  if (args(arguments).length < 2) return curryLast(prop, k)
  if (Array.isArray(k)) {
    var picked = {};
    k.forEach(x => {picked[x] = o[x] != null ? o[x] : null})
    return picked;
  }
  return !isObject(o) ? {} : o[k] != null ? o[k] : null
}

/**
 * @param any v
 * @param string k
 * @param object o
 * @return boolean
 */
let propEq = function(v, k, o) {
  return args(arguments).length > 2 ? equals(o[k], v) : partial(propEq, v, k)
}

/**
 * @param ks array of strings (keys)
 * @param os array of objects
 * @return array

let props = function(ks, os) {
  return args(arguments).length < 2 ? curryLast(props, ks) :
  os.reduce( (acc, x) => {
    var y = {};
    ks.forEach(k => {y[k] = x[k]});
    acc.push(y);
    return acc;
  }, [])
}
 */


/**
 * @param function f
 * @param string k
 * @param object o
 * @return boolean
 */
let propSatisfies = function(f, k, o) {
  return args(arguments).length > 2 ? f(o[k]) : partial(propSatisfies, f, k)
}

/**
 * @param object o
 * @return object
 */
let deepClone = o => o != null ? JSON.parse(JSON.stringify(o)) : {}

/**
 * @param object defaults
 * @param object over
 * @return object
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
 * @param primitive x
 * @param primitive y
 * @return boolean
 */
let equals = function(x, y) {
  return args(arguments).length > 1 ? x === y : y => x === y
}

/**
 * @param string search
 * @param string data
 * @return boolean
 */
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
* @param function f
* @param any x
* @return function
*/
let curryLast = function(fn, x) {
  return y => fn(x,y)
}

/**
 * @param any x
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

let partial = function() {
    let a = args(arguments)
    // strip undefined arguments
    a = filt(x => !empty(x), a)
    // get the function
    let f = a.splice(0, 1)[0]

    if (typeof f !== 'function') {
      throw new TypeError('first argument to partial must be a function')
    }

    // recurse until all arguments are passed
    function again(oldArgs) {
      return function() {
        let ags = oldArgs.concat(args(arguments));
        return ags.length >= f.length ? f.apply(this, ags) : again(ags)
      }
    }

    return a.length >= f.length ? f.apply(this, a) : again(a)
  }

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
  first,
  includes,
  intersection,
  last,
  map,
  nth,
  reduce,
  rest,
  uniq,
  zip,
  zipWith,
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

This is a functional programming starter [kit](https://github.com/crshmk/_/blob/master/index.js) that can be easily read and augmented. Larger libraries are magical, performant, and battle-hardened, but I often prefer to roll my own.

Like [Ramda](http://ramdajs.com/) (which is a far superior library in a completely different league, of course) this is an auto-curried collection of functions to which the data to be processed is passed as the last argument. Passing data last allows you to curry or partially apply the initial arguments, which has strong benefits:
- curried function names are more explicit
- you may pipe complex functions in a point-free style
- you enjoy the power of unary functions as they might be expected in other containers or functions


The functions are auto-curried. This means that if a function accepts three arguments, you may just pass one or two as you like and a new function will be returned that will expect the remaining ones. This allows you to pass around functions in elegant, powerful ways.


All of this leads to more powerful, readable, maintainable, well-composed code. [example](#pipe)


A large and popular functional programming library will perform much better. This is written specifically to be readable and extensible.

Like a lot of tools, you could spend time learning the syntax of a library, or you could learn how to write one yourself. Even if you use libraries often (I love Ramda) it's valuable to understand how functional programming really works before diving into them. A readable group of functions like this makes fp general architecture much more accessible.



---
> ( argumentTypes ) :: returnType

Arrays
---


### chunk  

( int, array ) :: array

```javascript
chunk(2, [1, 2, 3, 4, 5])
// [ [1,2], [3,4], [5] ]
```
*chunks one level deep*

### diff  

( array, array ) :: [ array, array ]

```javascript
diff([1, 2, 3, 4], [3, 4, 5, 6])
// [ [1, 2], [5, 6] ]
```

### filt  
( function(any) :: boolean || array[function(any) :: boolean, ...] , array ) :: array
```javascript
let gt10 = x => x > 10
var isEven = x => x % 2 === 0

filt(gt10, [5, 7, 11, 13])
// [11, 13]

filt([gt10, isEven], [2, 3, 12, 13, 14])
// [12, 14]

```
*takes a filter function or an array of filter functions and an array to be filtered*

### first  
( array ) :: any

```javascript
first([1, 2, 3])
// 1
```

### includes  
( primitive, array ) :: boolean

```javascript
includes(42, [42, 'red', true, null, undefined])
// true
```
*any of these primitive types may be tested*

### intersection  
( array, array ) :: array

```javascript
intersection([1, 2, 3], [2, 3, 4])
// [2, 3]
```

### last  
( array ) :: any

```javascript
last([42, 'red', {one: 1}, 43])
// 43
```

### map
( function :: any, array ) :: array

```javascript
let inc = x => x+1
map(inc, [1, 2])
// [2, 3]
```

### nth  
( int, array ) :: array

```javascript
nth(2, [0, 1, 2, 3])
// [0, 1, 3]
```
*removes nth index*

*new array; doesn't mutate*

### reduce  
( function(acc, any), acc, array ) :: any

```javascript
let sum = xs => reduce((acc, x) => acc + x, 0, xs)
sum([1, 2, 3])
// 6
```

### rest  
( array ) :: array

```javascript
rest([1, 2, 3])
// [2, 3]
```

### uniq  
( array ) :: array

```javascript
uniq([1, 1, 1, true, true, null, null, {one: 1}, {one: 1}])
// [1, true, null, {one: 1}, {one: 1}]
```
*unique primitives*

### zip  
( array, array ) :: array

```javascript
zip([1, 2, 3], [4, 5, 6])
// [ [1, 4], [2, 5], [3, 6] ]
```

### zipWith  
( function(any, any) :: any, array, array ) :: array

```javascript
let add = (x,y) => x+y
zipWith(add, [1, 2, 3], [4, 5, 6])
// [5, 7, 9]
```
*[ add(1, 4), add(2, 5), add(3, 6) ]*

Objects
---

### isObject  
( any ) :: boolean

```javascript
isObject([1,2,3])
// false
isObject({one: 1})
// true
```

### prop  
( string || array, object ) :: any || array

```javascript
prop('x', {x: 42, y: 43})
// 42

prop('x', {x: x => x})(42)
// 42

let book =
{
  id: 1,
  fiction: true,
  character: {
    name: 'estragon',
    seeking: 'godot',
    hasRope: false
  }
}
prop(['id', 'fiction'], book)
// {id: 1, fiction: true}

prop('character.name', book)
// 'estragon'

prop('path.to.nowhere', book)
// false

prop('fortitude', book)
// undefined)
```
*when passed a string denoting a key, returns the value of that key on an object*

*when passed a dot-separated string denoting nested keys, returns the value of that nested key or false*

*when passed an array of strings denoting keys, returns an object with those key/value pairs*

*when passed a string as a single parameter, returns a curried version*


### propEq
( primitive, string, object ) :: boolean

```javascript
propEq(1, 'one', {one: 1})
// true
```

### propSatisfies  
( function(any) :: boolean, string, object ) :: boolean

```javascript
propSatisfies(v => equals(v, 'blue'), 'hair', {hair: 'blue'})
// true
```
*the first param is a function that receives the value of that property and returns a boolean (after some evaluation of that property)*


### deepClone  
( object ) :: object


```javascript
deepClone({one: 1, two: {three: 3}})
// {one: 1, two: {three: 3}}
```
*object literals only; breaks with an object referring to a closed state*

*don't use constructed instances*

### extend  
( object, object ) :: object

```javascript
let defaults = {baseURL: '/api/', auth: {apiKey: true, admin: false}}
extend(defaults, {baseURL: '/catalogue/', auth: {admin: true}})
// {baseURL: '/catalogue/', auth: {apiKey: true, admin: true}}
```
*object literals only*

*extend is not autocurried*

### equals  
( primitive, primitive ) :: boolean

```javascript
equals(42, 42)
// true
equals('red', 'red')
// true
equals(false, null)
// false
```
*simple equality check for primitives only*

*Ramda has a more comprehensive [solution](http://ramdajs.com/docs/#equals)*

### hasText
( string, string ) :: boolean
```javascript
hasText('green', 'the green thing')
// true
```

Utilities
---

[](#empty)
### empty
( any ) :: boolean

```javascript
empty( {} )
// true
empty( () => 42 )
// true
```
*returns true when passed:*
- *empty array*
- *empty string*
- *function of zero arity*
- *empty object*
- *null*
- *undefined*


### partial
( function, any, any, ... ) :: function || return value

```javascript
let addup = (x, y, z) => x+y+z
let addTen = partial(addup, 4, 6)
addTen(5)
// 15
addTen(2)
// 12
```
*when passed fewer arguments than the arity of the first argument (a function), returns a function that waits for the remaining arguments. when passed enough arguments, executes the function passed as the first parameter with given arguments*

### pipe
( function, function, ... ) :: function
```javascript
let products = [
  {id: 1, name: 'nice chair', category: 'modern'},
  {id: 2, name: 'nice book', category: 'modern'},
  {id: 3, name: 'bad chair', category: 'modern'},
  {id: 4, name: 'nice chair', category: 'vintage'}
]

let moderns = _.filt(_.propEq('modern', 'category'))
let nices = _.filt(_.propSatisfies(_.hasText('nice'), 'name'))
let names = _.map(_.prop('name'))

let modernAndNiceNames = _.pipe(moderns, nices, names)

modernAndNiceNames(products)
// ["nice chair", "nice book"]

```
*composing like this is the entire point*

[more examples](https://github.com/crshmk/_/blob/master/examples/examples.js)

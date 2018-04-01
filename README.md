This is a functional programming starter kit that can be easily read and augmented. Larger libraries are magical, performant, and battle-hardened, but I often prefer to roll my own.

Like [Ramda](http://ramdajs.com/) (which is a far superior library in a completely different league, of course) this is an auto-curried collection of functions that accept data last. Passing data to be processed as the last parameter allows you to curry or partially apply the initial parameters, which has strong benefits:
- function names are more explicit
- you may pipe complex functions in a point-free style
- you enjoy the power of unary functions as they might be expected in a monad, monoid, or other container

All of this leads to more powerful, readable, maintainable, well-composed code. [example](https://github.com/crshmk/_/blob/master/examples.js)

---

The functions are auto-curried. This means that if a function accepts three arguments, you may just pass one or two as you like and a new function will be returned that will expect the remaining ones. This allows you to pass around functions in powerful ways. It also allows you a lot of elegance, and you aren't messing around with bind() all the time.



---


A large and popular functional programming library will perform much better. This is written specifically to be readable and augmented. Like a lot of tools, you could spend time learning the syntax of a library, or you could learn how to write one yourself. Even if you use libraries often (I love Ramda) it's valuable to understand how functional programming really works before diving into them. A readable group of functions like this makes fp general architecture much more accessible.

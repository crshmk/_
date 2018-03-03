/**
 * installation:
 * let vueFp = require('vue-fp');
 * Vue.use(vueFp);
 */

let _ = require('./index.js');

exports.install = function(Vue) {
  Vue.prototype.$chunk = _.chunk;
  Vue.prototype.$diff = _.diff;
  Vue.prototype.$filt = _.filt;
  Vue.prototype.$find = _.find;
  Vue.prototype.$first = _.first;
  Vue.prototype.$includes = _.includes;
  Vue.prototype.$intersection = _.intersection;
  Vue.prototype.$last = _.last;
  Vue.prototype.$map = _.map;
  Vue.prototype.$nth = _.nth;
  Vue.prototype.$rest = _.rest;
  Vue.prototype.$uniq = _.uniq;
  Vue.prototype.$without = _.without;
  Vue.prototype.$isObject = _.isObject;
  Vue.prototype.$prop = _.prop;
  Vue.prototype.$propEq = _.propEq;
  Vue.prototype.$propSatisfies = _.propSatisfies;
  Vue.prototype.$deepClone = _.deepClone;
  Vue.prototype.$extend = _.extend;
  Vue.prototype.$equals = _.equals;
  Vue.prototype.$hasText = _.hasText;
  Vue.prototype.$empty = _.empty;
  Vue.prototype.$partial = _.partial;
  Vue.prototype.$pipe = _.pipe;
};

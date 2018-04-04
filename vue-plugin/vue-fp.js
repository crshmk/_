/**
 * Install in main.js:
 *   let vueFp = require('vue-fp');
 *   Vue.use(vueFp);
 */


let _ = require('./index.js');

exports.install = function(Vue) {
  Object.keys(_).forEach(x => {
    Vue.prototype['$'+x] = _[x];
  })
};

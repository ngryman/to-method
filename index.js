(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.toMethod = factory());
}(this, (function () { 'use strict';

function wrap(fn) {
  // fast path if arity < 4, slow path if not
  switch (fn.length) {
    case 0:
      return function () {
        return fn.call(this);
      };
    case 1:
      return function () {
        return fn.call(this, this);
      };
    case 2:
      return function (a1) {
        return fn.call(this, this, a1);
      };
    case 3:
      return function (a1, a2) {
        return fn.call(this, this, a1, a2);
      };
    case 4:
      return function (a1, a2, a3) {
        return fn.call(this, this, a1, a2, a3);
      };
    default:
      return function () {
        const args = [this];
        for (let i = 0, len = arguments.length; i < len; i++) {
          args[i + 1] = arguments[i];
        }
        return fn.apply(this, args);
      };
  }
}

/**
 * Mixin each function into `klass` prototype and apply them to the current
 * instance such as the context and the first argument are bound to the
 * instance itself.
 *
 * @param {Function} klass Target class.
 * @param {Object} functions Object of functions.
 */
function toMethod(klass, functions) {
  for (let fnName in functions) {
    const fn = functions[fnName];
    if ('function' === typeof fn) {
      klass.prototype[fnName] = wrap(fn);
    }
  }
}

return toMethod;

})));
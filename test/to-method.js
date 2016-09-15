import test from 'ava'
import { bindMacro, invalidMacro } from './helpers/macros'
import toMethod from '../lib/to-method'

function assertOn(t, fn, inst, arityN) {
  t.true(fn.calledOn(inst))
}

function assertWith(t, fn, inst, arityN) {
  t.true(fn.calledWith(0 === arityN ? undefined : inst))
}

function assertArgs(t, fn, inst, arityN) {
  let args
  if (arityN > 0) {
    args = [inst].concat(Array(arityN - 1).fill(true))
  }
  t.true(fn.calledWith.apply(fn, args))
}

/* -------------------------------------------------------------------------- */

test.beforeEach(t => {
  t.context.Ctor = function Class() {}
})

test('mixin functions into object prototye', t => {
  toMethod(t.context.Ctor, {
    fn1: function() {},
    fn2: function() {},
    fn3: function() {}
  })
  const inst = new t.context.Ctor()

  t.is('function', typeof inst.fn1)
  t.is('function', typeof inst.fn2)
  t.is('function', typeof inst.fn3)
})

test('invoke with context as this', bindMacro, 0, assertOn)
test('invoke with context as this', bindMacro, 1, assertOn)
test('invoke with context as this', bindMacro, 2, assertOn)
test('invoke with context as this', bindMacro, 3, assertOn)
test('invoke with context as this', bindMacro, 4, assertOn)
test('invoke with context as this', bindMacro, 5, assertOn)

test('invoke without first argument', bindMacro, 0, assertWith)
test('invoke with first argument as this', bindMacro, 1, assertWith)
test('invoke with first argument as this', bindMacro, 2, assertWith)
test('invoke with first argument as this', bindMacro, 3, assertWith)
test('invoke with first argument as this', bindMacro, 4, assertWith)
test('invoke with first argument as this', bindMacro, 5, assertWith)

test('invoke without arguments', bindMacro, 0, assertArgs)
test('other arguments are left intact', bindMacro, 1, assertArgs)
test('other arguments are left intact', bindMacro, 2, assertArgs)
test('other arguments are left intact', bindMacro, 3, assertArgs)
test('other arguments are left intact', bindMacro, 4, assertArgs)
test('other arguments are left intact', bindMacro, 5, assertArgs)

test('ignore invalid input', invalidMacro, null)
test('ignore invalid input', invalidMacro, {})
test('ignore invalid input', invalidMacro, [])
test('ignore invalid input', invalidMacro, { fn: {}})

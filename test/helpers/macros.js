import arity from 'util-arity'
import spy from 'spy'
import toMethod from '../../lib/to-method'

export function bindMacro(t, arityN, assertions) {
  const spyFn = spy()

  // using arity with spy does not work well, so we invoke spy manually inside
  // of `fn`, yea...
  const fn = arity(arityN, function() {
    spyFn.apply(this, arguments)
    spyFn.calledArity = arguments.length
  })

  const inst = new t.context.Ctor()
  toMethod(t.context.Ctor, { fn })

  // make sure `fn` is invoke with a correct number of arguments
  const args = (arityN > 0 ? Array(arityN - 1).fill(true) : null)
  inst.fn.apply(inst, args)

  assertions(t, spyFn, inst, arityN)
}
bindMacro.title = (title, arityN) => `${title} (arity ${arityN})`

export function invalidMacro(t, input) {
  t.notThrows(() => toMethod(t.context.Ctor, input))
  t.deepEqual(t.context.Ctor.prototype, {})
}
invalidMacro.title = (title, input) => `${title} (${input})`

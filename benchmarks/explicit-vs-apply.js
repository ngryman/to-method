const Benchmark = require('benchmark')

function wrapExplicit(fn) {
  return function(a1, a2, a3) {
    return fn.call(this, this, a1, a2, a3)
  }
}

function wrapApply(fn) {
  return function() {
    const args = [this]
    for (let i = 0, len = args.length; i < len; i++) {
      args[i] = arguments[i]
    }
    return fn.apply(this, args)
  }
}

function fn(res, a1, a2, a3) {
  res.sum = a1 + a2 + a3
}

const explicit = { fn: wrapExplicit(fn) }
const apply = { fn: wrapApply(fn) }

/* -------------------------------------------------------------------------- */

const suite = new Benchmark.Suite()

suite
.add('explicit invocation', () => {
  explicit.fn(Math.random(), Math.random(), Math.random())
})
.add('apply invocation', () => {
  apply.fn(Math.random(), Math.random(), Math.random())
})
.on('cycle', event => {
  console.log(String(event.target))
})
.run({ async: true })

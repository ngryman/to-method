# to-method

> Convert c-like functions to class methods.

[![travis][travis-image]][travis-url] [![codecov][codecov-image]][codecov-url]

[travis-image]: https://img.shields.io/travis/ngryman/to-method.svg?style=flat
[travis-url]: https://travis-ci.org/ngryman/to-method
[codecov-image]: https://img.shields.io/codecov/c/github/ngryman/to-method.svg
[codecov-url]: https://codecov.io/github/ngryman/to-method


**to-method** lets you bind `c-like` functions to classes. By `c-like` I mean
functions that always take the target data structure as the first argument.


## Install

```bash
npm install --save to-method
```

## Usage

```javascript
import toMethod from 'to-method'

function love(person1, person2) {
  console.log(`${person1.name} ❤ ${person2.name}`)
}

class Person {
  constructor(name) {
    this.name = name
  }
}
toMethod(Person, { love })

const me = new Person('I')
const sarra = new Person('Sarra')
me.love(sarra)
// => I ❤ Sarra

```


## License

MIT © [Nicolas Gryman](http://ngryman.sh)

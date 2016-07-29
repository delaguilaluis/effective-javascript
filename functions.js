'use strict';

const _ = {
  identity(x) {
    return x;
  },

  identityf(x) {
    return () => x;
  },

  add(first, second) {
    return first + second;
  },

  addf(first) {
    return (second) => first + second;
  },

  sub(first, second) {
    return first - second;
  },

  mul(first, second) {
    return first * second;
  },

  curry(binary, first) {
    return (second) => binary(first, second);
  },

  curryr(binary, second) {
    return (first) => binary(first, second);
  },

  liftf(binary) {
    return (first) => (second) => binary(first, second);
  },

  twice(binary) {
    return (a) => binary(a, a);
  },

  reverse(binary) {
    return (first, second) => binary(second, first);
  },

  composeu(f, g) {
    return (a) => g(f(a));
  },

  composeb(f, g) {
    return (first, second, third) => g(f(first, second), third);
  },

  limit(f, allowedCalls) {
    let remainingCalls = allowedCalls;
    return (a, b) => {
      if (remainingCalls > 0) {
        remainingCalls -= 1;
        return f(a, b);
      }
      return undefined;
    };
  },

  from(a) {
    let accum = a - 1;
    return () => {
      accum += 1;
      return accum;
    };
  },

  to(gen, limit) {
    return () => {
      const value = gen();
      if (value < limit) {
        return value;
      }
      return undefined;
    };
  },

  fromTo(start, end) {
    return _.to(_.from(start), end);
  },

  element(elements, gen) {
    let generator;
    if (gen !== undefined) {
      generator = gen;
    } else {
      generator = _.fromTo(0, elements.length);
    }

    return () => {
      const index = generator();
      if (index !== undefined) {
        return elements[index];
      }
      return index;
    };
  },

  collect(gen, elements) {
    return () => {
      const value = gen();
      if (value !== undefined) {
        elements.push(value);
      }

      return value;
    };
  },

  filter(gen, predicate) {
    return function recur() {
      const value = gen();
      if (value === undefined || predicate(value)) {
        return value;
      }
      return recur();
    };
  },

  concat(firstGen, secondGen) {
    let generator = firstGen;
    return () => {
      const value = generator();
      if (value === undefined) {
        generator = secondGen;
        return generator();
      }
      return value;
    };
  },

  gensymf(salt) {
    const gen = _.from(1);
    return () => salt + gen();
  },

  fibonaccif(first, second) { // @TODO
    let a = first;
    let b = second;
    let calls = 0;

    function fibonacciAux() {
      const c = a + b;
      a = b;
      b = c;
      return c;
    }

    return () => {
      let value;
      calls += 1;

      switch (calls) {
        case 1:
          value = first;
          break;
        case 2:
          value = second;
          break;
        default:
          value = fibonacciAux(a, b);
      }

      return value;
    };
  },

  shortFibonaccif(one, two) {
    /* eslint-disable no-param-reassign */
    return function fibonacci() {
      const next = one;
      one = two;
      two += next;
      return next;
    };
    /* eslint-enable no-param-reassign */
  },

  counter() {
    let count = 0;
    return {
      up() {
        count += 1;
        return count;
      },
      down() {
        count -= 1;
        return count;
      },
    };
  },

  revocable(f) {
    let isRevoked = false;
    return {
      invoke(a, b) {
        if (!isRevoked) {
          return f(a, b);
        }

        return undefined;
      },
      revoke() {
        isRevoked = true;
      },
    };
  },

  m(value, source) {
    return {
      value,
      source: (typeof source === 'string') ? source : String(value),
    };
  },

  addm(a, b) {
    return _.m(a.value + b.value, `(${a.source} + ${b.source})`);
  },

  liftm(binary, op) {
    return (x, y) => {
      const a = (typeof x === 'number') ? _.m(x) : x;
      const b = (typeof y === 'number') ? _.m(y) : y;
      return _.m(binary(a.value, b.value), `(${a.source + op + b.source})`);
    };
  },

  addg(a) {
    if (a === undefined) {
      return undefined;
    }

    let accum = a;
    return function addgAux(b) {
      if (b === undefined) {
        return accum;
      }

      accum += b;
      return addgAux;
    };
  },

  liftg(binary) {
    return function someg(a) {
      if (a === undefined) {
        return undefined;
      }

      let accum = a;
      return function somegAux(b) {
        if (b === undefined) {
          return accum;
        }

        accum = binary(accum, b);
        return somegAux;
      };
    };
  },

  arrayg(x) {
    if (x === undefined) {
      return [];
    }

    return _.liftg((a, b) => {
      a.push(b);
      return a;
    })([x]);
  },

  continuize(unary) {
    return (cb, value) => cb(unary(value));
  },
};

module.exports = _;

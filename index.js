'use strict';

const _ = require('./functions');

console.log('===1===');
console.log(_.identity(3));

console.log('\n===2===');
console.log(_.add(3, 4));
console.log(_.sub(3, 4));
console.log(_.mul(3, 4));

console.log('\n===3===');
const three = _.identityf(3);
console.log(three());

console.log('\n===4===');
console.log(_.addf(3)(4));

console.log('\n===5===');
console.log(_.curry(_.mul, 5)(6));

console.log('\n===6===');
const sub3 = _.curryr(_.sub, 3);
console.log(sub3(11));
console.log(sub3(3));

console.log('\n===7===');
const addf = _.liftf(_.add);
console.log(addf(3)(4));
console.log(_.liftf(_.mul)(5)(6));

console.log('\n===8===');
// my wrong answers
// const inc = (a) => _.add(_.identity(a), 1);
// const inc = (a) => _.addf(1)(a);
// const inc = (a) => _.liftf(_.add)(1)(a);
// const inc = (a) => _.curry(_.add,1)(a);
// actual answers
// const inc = _.addf(1)
// const inc = _.curry(_.add, 1);
// const inc = _.curryr(_.add, 1);
const inc = _.liftf(_.add)(1);
console.log(inc(5));
console.log(inc(inc(5)));

console.log('\n===9===');
console.log(_.add(11, 11));
const double = _.twice(_.add);
console.log(double(11));
const square = _.twice(_.mul);
console.log(square(11));

console.log('\n===10===');
const bus = _.reverse(_.sub);
console.log(bus(3, 2));

console.log('\n===11===');
console.log(_.composeu(double, square)(5));

console.log('\n===12===');
console.log(_.composeb(_.add, _.mul)(2, 3, 7));

console.log('\n===13===');
const addLtd = _.limit(_.add, 1);
console.log(addLtd(3, 4));
console.log(addLtd(3, 5));

console.log('\n===14===');
const gen = _.from(0);
console.log(gen());
console.log(gen());
console.log(gen());

console.log('\n===15===');
const gen15 = _.to(_.from(3), 5);
console.log(gen15());
console.log(gen15());
console.log(gen15());

console.log('\n===16===');
const gen16 = _.fromTo(0, 3);
console.log(gen16());
console.log(gen16());
console.log(gen16());
console.log(gen16());

console.log('\n===17===');
const gen17 = _.element(['a', 'b', 'c', 'd'], _.fromTo(1, 3));
console.log(gen17());
console.log(gen17());
console.log(gen17());

console.log('\n===18===');
const gen18 = _.element(['a', 'b', 'c', 'd']);
console.log(gen18());
console.log(gen18());
console.log(gen18());
console.log(gen18());
console.log(gen18());

console.log('\n===19===');
const array = [];
const gen19 = _.collect(_.fromTo(0, 2), array);
console.log(gen19());
console.log(gen19());
console.log(gen19());
console.log(array);

console.log('\n===20===');
const gen20 = _.filter(_.fromTo(0, 5), (value) => ((value % 3) === 0));

console.log(gen20());
console.log(gen20());
console.log(gen20());

console.log('\n===21===');
const gen21 = _.concat(_.fromTo(0, 3), _.fromTo(0, 2));

console.log(gen21());
console.log(gen21());
console.log(gen21());
console.log(gen21());
console.log(gen21());
console.log(gen21());

console.log('\n===22===');
const geng = _.gensymf('G');
const genh = _.gensymf('H');

console.log(geng());
console.log(genh());
console.log(geng());
console.log(genh());

console.log('\n===23===');
// composeu(identityf, curryr(limit, 1))
// element([a, b])
const fib = _.fibonaccif(0, 1);
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());

console.log('\n===23.2===');
const fib2 = _.shortFibonaccif(0, 1);
console.log(fib2());
console.log(fib2());
console.log(fib2());
console.log(fib2());
console.log(fib2());
console.log(fib2());


console.log('\n===24===');
const object = _.counter();
const up = object.up;
const down = object.down;
console.log(up());
console.log(down());
console.log(down());
console.log(up());

console.log('\n===25===');
const rev = _.revocable(_.add);
const addRev = rev.invoke;
console.log(addRev(3, 4));
rev.revoke();
console.log(addRev(5, 7));

console.log('\n===26===');
console.log(JSON.stringify(_.m(1)));

console.log('\n===27===');
console.log(JSON.stringify(_.addm(_.m(3), _.m(4))));

console.log('\n===28===');
const addm = _.liftm(_.add, '+');
console.log(JSON.stringify(addm(_.m(3), _.m(4))));
const mulm = _.liftm(_.mul, '*');
console.log(JSON.stringify(mulm(_.m(3), _.m(4))));

console.log('\n===29===');
const addm29 = _.liftm(_.add, '+');
console.log(JSON.stringify(addm29(3, 4)));

console.log('\n===30===');
console.log(_.addg());
console.log(_.addg(2)());
console.log(_.addg(2)(7)());
console.log(_.addg(3)(0)(4)());
console.log(_.addg(1)(2)(4)(8)());

console.log('\n===31===');
console.log(_.liftg(_.mul)());
console.log(_.liftg(_.mul)(3)());
console.log(_.liftg(_.mul)(3)(0)(4)());
console.log(_.liftg(_.mul)(1)(2)(4)(8)());

console.log('\n===32===');
console.log(_.arrayg());
console.log(_.arrayg(3)());
console.log(_.arrayg(3)(4)(5)());

console.log('\n===33===');
const sqrtc = _.continuize(Math.sqrt);
sqrtc(console.log, 81);

/**
 * sync test example
 */
import lochNest from 'tap-lochnest'
import tape from 'tape'
const test = lochNest(tape, { delimiter: ' | ' })

//import house from '../src'

test('test', (t) => {
  t.equal(1, 1);
  t.end()
})


/**
 *  async test with Promise example
 */
// import test from 'tape-promise/tape'
// test('test promise', (t) => {
//   let promiseFn = () => {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve();
//       }, 1000)
//     })
//   };
//   return promiseFn.then((body) => {
//     t.ok(true, 'resolve');
//   }).catch((err) => {
//     t.error(err, 'error');
//   })
// })

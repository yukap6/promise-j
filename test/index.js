const Promise = require('../index');

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('hello promise');
    // resolve('fulfilled');
    reject('rejected');
  }, 1000);
});

p.then((data) => {
  console.log('success', data);
}, (error) => {
  console.log('error', error);
});
